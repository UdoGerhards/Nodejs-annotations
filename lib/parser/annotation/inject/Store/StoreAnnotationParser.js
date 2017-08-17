'use strict';
var StoreAnnotation = require("../../../../annotation/inject/Store/StoreAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , Promise = require("bluebird");


class StoreParser extends BaseAnnotationParser {

    static get SUPPORTS() {
        return [StoreAnnotation.name]
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
        var sourceClassName = null;

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
            sourceClassName = match[2].trim();
        }

        annotationInformation.sourceBean = sourceClassName;
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

        var sourceClassName = annotationInformation.sourceBean;
        var targetProperty = annotationInformation.property;

        // We only inject in objects!!!
        if (typeof beanStructure._instance == "object") {

            logger.debug("    ...  processing qualifier for " + sourceClassName);

            // Search by name
            try {

                var getPrototype = function getConstructorChain(obj, type) {
                    var cs = [], pt = obj;
                    do {
                        if (pt = Object.getPrototypeOf(pt)) cs.push(pt.constructor || null);
                    } while (pt != null);
                    return type == 'names' ? cs.map(function(c) {
                        return c ? c.toString().split(/\s|\(/)[1] : null;
                    }) : cs;
                };

                var injectable = null;
                var types = [];
                var classToBean = applicationStructure.classToBean;
                for (var clazzName in classToBean){
                    var clazz = classToBean[clazzName];
                    var represant = clazz[0];   // => Get on object to test
                    var prototypes = getPrototype(represant, "names");
                    prototypes.push(clazzName);

                    if (prototypes.includes(sourceClassName)) {
                        types = types.concat(clazz);
                    }
                }

                if (types.length > 0) {
                    var inject = [];
                    inject = types.filter(function(value){
                        return !_.isFunction(value);
                    })

                    injectable = inject;
                }

                //var injectable = applicationStructure.classToBean[sourceClassName] || null;
            } catch (error) {
                logger.error("Missing bean " + util.inspect(sourceClassName));
            }

            if (!injectable) {

                // Scan for according classes by class name
                for (var name in applicationStructure.nameToNamespace) {
                    try {
                        if (applicationStructure.nameToNamespace[name]._instance && applicationStructure.nameToNamespace[name]._instance.constructor.name === sourceClassName) {
                            injectable = applicationStructure.nameToNamespace[name];
                            break;
                        }
                    } catch(error) {
                        logger.log(error);
                    }
                }

            }

            var target = null;
            try {
                target = beanStructure._instance[targetProperty];
            } catch (error) {
                logger.error(error);
            }

            if (Array.isArray(injectable)) {
                if (target && Array.isArray(target)) {
                    // Array
                    beanStructure._instance[targetProperty] = beanStructure._instance[targetProperty].concat(injectable);
                } else if (target && typeof target === "object") {
                    // Object
                    var beanName = applicationStructure.nameToNamespace[sourceClassName].beanName;

                } else if (target && typeof target === "function") {
                    // Function
                    var args = [injectable];


                } else if (target !== "undefined") {
                    // Property
                    beanStructure._instance[targetProperty] = injectable;                                       // Normal assignment
                }
            } else if (injectable) {
                if (target && Array.isArray(target)) {
                    // Array
                    beanStructure._instance[targetProperty].push(injectable);                                   // Add to array
                } else if (target && typeof target === "object") {
                    // Object
                    var beanName = applicationStructure.nameToNamespace[sourceClassName].beanName;
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
}

module.exports = exports = StoreParser;