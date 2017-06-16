'use strict';
var BeanAnnotation = require("../../../../annotation/instance/Prototype/PrototypeAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash");


class Prototype extends BaseAnnotationParser{

    static get SUPPORTS() {return [BeanAnnotation.name]};

    /**
     * Parses the bean structure during the different modes
     *
     * @param annotationInformation
     * @param beanStructure
     */
    parse(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;
        var stage = beanStructure.stage;

        switch(stage) {
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

        super.parse(annotationInformation, beanStructure, applicationStructure);
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructur
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

        var path = beanStructure.path;

        if (!beanStructure.loader && !_.isEmpty(path)) {
            beanStructure.loader = function () {
                var module = require(path);
                if (_.isFunction(module)) {
                    return module;
                } else if (_.isObject(module)) {
                    throw new Error("Prototypes must be classes only!");
                }
            }
        }
    }

    /**
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanStructur
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

module.exports = exports = Prototype;