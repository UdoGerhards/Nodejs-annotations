'use strict';
var QualifierAnnotation = require("../../../../annotation/inject/Qualifier/QualifierAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , util = require("util")
    , _ = require("lodash");


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
        var logger = instance.logger;

        var targetBeanName = annotationInformation.sourceBean;
        var targetProperty = annotationInformation.property;

        logger.debug("    ...  processing qualifier for " + targetBeanName);

        // We only inject in objects!!!
        if (targetProperty && beanStructure._instance && (typeof beanStructure._instance == "object" || beanStructure.virtual)) {

            // Search by name
            try {

                var injectable = null;

                if (applicationStructure.nameToNamespace[targetBeanName] && typeof applicationStructure.nameToNamespace[targetBeanName].virtual == "function") {
                    // console.log(applicationStructure.nameToNamespace[targetBeanName].beanName);
                    injectable = applicationStructure.nameToNamespace[targetBeanName].virtual;
                } else {
                    injectable = applicationStructure.nameToNamespace[targetBeanName]._instance || null;
                }

                var injectable = applicationStructure.nameToNamespace[targetBeanName]._instance || null;
            } catch (error) {
                logger.error("Missing bean " + util.inspect(targetBeanName));
            }

            if (!injectable) {

                // Scan for according classes by class name
                for (var name in applicationStructure.nameToNamespace) {
                    if (applicationStructure.nameToNamespace[name].constructor.name === targetBeanName) {
                        injectable = applicationStructure.nameToNamespace[name];
                        break;
                    }
                }

            }

            var target = null;
            try {
                target = beanStructure._instance[targetProperty];
            } catch (error) {
                logger.log(beanStructure);
                logger.error(error);
            }

            if (injectable) {
                if (target && Array.isArray(target)) {
                    // Array
                    beanStructure._instance[targetProperty].push(injectable);                                   // Add to array
                } else if (target && typeof target === "object") {
                    // Object
                    var beanName = applicationStructure.nameToNamespace[targetBeanName].beanName;
                    beanStructure._instance[targetProperty][beanName] = injectable;                             // Add as property to the target object
                } else if (target && typeof target === "function") {
                    try {
                        // Function
                        try {
                            var args = [injectable];
                            beanStructure._instance[targetProperty].apply(beanStructure._instance, args);         // function call
                        } catch(error) {
                            //logger.info(error);
                        }
                    } catch (error) {
                        logger.log(error);
                    }

                } else if (target !== "undefined") {
                    try {
                        // Property
                        beanStructure._instance[targetProperty] = injectable; // Normal assignment
                    } catch (error) {
                        // console.log(beanStructure);
                        //logger.info(error);
                    }
                }
            }
        }
    }
}

module.exports = exports = QualifierParser;