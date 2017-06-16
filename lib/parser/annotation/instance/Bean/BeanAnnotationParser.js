'use strict';
var BeanAnnotation = require("../../../../annotation/instance/Bean/BeanAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , Promise = require("bluebird");


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
                instance._instantiate(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
                instance._finishSetup(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        super.parse(annotationInformation, beanStructure, applicationStructure);

    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        // Get the name of the class or property definition
        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var result = parser.parse(leadingToken);
        var property = result.id;

        // Get a dedicated bean name if set as parameter in the annotation
        var paramText = annotationInformation.annotationValue;

        var parameterMatch = new RegExp("\([\"|\'](\\w.*\\w)[\"|\']\)", "g");;
        var match = parameterMatch.exec(paramText);

        var beanName = null;
        if (match && match.length > 2) {
            beanName = match[2];
        }

        beanStructure.beanName = beanName || property;         // Either we have dedicated descriptor or we take the property name as bean name
        applicationStructure.nameToNamespace[beanStructure.beanName] = beanStructure;


        // Prepare loader
        var path = beanStructure.path;
        var namespace = beanStructure.namespace.split(":");

        if (namespace.length === 1) {

            // We have a module bean and can instantiate it normaly
            beanStructure.loader = function mainBean() {
                var module = require(path);
                if (_.isFunction(module)) {
                    return new module();
                } else if (_.isObject(module)) {
                    return module;
                }
            }

        } else {

            var innerBeanStructure = instance._getSingleBeanStructureFromApplicationStack(namespace, applicationStructure);
            beanStructure.loader = function innerBean() {
                var beanInstance = innerBeanStructure._instance;
                // Access the according property in the parent bean
                var definition = beanInstance[property];
                if (_.isFunction(definition)) {
                    return new definition();
                } else if (_.isObject(definition)) {
                    return definition;
                }
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

        if (typeof beanStructure.loader === "function") {
            var module = beanStructure.loader();
            beanStructure._instance = module;
        }
    }
}

module.exports = exports = BeanParser;