'use strict';
var QualifierAnnotation = require("../../../../annotation/inject/Qualifier/QualifierAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , Promise = require("bluebird");


class QualifierParser extends BaseAnnotationParser {

    static get SUPPORTS() {
        return [QualifierAnnotation.name]
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
            case global._INJECT_:
                instance._inject(annotationInformation, beanStructure, applicationStructure);
                break;
            case global._FINISH_SETUP_:
                instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
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

        // Get name of the class or property name of according constructor and set it as bean name
        var sourceBeanName = null;

        // Get property on bean

        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var propertyResult = parser.parse(leadingToken);
        var targetProperty = propertyResult.id;

        // Source bean name
        var paramText = annotationInformation.annotationValue.trim();
        var parameterMatch = new RegExp("\([\"|\'](\\w.*\\w)[\"|\']\)", "g");
        var match = parameterMatch.exec(paramText);

        if (match && match.length > 2) {
            // Extra source bean name
            sourceBeanName = match[2].trim();
        }

        // Identify property in the bean which should be set by the qualifier
        for (var index = 0; index < beanStructure.structure.length - 1; index++) {
            if (beanStructure.structure[index].start === annotationInformation.start) {
                beanStructure.structure[index].sourceBean = sourceBeanName || targetProperty; // Either we  have an own bean name to identify the bean in the application context or we use the property as identifier
                beanStructure.structure[index].property = targetProperty;
                break;
            }
        }
    }

    /**
     * Inject the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _inject(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        var targetBeanName = annotationInformation.sourceBean;
        var targetProperty = annotationInformation.property;

        if (typeof targetBeanName !== "undefined" && typeof targetProperty === "undefined") {
            beanStructure._instance[targetProperty] = applicationStructure.nameToNamespace[targetBeanName]._instance;
        }
    }
}

module.exports = exports = QualifierParser;