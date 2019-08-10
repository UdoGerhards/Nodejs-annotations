'use strict';

const BaseParser = require("../../Base/Base");

class PropertiesParser extends BaseParser {

    constructor() {
        super();

        var instance = this;
        instance.processors = {};
        instance.glob = null;
        instance.path = null;
        instance.fs =  null;
        instance.Promise = null;
        instance.camelcase = null;
    }

    init() {
        var instance = this;
        var processors = instance.processors;

        super.init();
        var logger = instance.logger;

        logger.info("Intializing PropertiesParser ... ");

         instance.processors = {};

         logger.trace("    Setting up property file processors ... ");
         for (var index=0; index < processors.length; index++) {
             var procInstance = processors[index];
        
             var fileEndings = procInstance.__proto__.constructor.SUPPORTS();

             logger.trace("     using "+procInstance.constructor.name+" ...")
             for(var indexEndings=0; indexEndings < fileEndings.length; indexEndings++) {
                 logger.trace("     => "+fileEndings[indexEndings]);
                 instance.processors[fileEndings[indexEndings]] = procInstance;
             }
         }
    }

    /**
     * Parses the bean structure during the different modes
     *
     * @param annotationInformation
     * @param beanStructure
     */
    parse(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;
        var stage = beanStructure.stage;

        // Normal behavior
        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._INSTANTIATE_:
                beanStructure = instance._instantiate(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        //

        return beanStructure;

    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;
        var glob = instance.glob;
        var fs = instance.fs;

        annotationInformation.annotationValue = annotationInformation.comment.replace(/@Properties/, "");

        var annotationValue = annotationInformation.annotationValue.replace("(","").replace(")", "").replace(/'/g, "").replace(/"/g, "").replace(/ /g, "").trim().split(";");
        annotationInformation.property = annotationValue;

        for (var index=0; index < annotationValue.length; index++) {
            var scanPath = annotationValue[index];
            if (scanPath.startsWith("/")) {
                scanPath = process.env.PWD+scanPath;
            }

            var files = glob.sync(scanPath);
            for (var index = 0; index < files.length; index++){
                var path = files[index];
                var lstat = fs.lstatSync(path);

                if (lstat.isFile()) {
                    if (!Array.isArray(beanStructure._properties) ) {
                        beanStructure._properties = [];
                    }
                    // beanStructure.path
                    beanStructure._properties.push(path);
                };
            }
        }
    }

    /**
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _instantiate(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;
        var path = instance.path;
        //var Promise = instance.Promise;
        var camelcase = instance.camelcase;

        var promises = [];

        for (var index = 0; index < beanStructure._properties.length; index++) {

            var filePath = beanStructure._properties[index];

            var extension = path.extname(filePath);

            var processor = instance.processors[extension];

            var fPromise = processor.process(filePath);

            promises.push(fPromise);
        }

        beanStructure._beanPromises = promises;

        Promise.all(promises).then(function(results){

            for (var index=0; index < results.length; index++) {

                var result = results[index];

                var fileName = path.basename(filePath);

                var name = camelcase(fileName.replace(extension, ""));
                if (result.__name__ ) {
                    name = camelcase(result.__name__);
                }

                //var className = camelcase('Foo-Bar', {pascalCase: true})+"Class";

                // var className = name.toUpperCase()+"Class";

                name = name.replace(/^\w/, c => c.toUpperCase()); //First letter to upper

                var className = name+"_VClass";

                if (!applicationStructure.classToBean) {
                    applicationStructure.classToBean = {};
                }

                if (!applicationStructure.classToBean[className]) {
                    applicationStructure.classToBean[className] = [];
                }

                applicationStructure.classToBean[className].push(result);

                applicationStructure.nameToNamespace[name] = {}
                applicationStructure.nameToNamespace[name]._instance = result;
                applicationStructure.nameToNamespace[name].descriptor = {
                    "annotationValue": "(\""+name+"\")",
                    "annotation": annotationInformation.annotation
                };

                applicationStructure.nameToNamespace[name]._className = className;
                applicationStructure.nameToNamespace[name].path = result.__PATH__;

                applicationStructure.nameToNamespace[name]._instance.__PATH__ = null;
                delete applicationStructure.nameToNamespace[name]._instance.__PATH__;
            }
        });
    }

    /**
     * Creates a bean for the application stack
     *
     * @param currentTag
     * @param propertyStack
     * @param context
     * @param stack
     * @param beanStructure
     * @returns {*}
     */
    parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure) {
        let instance = this;
        let logger = instance.logger;

        let uuidV4 = instance.uuidV4;
        let uniqueId = uuidV4();
        let annotation = instance.annotation;

        let xmlMapper = instance._getXMLMapper(currentTag.name);

        namespaceStack.push(uniqueId);

        beanStructure = xmlMapper.parseOpenXMLTag(currentTag, annotation, beanStructure);

        if (!beanStructure.descriptor.annotationValue) {
            beanStructure.descriptor.annotationValue = "(\"" + uniqueId + "\")",
                beanStructure.descriptor.comment = annotation.name + "(\"" + uniqueId + "\")"
        }

        let masterUuidV4 = namespaceStack[0];
        let namespaceString = null;

        if (namespaceStack.length > 1) {
            namespaceString = namespaceStack.join(String.fromCharCode(12));
        } else {
            namespaceString = namespaceStack[0];
        }

        if (!applicationStack[masterUuidV4]) {
            applicationStack[masterUuidV4] = {};
        }

        applicationStack[masterUuidV4][namespaceString] = beanStructure;

        return beanStructure;

    }

    parseCloseXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, context, applicationStack, beanStructure) {
        let instance = this;
        let namespaceString = null;
        let logger = instance.logger;

        namespaceStack.splice(namespaceStack.length-1,1);

        return beanStructure;
    }
}

module.exports = exports = PropertiesParser;