'use strict';
var BeanAnnotation = require("../../../../annotation/instance/Bean/BeanAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash");


class BeanParser extends BaseAnnotationParser{

    static get SUPPORTS() {return [BeanAnnotation.name]};

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
        var stage = beanObject.stage;

        // Normal behavior
        switch(stage) {
            case global._STAGE_:
                beanObject = instance._stage(annotationInformation, beanObject, applicationStructure);
                break;
            case global._INSTANTIATE_:
                beanObject = instance._instantiate(annotationInformation, beanObject, applicationStructure);
                break;
            case global._FINISH_SETUP_:
                beanObject = instance._finishSetup(annotationInformation, beanObject, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        var beanObject = super.parse(annotationInformation, beanObject);
        return beanObject;
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanObject
     * @private
     */
    _stage(annotationInformation, beanObject, applicationStructure) {
        var instance = this;

        // Get the name of the class or property definition
        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var result = parser.parse(leadingToken);
        var property = result.id;

        // Get a dedicated bean name if set as parameter in the annotation
        var paramText = annotationInformation.annotationValue;;
        var match = instance.parameterMatch.exec(paramText);

        var beanName = null;
        if (match && match.length > 2) {
            beanName = match[2];
        }

        beanObject.beanName = beanName || property;         // Either we have dedicated descriptor or we take the property name as bean name


        // Prepare loader
        var path = beanObject.path;
        var namespace = beanObject.namespace.split(":");

        if (namespace.length === 1) {

            // We have a module bean and can instantiate it normaly
            beanObject.loader = function () {
                var module = require(path);
                if (_.isFunction(module)) {
                    return new module();
                } else if (_.isObject(module)) {
                    return module;
                }
            }

        } else {
            var containingBeanNamespace = namespace[namespace.length-2];
            beanObject.loader = function() {
                var namespace = namespace;

                // Access the according property in the parent bean
                var definition = applicationStructure[containingBeanNamespace][property];
                if (_.isFunction(definition)) {
                    return new definition();
                } else if (_.isObject(definition)) {
                    return definition;
                }
            }

        }

        return beanObject;
    }

    /**
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanObject
     * @private
     */
    _instantiate(annotationInformation, beanObject, applicationStructure){
        var instance = this;

        if (typeof beanObject.loader === "function") {
            var module = beanObject.loader();
            beanObject._instance = module;
        }

        return beanObject;
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

module.exports = exports = BeanParser;