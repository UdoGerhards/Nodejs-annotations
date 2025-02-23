'use strict';

import BaseParser from "../../Base/Base";

class RunParser extends BaseParser {

    constructor() {
        super();
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

        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                return beanStructure;
                break;
            case global.stages._RUN_:
                instance._run(annotationInformation, beanStructure, applicationStructure);
                return beanStructure;
                break;
            case global.stages._FINISH_SETUP_:
                instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                return beanStructure;
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        super.parse(annotationInformation, beanStructure);
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        // var instance = this;
        //
        // var leadingToken = annotationInformation.tokens[0];
        // var parser = instance.tokenParser[leadingToken.type];
        //
        // var propertyResult = parser.parse(leadingToken);
        // var property = propertyResult.id;
        //
        // annotationInformation.property = property;
    }

    _run(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var property = annotationInformation.property;
        var logger = instance.logger;

        logger.info("    ... running "+beanStructure.beanName+"::"+property);
        try {
            beanStructure._instance[property].apply(beanStructure._instance);
        } catch(error) {
            logger.error(error);
            throw error;
        }
    }

    parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure) {
        let instance = this;
        let annotation = instance.annotation;

        let xmlMapper = instance.xmlMapper["Run"];
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

export default RunParser;