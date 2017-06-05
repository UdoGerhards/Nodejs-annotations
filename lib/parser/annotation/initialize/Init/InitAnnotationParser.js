'use strict';
var InitAnnotation = require("../../../../annotation/initialize/Init/InitAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash");


class InitParser extends BaseAnnotationParser{

    static get SUPPORTS() {return [InitAnnotation.name]};

    constructor() {
        super();

        var instance = this;
        instance.parameterMatch = new RegExp("\([\"|\'](\\w.*\\w)[\"|\']\)", "g");
    }

    init() {

        var instance = this;

    }

    /**
     * Parses the bean structure during the different modes
     *
     * @param annotationInformation
     * @param beanStructure
     */
    parse(annotationInformation, beanStructure) {

        var instance = this;
        var beanObject = super.parse(annotationInformation, beanStructure);
        var stage = beanStructure.stage;

        switch(stage) {
            case global._STAGE_:
                beanStructure = instance._stage(annotationInformation, beanStructure);
                return beanStructure;
                break;
            case global._FINISH_SETUP_:
                beanStructure = instance._finishSetup(annotationInformation, beanStructure);
                break;
            default:
                return beanStructure;
                break;
        }
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure) {
        var instance = this;

        var paramText = annotationInformation.annotationValue;
        var propertyIndex = annotationInformation.main.propertyIndex;

        var match = instance.parameterMatch.exec(paramText);

        if (match && match.length > 2) {
            beanStructure.structure[0].main.propertyName = match[2];
        } else {
            var leadingToken = annotationInformation.main.tokens[0];
            var parser = instance.tokenParser[leadingToken.type];

            var result = parser.parse(leadingToken);
            beanStructure.structure[0].main.propertyName = result.id;
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
    _finishSetup(annotationInformation, beanStructure) {
        var instance = this;
    }
}

module.exports = exports = InitParser;