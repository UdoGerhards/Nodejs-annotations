'use strict';
var QualifierAnnotation = require("../../../../annotation/inject/Qualifier/QualifierAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash");


class QualifierParser extends BaseAnnotationParser{

    static get SUPPORTS() {return [QualifierAnnotation.name]};

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
     * @param beanObject
     */
    parse(annotationInformation, beanObject, applicationStructure) {

        var instance = this;
        var beanObject = super.parse(annotationInformation, beanObject, applicationStructure);
        var stage = beanObject.stage;

        switch(stage) {
            case global._STAGE_:
                beanObject = instance._stage(annotationInformation, beanObject, applicationStructure);
                return beanObject;
                break;
            case global._INJECT_:
                beanObject = instance._inject(annotationInformation, beanObject, applicationStructure);
                break;
            case global._FINISH_SETUP_:
                beanObject = instance._finishSetup(annotationInformation, beanObject, applicationStructure);
                break;
            default:
                return beanObject;
                break;
        }
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanObject
     * @private
     */
    _stage(annotationInformation, beanObject, applicationStructure) {
        var instance = this;

        // Get name of the class or property name of according constructor and set it as bean name
        var sourceBeanName = null;


        // Get property on bean
        beanObject.structure[index].sourceBean = beanName;

        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var propertyResult = parser.parse(leadingToken);
        var property = propertyResult.id;

        // Source bean name
        var paramText = annotationInformation.annotationValue.trim();
        var match = instance.parameterMatch.exec(paramText);

        if (match && match.length > 2) {
            // Extra source bean name
            sourceBeanName = match[2].trim();
        }

        // Identify property in the bean which should be set by the qualifier
        for(var index=0;index< beanObject.structure.length-1; index++) {
            if (beanObject.structure[index].start === annotationInformation.start) {
                beanObject.structure[index].sourceBean = sourceBeanName || property; // Either we  have an own bean name to identify the bean in the application context or we use the property as identifier
                beanObject.structure[index].property = property;
                break;
            }
        }

        return beanObject;
    }

    /**
     * Inject the bean
     *
     * @param annotationInformation
     * @param beanObject
     * @private
     */
    _inject(annotationInformation, beanObject, applicationStructure) {
        var instance = this;
    }

    /**
     * Finish bean setup
     *
     * @param annotationInformation
     * @param beanObject
     * @private
     */
    _finishSetup(annotationInformation, beanObject, applicationStructure) {
        var instance = this;
    }
}

module.exports = exports = QualifierParser;