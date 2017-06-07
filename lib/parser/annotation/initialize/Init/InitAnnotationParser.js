'use strict';
var InitAnnotation = require("../../../../annotation/initialize/Init/InitAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , Promise = require("bluebird");


class InitParser extends BaseAnnotationParser {

    static get SUPPORTS() {
        return [InitAnnotation.name]
    };

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
    parse(annotationInformation, beanStructure, applicationStructure) {


        var instance = this;
        var stage = beanStructure.stage;

        switch (stage) {
            case global._STAGE_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                return beanStructure;
                break;
            case global._FINISH_SETUP_:
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

        var paramText = annotationInformation.annotationValue;

        var match = instance.parameterMatch.exec(paramText);


        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var propertyResult = parser.parse(leadingToken);
        var property = propertyResult.id;

        // Identify property in the bean which should be set by the qualifier
        for (var index = 0; index < beanStructure.structure.length - 1; index++) {
            if (beanStructure.structure[index].start === annotationInformation.start) {
                beanStructure.structure[index].property = property;
                break;
            }
        }
    }
}

module.exports = exports = InitParser;