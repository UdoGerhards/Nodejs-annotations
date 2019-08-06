'use strict';
const BaseParser = require("../../Base/BaseAnnotationParser");

class Prototype extends BaseParser {

    constructor() {
        super();

        let instance = this;
        instance.uuidV4 = null;
    }

    init() {
        let instance = this;

        instance.logger = instance.LogManager.getLogger(instance);
        let logger = instance.logger;
        logger.info(instance.constructor.name + " initialized ...");
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

        switch(stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._INSTANTIATE_:
                instance._instantiate(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
                instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }


    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructur
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var _ = instance._;

        // Get the name of the class or property definition
        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var result = parser.parse(leadingToken);
        var property = result.id;

        // Get a dedicated bean name if set as parameter in the annotation
        var paramText = annotationInformation.annotationValue;

        var parameterMatch = new RegExp("\([\"|\'](\\w.*\\w)[\"|\']\)", "g");;
        var match = parameterMatch.exec(paramText);

        var beanName = null;
        if (match && match.length > 2) {
            beanName = match[2];
        }

        beanStructure.beanName = beanName || property;         // Either we have dedicated descriptor or we take the property name as bean name
        applicationStructure.nameToNamespace[beanStructure.beanName] = beanStructure;

        var path = beanStructure.path;

       // if (!beanStructure.loader && !_.isEmpty(path)) {
        if (!beanStructure.loader && path && path != "") {
            beanStructure.loader = function () {
                var module = require(path);
               // if (_.isFunction(module)) {
                if (typeof module == "function") {
                    return module;
                //} else if (_.isObject(module)) {
                } else if (typeof module == "object") {
                    throw new Error("Prototypes must be classes only!");
                }
            }
        }
    }

    /**
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanStructur
     * @private
     */
    _instantiate(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        var module = null;
        
        if (typeof beanStructure.loader === "function") {
            module = beanStructure.loader();
        } else if (typeof beanStructure.loader === "object") {
            module = beanStructure.loader.load();
        }

        if (module) {
            beanStructure._instance = module;

            if (!applicationStructure.classToBean) {
                applicationStructure.classToBean = {};
            }

            if (!applicationStructure.classToBean[module.name]) {
                applicationStructure.classToBean[module.name] = [];
            }

            applicationStructure.classToBean[module.name].push(module);
        }
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
        let path = instance.path;

        let xmlMapper = instance._getXMLMapper(currentTag.name);

        if (currentTag.attributes.src) {
            let tmpSrc = path.normalize(path.join(moduleDir, currentTag.attributes.src));
            currentTag.attributes.src = tmpSrc;
        }

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

module.exports = exports = Prototype;