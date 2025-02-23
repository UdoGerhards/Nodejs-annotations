'use strict';
import BeanParser from '../Bean/BeanAnnotationParser';

class Configuration extends BeanParser {

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
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _instantiate(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var logger = instance.logger;
        let util = instance.util;

        if (typeof beanStructure.loader != "undefined" && beanStructure.loader.constructor.name == "MainBeanLoader") {
            beanStructure.loader.instantiate();

            var _instance = beanStructure._instance;
            let className =  null;
            try {
                className = _instance.constructor.name;
            } catch(e) {
                console.log(util.inspect(beanStructure, {depth:25}));
                throw e;
            }

            beanStructure._className = className;

            if (!applicationStructure.classToBean) {
                applicationStructure.classToBean = {};
            }

            if (!applicationStructure.classToBean[className]) {
                applicationStructure.classToBean[className] = [];
            }

            /**
             * Detect instance methods
             */

            beanStructure._methods = [];
            var obj = beanStructure._instance;
            var props = [];

            do {
                props = props.concat(Object.getOwnPropertyNames(obj));
            } while (obj = Object.getPrototypeOf(obj));

            beanStructure._methods = props.sort().filter(function(e, i, arr) {
                if (e!=arr[i+1] && typeof beanStructure._instance[e] == 'function') return true;
            });

            applicationStructure.classToBean[className].push(beanStructure._instance);
        }

        if (applicationStructure._autowire) {

            var beanInstance = beanStructure._instance;

            applicationStructure.nameToNamespace[beanStructure.beanName] = beanStructure;

            var obj = beanInstance;
            var props = [];

            do {
                Object.getOwnPropertyNames(obj).forEach(function (prop) {
                    if (props.indexOf(prop) === -1) {
                        if (typeof obj[prop] === "object" && prop !== "__proto__") {
                            props.push(prop);
                        }

                    }
                });
            } while (obj = Object.getPrototypeOf(obj));

            var structure = beanStructure.structure;

            structure.forEach(function (struct) {

                var index = props.indexOf(struct.property)
                if (index > -1) {
                    props.splice(index, 1);
                }

            });

            props.forEach(function (propName) {

                var capitalProName = instance.CamelCase(propName);
                capitalProName = (capitalProName[0].toUpperCase() + capitalProName.slice(1));

                var struct = {
                    "annotationValue": "(\"" + propName + "\")",
                    "annotation": instance.QualifierAnnotation,
                    "injector": true,
                    "sourceBean": capitalProName,
                    "property": propName,
                    "autowired": true
                };

                beanStructure.structure.push(struct);
            });
        }

        return beanStructure;
    }
}

export default Configuration;