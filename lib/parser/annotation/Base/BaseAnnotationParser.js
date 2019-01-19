'use strict';

class BaseAnnotationParser {

    constructor() {

        var instance = this;

        instance.LogManager = null;
        instance.logger = null;

        instance.annotationParser = null;
        instance.annotation = null;
        instance.util = null;
        instance.xmlMapper = null;
        instance.tokenParser = null;
    }

    init() {
        let instance = this;

        instance.logger = instance.LogManager.getLogger(instance);

        let logger = instance.logger;
        logger.info(instance.constructor.name+" initialized ...");
    }

    parseEsprimaToken(node, annotationInfo) {
        return annotationInfo;
    }

    parse(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;

        // Process childs
        var childs = annotationInformation.childs;
        if (childs && childs.length > 0) {
            for (var childIndex = 0; childIndex < childs.length; childIndex++) {
                var child = childs[childIndex];
                // TODO: Check if this is not causing to hang the process; alterntively only hand over parent annotation information;
                //child.parent = annotationInformation.annotation;
                var childAnnotationParser = instance.annotationParser[child.annotation.name];

                try {
                    childAnnotationParser.parse(child, beanStructure, applicationStructure);
                } catch(error) {
                    //console.log(child.annotation.name);
                    //console.log(instance.annotationParser);
                    throw error;
                }

            }
        }

        return beanStructure;

    }

    /**
     * Finish bean setup
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _finishSetup(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        annotationInformation.tokens = null;
        delete annotationInformation.tokens;
    }

    _getSingleBeanStructureFromApplicationStack(namespaceSeq, applicationStack) {

        var mainBeanNamespace = namespaceSeq[0];
        var mainBeanStructure = applicationStack[mainBeanNamespace];

        var subBeanNamespaceArr = namespaceSeq.slice(0, namespaceSeq.length-1);
        var subBeanNamespace = subBeanNamespaceArr.join(String.fromCharCode(12));
        var subBeanStructure = mainBeanStructure[subBeanNamespace];

        return subBeanStructure;
    }


    parseOpenXMLTag(currentTag, propertyStack, context, stack) {

        throw new ReferenceError("XML tag not supported!")

    }

    parseCloseXMLTag(currentTag, propertyStack, context, stack) {

        throw new ReferenceError("XML tag not supported!")

    }

    _getXMLMapper(tagName) {
        let instance = this;
        return instance.xmlMapper[tagName];

    }

    getSupportedXMLTags() {
        let instance = this;
        let keys = [];

        if (instance.xmlMapper) {
            keys = Object.keys(instance.xmlMapper);
        }

        return keys;
    }

}

module.exports = exports = BaseAnnotationParser;