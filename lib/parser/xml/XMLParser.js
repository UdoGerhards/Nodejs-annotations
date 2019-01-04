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
    }

    init(moduleDir, xmlContextFile) {

        var instance = this;

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
        let fs = instance.fs;
        let path = instance.path;
        let util = instance.util;
        let dotProp = instance.dotProp;
        let wildcard = instance.wildcard;
        let xmlMapper = instance.xmlMapper;

        var moduleDir = instance._moduleDir;

        var context = {};
        var propertyStack = [];

        /*
         * Function call
         */

        var initFuncs = [];

        var globalObjects = [];

        var newObjectStack = {};

        var currentID = null;
        var currentTag = null;

        var externals = {};

        var stack = {
            elements: {},
            pushElement: function (indexPath, content) {
                var instance = this;
                instance.elements[indexPath] = content;

                dotProp.set(newObjectStack[currentID], propertyStack.join("."), instance);
            },

            getElement: function (id) {
                var instance = this;
                return instance.elements[id];
            },

            getKeys: function() {
                var instance = this;
                if (instance.elements) {
                    return Object.keys(instance.elements);
                } else {
                    return null;
                }
            },

            deleteElement: function(indexPath) {
                var instance = this;
                instance.elements[indexPath] = null;
                delete instance.elements[indexPath];
            }
        };

        var getStackElement = function(value) {
            var element = {
                type: typeof value,
                object: value
            }
            return element;
        };

        var checkListandCreateIfnotExists = function(indexPath) {
            var list = stack.getElement(indexPath);

            if (!list) {
                list = {
                    object: [],
                    id: currentID,
                    count: 0
                };
            }

            stack.pushElement(indexPath, list);

            return list;
        };

        var pushElementToList = function(indexPath, entryKey, value) {
            var instance = this;

            if (indexPath != "") {
                var list = stack.getElement(indexPath);

                if (!list) {
                    list = checkListandCreateIfnotExists(indexPath);
                }

                /*
                 * if the list is an array and the key is string transform the list to an object
                 */
                if (entryKey && typeof entryKey == "string" && Array.isArray(list.elements)) {
                    var tmpList = list.elements;
                    list.elements = Object.assign({}, tmpList);
                    stack.pushElement(indexPath, list);
                }

                /*
                 * Save the list value
                 */
                if (Array.isArray(list.elements) && !entryKey) {
                    list.count++;
                };

                stack.pushElement(indexPath, value);
            }
        };


        let applicationStack = {};
        let beanStructure = null;
        let namespaceStack = [];
        let tagStack = [];

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
                    beanStructure = mapper.parseOpenXMLTag(currentTag, propertyStack, namespaceStack, context, applicationStack, beanStructure);

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
                    beanStructure = mapper.parseText(currentTag, propertyStack, namespaceStack, context, applicationStack, beanStructure);

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
                    beanStructure = mapper.parseCloseXMLTag(currentTag, propertyStack, namespaceStack, context, applicationStack, beanStructure);
                }
            },

        }, {decodeEntities: true, recognizeCDATA: true, xmlMode:true});

        parser.write(data);

        parser.end();

        return context;
    }
}

module.exports = exports = XMLParser;