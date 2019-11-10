'use strict';

const BaseParser = require("../../Base/Base");

class Store extends BaseParser {

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

        // Get name of the class or property name of according constructor and set it as bean name
        var sourceClassName = null;

        // Source bean name
        var sourceClassName = annotationInformation.annotationValue.trim();

        annotationInformation.injector = true;

        annotationInformation.sourceBean = sourceClassName;
        annotationInformation.property = annotationInformation.property;
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
        var util = instance.util;

        var sourceClassName = annotationInformation.sourceBean;
        var targetProperty = annotationInformation.property;
        var _ = instance._;

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
                        var type = typeof value;
                        return type=="object"?true:false;
                    })

                    injectable = inject;
                }

                //var injectable = applicationStructure.classToBean[sourceClassName] || null;
            } catch (error) {

                let alarm = applicationStructure._allertMissingBeans;

                if (alarm)
                    logger.error("Missing bean " + util.inspect(sourceClassName));
                //throw error;
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
                        throw error;
                    }
                }

            }

            var target = null;
            try {
                target = beanStructure._instance[targetProperty];
            } catch (error) {
                logger.error(error);
                throw error;
            }

            if (Array.isArray(injectable)) {
                if (target && Array.isArray(target)) {
                    // Array
                    beanStructure._instance[targetProperty] = beanStructure._instance[targetProperty].concat(injectable);
                } else if (target && typeof target === "object") {
                    // Object
                    injectable.forEach(function(inject){

                        var name = null;
                        //if(_.isObject(inject)) {
                        if(typeof inject == "object") {
                            name = inject.constructor.name;
                            //} else if (_.isFunction(inject)){
                        } else if (typeof inject == "function") {
                            name = inject.name;
                        }
                        beanStructure._instance[targetProperty][name] = inject;

                    })

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

module.exports = exports = Store;