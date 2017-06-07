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
     * @param beanObject
     */
    parse(annotationInformation, beanObject, applicationStructure) {

        var instance = this;
        var beanObject = super.parse(annotationInformation, beanObject, applicationStructure);
        var stage = beanObject.stage;

        switch(stage) {
            case global._BUILD_STRUCTURE_:
                beanObject = instance._build_struct(annotationInformation, beanObject, applicationStructure);
                return beanObject;
                break;
            case global._STAGE_:
                beanObject = instance._stage(annotationInformation, beanObject, applicationStructure);
                return beanObject;
                break;
            case global._INSTANTIATE_:
                beanObject = instance._instantiate(annotationInformation, beanObject, applicationStructure);
                return beanObject;
                break;
            case global._FINISH_SETUP_:
                beanObject = instance._finishSetup(annotationInformation, beanObject, applicationStructure);
                break;
            default:
                return beanObject;
                break;
        }
    }

    /**
     * Will be called during build of the bean structure when an according annotation was matched
     *
     * @param annotationInformation
     * @param beanObject
     * @returns {*}
     * @private
     */
    _build_struct(annotationInformation, beanObject, applicationStructure) {
        var instance = this;

        var paramText = annotationInformation.annotationValue;

        var match = instance.parameterMatch.exec(paramText);

        if (match && match.length > 2) {
            beanObject.beanName = match[2];
        } else {
            var leadingToken = annotationInformation.tokens[0];
            var parser = instance.tokenParser[leadingToken.type];

            var result = parser.parse(leadingToken);
            beanObject.beanName = result.id;
        }

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
        var path = beanObject.path;

        if (!beanObject.loader && !_.isEmpty(path)) {
            beanObject.loader = function () {
                var module = require(path);
                if (_.isFunction(module)) {
                    return module;
                } else if (_.isObject(module)) {
                    throw new Error("Prototypes must be classes only!");
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
    _instantiate(annotationInformation, beanObject, applicationStructure) {
        var instance = this;

        if (typeof beanObject.loader === "function") {
            var module = beanObject.loader();
            beanObject._instance = module;
        }

        return beanObject;
    }
}

module.exports = exports = Prototype;