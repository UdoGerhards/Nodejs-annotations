'use strict';
import BaseParser from "../../Base/Base";

class Aspect extends BaseParser {

    constructor() {
        super();

        let instance = this;
        instance.MainBeanLoader = null;
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

        // Normal behavior
        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._INSTANTIATE_:
                beanStructure = instance._instantiate(annotationInformation, beanStructure, applicationStructure);
                break;
            /*
            case global.stages._FINISH_SETUP_:
                instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            */
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        //

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
        let MainBeanLoader = instance.MainBeanLoader;

        // Get the name of the class or property definition
        var property = annotationInformation.property;

        // Get a dedicated bean name if set as parameter in the annotation
        var paramText = annotationInformation.annotationValue;

        var parameterMatch = new RegExp("\([\"|\']?(\\w.*\\w)[\"|\']?\)", "g");
        var match = parameterMatch.exec(paramText);

        var beanName = null;
        if (match && match.length > 2) {
            beanName = match[2];
        }

        beanStructure.beanName = beanName || property;         // Either we have dedicated descriptor or we take the property name as bean name
        applicationStructure.nameToNamespace[beanStructure.beanName] = beanStructure;

        beanStructure._isAspect = true;


        // Prepare loader
        var path = beanStructure.path;
        var namespace = beanStructure.namespace.split(String.fromCharCode(12));

        if (namespace.length === 1) {

            var loader = new MainBeanLoader();

            loader.setBeanStructure(beanStructure);
            loader.setPath(path);
            loader.setNamespace(namespace[0]);
            loader.logger = logger;
            beanStructure.loader = loader;
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
            var beanName = beanStructure.beanName;

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

            //console.log(beanStructure);


            var className = _instance.constructor.name;

            if (!applicationStructure.classToBean) {
                applicationStructure.classToBean = {};
            }

            if (!applicationStructure.classToBean[className]) {
                applicationStructure.classToBean[className] = [];
            }

            applicationStructure.classToBean[className].push(beanStructure._instance);

            /**
             * Mark bean as aspect in application structure
             */

            //if (!_.isArray(applicationStructure.aspectsObjects)) {
            if (!Array.isArray(applicationStructure.aspectsObjects)) {
                applicationStructure.aspectsObjects = [];
            }

            //applicationStructure.aspects[className] = [];
            applicationStructure.aspectsObjects[beanName] = [];
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

        //applicationStructure.nameToNamespace[beanStructure.beanName] = beanStructure;

        return beanStructure;
    }
}

export default Aspect;