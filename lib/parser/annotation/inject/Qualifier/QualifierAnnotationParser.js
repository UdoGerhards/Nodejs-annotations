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
            case global.stages._INJECT_:
                instance._inject(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
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

        annotationInformation.sourceBean = sourceBeanName || targetProperty;
        annotationInformation.property = targetProperty;
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

        // Search by name
        var injectable = applicationStructure.nameToNamespace[targetBeanName]._instance  || null;
        if (!injectable) {

            // Scan for according classes by class name
            for (var name in applicationStructure.nameToNamespace) {
                if (applicationStructure.nameToNamespace[name].constructor.name === targetBeanName) {
                    injectable = applicationStructure.nameToNamespace[name];
                    break;
                }
            }

        }

        var target = beanStructure._instance[targetProperty];
        if (injectable) {
            if (target && Array.isArray(target)) {
                // Array
                beanStructure._instance[targetProperty].push(injectable);                                   // Add to array
            } else if (target && typeof target === "object") {
                // Object
                var beanName = applicationStructure.nameToNamespace[targetBeanName].beanName;
                beanStructure._instance[targetProperty][beanName] = injectable;                             // Add as property to the target object
            } else if (target && typeof target === "function") {
                // Function
                var args = [injectable];
                beanStructure._instance[targetProperty].apply(beanStructure._instance, args);         // function call

            } else if (target !== "undefined") {
                // Property
                beanStructure._instance[targetProperty] = injectable;                                       // Normal assignment
            }
        }
    }
}

module.exports = exports = QualifierParser;