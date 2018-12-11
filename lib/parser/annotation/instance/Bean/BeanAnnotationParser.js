'use strict';
var BeanAnnotation = require("../../../../annotation/instance/Bean/BeanAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , MainBeanLoader = require("./MainBeanLoader")
    , SubBeanLoader = require("./SubBeanLoader")
    , util = require("util");


class BeanParser extends BaseAnnotationParser {

    static get SUPPORTS() {
        return [BeanAnnotation.name]
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

        // Normal behavior
        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._INSTANTIATE_:
                beanStructure = instance._instantiate(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
                instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        super.parse(annotationInformation, beanStructure, applicationStructure);

        return beanStructure;

    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var logger = instance.logger;

        // Get the name of the class or property definition
        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var result = parser.parse(leadingToken);
        var property = result.id;

        // Get a dedicated bean name if set as parameter in the annotation
        var paramText = annotationInformation.annotationValue;

        var parameterMatch = new RegExp("\([\"|\'](.*)[\"|\']\)", "g");;
        var match = parameterMatch.exec(paramText);

        var beanName = null;
        if (match && match.length > 2) {
            beanName = match[2];
        }

        beanStructure.beanName = beanName || property;         // Either we have dedicated descriptor or we take the property name as bean name
        applicationStructure.nameToNamespace[beanStructure.beanName] = beanStructure;

        var debug =false;
        if (beanStructure.descriptor.annotationValue == '("InnerBeanLevel3")') {
            debug = false;
        }

       // if (debug)
           // console.log(beanStructure);

        // Prepare loader
        var path = beanStructure.path;
        var namespace = beanStructure.namespace.split(":");

        if (namespace.length === 1) {

            var loader = new MainBeanLoader();

            loader.setBeanStructure(beanStructure);
            loader.setPath(path);
            loader.setNamespace(namespace[0]);
            loader.logger = logger;
            beanStructure.loader = loader;

        } else {

                var namespaceSeq = namespace;


                var parentBeanStructure = instance._getSingleBeanStructureFromApplicationStack(namespaceSeq, applicationStructure, debug);

            if (debug) {
                console.log(namespaceSeq);
                console.log(parentBeanStructure)
            }

                var parentBeanLoader = parentBeanStructure.loader;

                var parentNamespace = namespaceSeq[namespaceSeq.length - 2];
                var beanNamespace = namespaceSeq[namespaceSeq.length - 1];

                var loader = new SubBeanLoader();

                loader.setParentProperty(property);
                loader.setBeanStructure(beanStructure);
                loader.setNamespace(beanNamespace);
                loader.logger = logger;
                beanStructure.loader = loader;

                try {
                    var listenerCount = parentBeanLoader.listenerCount(parentNamespace);
                    var maxListenerCount = listenerCount + 1;
                    parentBeanLoader.setMaxListeners(maxListenerCount);

                    if (debug) {
                        console.log(beanStructure.descriptor.annotationValue)
                        console.log("Parent namespace: " + parentNamespace);
                        console.log("Own namespace: " + beanNamespace);
                        console.log("\n");
                    }

                    parentBeanLoader.once(parentNamespace, loader.instantiate.bind(loader));

                    beanStructure.loader = loader;
                } catch (error) {

                    logger.error(error);

                }

        }
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

        if (typeof beanStructure.loader != "undefined" && beanStructure.loader.constructor.name == "MainBeanLoader") {
            beanStructure.loader.instantiate();

            var _instance = beanStructure._instance;
            var className = _instance.constructor.name;

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

        return beanStructure;
    }

    /**
     * Finish bean setup by sorting
     */
    _finishSetup(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        if (!applicationStructure.instanceTypes) {
            applicationStructure.instanceTypes = {};
        }

        var type = annotationInformation.annotation.name;

        if (!Array.isArray(applicationStructure.instanceTypes[type])) {
            applicationStructure.instanceTypes[type] = [];
        }

        applicationStructure.instanceTypes[type].push(beanStructure._instance);

        return beanStructure;
    }
}

module.exports = exports = BeanParser;