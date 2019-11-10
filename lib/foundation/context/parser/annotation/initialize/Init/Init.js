'use strict';
const BaseParser = require("../../Base/Base");

class Init extends BaseParser {

    constructor() {
        super();
        var instance = this;
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

        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._INITIALIZE_:
                instance._initialize(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
                instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        //super.parse(annotationInformation, beanStructure);
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
    }

    _initialize(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var logger = instance.logger;
        var util = instance.util;

        var property = annotationInformation.property;
        if (typeof beanStructure._instance === "object") {
            logger.info("    ... initializing bean "+ beanStructure.beanName);
            try {
                // TODO: Refactor to variable property
                beanStructure._instance[property].apply(beanStructure._instance);
            } catch(error) {

                logger.error(error);
                throw error;
            }

        }
    }

    parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure) {
        let instance = this;
        let annotation = instance.annotation;

        let xmlMapper = instance.xmlMapper["Init"];
        let initInformation = xmlMapper.parseOpenXMLTag(currentTag, annotation, beanStructure);

        if (!beanStructure.structure) {
            beanStructure.structure = [];
        }

        beanStructure.structure.push(initInformation);

        return beanStructure;
    }

    getAnnotationRelatedInformation(expressionStatement, struct, annotationClass) {

        if (expressionStatement.key) {
            struct.descriptor.property = expressionStatement.key.name;
        } else if (expressionStatement.left) {
            struct.descriptor.property = expressionStatement.left.property.name;
        }
        return struct;
    }
}

module.exports = exports = Init;