'use strict';
var RunAnnotation = require("../../../../annotation/run/Run/RunAnnotationClass.js")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , Promise = require("bluebird");


class RunParser extends BaseAnnotationParser {

    static get SUPPORTS() {
        return [RunAnnotation.name]
    };

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
        var instance = this;

        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var propertyResult = parser.parse(leadingToken);
        var property = propertyResult.id;

        annotationInformation.property = property;
    }

    _run(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var property = annotationInformation.property;
        var logger = instance.logger;

        logger.info("    ... running "+beanStructure.beanName+"::"+property);
        beanStructure._instance[property].apply(beanStructure._instance);

    }
}

module.exports = exports = RunParser;