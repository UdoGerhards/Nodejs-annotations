'use strict';
var BeanAnnotation = require("../../../../annotation/instance/Prototype/PrototypeAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash");


class Prototype extends BaseAnnotationParser{

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
     * @param beanStructure
     */
    parse(annotationInformation, beanStructure) {

        var instance = this;
        var beanObject = super.parse(annotationInformation, beanStructure);
        var stage = beanStructure.stage;

        switch(stage) {
            case global._BUILD_STRUCTURE_:
                beanStructure = instance._build_struct(annotationInformation, beanStructure);
                return beanStructure;
                break;
            case global._STAGE_:
                beanStructure = instance._stage(annotationInformation, beanStructure);
                return beanStructure;
                break;
            case global._INSTANTIATE_:
                beanStructure = instance._instantiate(annotationInformation, beanStructure);
                return beanStructure;
                break;
            case global._FINISH_SETUP_:
                beanStructure = instance._finishSetup(annotationInformation, beanStructure);
                break;
            default:
                return beanStructure;
                break;
        }
    }

    /**
     * Will be called during build of the bean structure when an according annotation was matched
     *
     * @param annotationInformation
     * @param beanStructure
     * @returns {*}
     * @private
     */
    _build_struct(annotationInformation, beanStructure) {
        var instance = this;

        var paramText = annotationInformation.annotationValue;

        var match = instance.parameterMatch.exec(paramText);

        if (match && match.length > 2) {
            beanStructure.beanName = match[2];
        } else {
            var leadingToken = annotationInformation.tokens[0];
            var parser = instance.tokenParser[leadingToken.type];

            var result = parser.parse(leadingToken);
            beanStructure.beanName = result.id;
        }

        return beanStructure;
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure) {
        var instance = this;
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

        return beanStructure;

    }

    /**
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _instantiate(annotationInformation, beanStructure) {
        var instance = this;

        if (typeof beanStructure.loader === "function") {
            var module = beanStructure.loader();
            beanStructure._instance = module;
        }

        return beanStructure;
    }

    /**
     * Finish bean setup
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _finishSetup(annotationInformation, beanStructure) {
        var instance = this;
    }
}

module.exports = exports = Prototype;