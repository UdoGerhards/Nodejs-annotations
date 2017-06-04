'use strict';
var BeanAnnotation = require("../../../../annotation/instance/Bean/BeanAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util");


class BeanParser extends BaseAnnotationParser{

    static get SUPPORTS() {return [BeanAnnotation.name]};

    // ("(param|test)=(.*)")|("(.*)")

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
                break;
            case global._INSTANTIATE_:
                beanStructure = instance._instantiate(annotationInformation, beanStructure);
                break;
            case global._INJECT_:
                beanStructure = instance._inject(annotationInformation, beanStructure);
                break;
            case global._FINISH_SETUP_:
                beanStructure = instance._finishSetup(annotationInformation, beanStructure);
                break;
            default:
                throw new Error("Unsupported mode");
                break;
        }
    }

    _build_struct(annotationInformation, beanStructure) {
            var instance = this;

            var paramText = annotationInformation.annotationValue;

            var match = instance.parameterMatch.exec(paramText);

            if (match && match.length > 2) {
                beanStructure.beanName = match[2];
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
    }

    /**
     * Inject the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _inject(annotationInformation, beanStructure) {
        var instance = this;
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

module.exports = exports = BeanParser;