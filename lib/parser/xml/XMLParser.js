'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */
 const FoundationXMLParser = require("./FoundationXMLParser");

class XMLParser extends FoundationXMLParser {

    constructor() {
        super();

        var instance = this;

        /* Logging */
        instance.LogManager = null;
        instance.logger = null;

        /* Internal variables */
        instance.xmlMapper = null;

        /* Application context */
        instance.rawStructur = null;
    }

    init(xmlContextFileFull) {

        let instance = this;
        let path = instance.path;

        let moduleDir = instance._matchPackageJsonDir(xmlContextFileFull);
        let xmlContextFile = xmlContextFileFull.replace(moduleDir, path.sep);

        super.init(moduleDir, xmlContextFile);

        instance.logger = instance.LogManager.getLogger(instance);
        var logger = instance.logger;

        /* Remap xml mapper */
        logger.info("Remapping xml tag mapper");

        var tmpMapper = {};
        for(var name in instance.xmlMapper) {
            var mapper = instance.xmlMapper[name];
            if (mapper && typeof mapper.getSupportedXMLTags == "function") {
                var tags = mapper.getSupportedXMLTags();
                tags.forEach(function(tag){

                    logger.trace("    Using "+mapper.constructor.name+" for mapping "+tag+" ...");

                    tmpMapper[tag] = mapper;
                })
            }
        }

        instance.xmlMapper = tmpMapper;

        /* Complete xml mapper */
        for (let tagName in instance.xmlMapper) {
            instance.xmlMapper[tagName].annotationParser = tmpMapper;
        }

    }


    _parse(data) {
        let instance = this;

        let logger = instance.logger;
        let htmlparser = instance.htmlParser;
        let xmlMapper = instance.xmlMapper;

        let moduleDir = instance._moduleDir;

        let propertyStack = [];

        /*
         * Function call
         */
        let currentTag = null;
        let applicationStack = {};
        let beanStructure = null;
        let namespaceStack = [];
        let tagStack = [];

        return new Promise(function(resolve, reject) {

            var parser = new htmlparser.Parser({
                onopentag: function(tagname, attributes){

                    var name = tagname.toLowerCase();

                    /* Try to get an external processor first */
                    let tagName = name.replace(/^\w/, c => c.toUpperCase());
                    let mapper = xmlMapper[tagName];

                    currentTag = {
                        name: tagName,
                        attributes: attributes
                    };

                    tagStack.push(currentTag);

                    if (mapper) {
                        // TODO: Remove "context" var
                        beanStructure = mapper.parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure);

                    }
                },

                ontext: function(text){

                    let name = currentTag.name;
                    let tagName = name.replace(/^\w/, c => c.toUpperCase());
                    let mapper = xmlMapper[tagName];

                    let value = text.replace(/\r?\n|\r/g, "").trim();

                    if (mapper && mapper["parseText"] && value !="") {
                        // TODO: Remove "context" var

                        currentTag.attributes.value = value;
                        beanStructure = mapper.parseText(moduleDir, currentTag, propertyStack, namespaceStack, context, applicationStack, beanStructure);

                    }


                },
                onclosetag: function(tagname){

                    var name = tagname.toLowerCase();

                    /* Try to get an external processor first */
                    let tagName = name.replace(/^\w/, c => c.toUpperCase());
                    let mapper = xmlMapper[tagName];

                    currentTag = tagStack.splice(tagStack.length-1, 1)[0];

                    if (mapper) {
                        // TODO: Remove "context" var
                        beanStructure = mapper.parseCloseXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, context, applicationStack, beanStructure);
                    }
                },

                onerror(error) {
                    reject(error);
                },

                onend() {

                    // let masterUuid = null;
                    //
                    // for (let namespace in applicationStack) {
                    //     if (applicationStack[namespace][namespace]._isContext) {
                    //         masterUuid = namespace;
                    //         break;
                    //     }
                    // }
                    //
                    // let parseContext ={};
                    // parseContext[masterUuid] = applicationStack;

                    instance.rawStructur = applicationStack;
                    resolve(applicationStack);
                }

            }, {decodeEntities: true, recognizeCDATA: true, xmlMode:true});

            parser.write(data);
            parser.end();
        });
    }

    /**
     * Matches the current module / lib directory based on the next package.json which can be found.
     *
     * @param workingDir
     * @returns {string}
     * @private
     */
    _matchPackageJsonDir(workingDir) {

        let instance = this;
        let logger = instance.logger;
        let path = instance.path;
        let fs = instance.fs;

        let pathSegements = workingDir.split("/");
        let searchPath = path.join(workingDir, "package.json");
        while(!fs.existsSync(searchPath)) {
            let tmpSegs = pathSegements.slice(0,pathSegements.length-1);
            searchPath = tmpSegs.join(path.sep)+path.sep+"package.json";
            pathSegements = tmpSegs;
        }

        let libPath = pathSegements.join(path.sep);

        return libPath;
    }
}

module.exports = exports = XMLParser;