'use strict';
var BeanAnnotation = require("../../../../annotation/instance/Bean/BeanAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js")
    , path = require("path")
    , util = require("util");


class BeanParser extends BaseAnnotationParser{

    static get SUPPORTS() {return [BeanAnnotation.name]};

    constructor() {
        super();
    }

    init() {

        var instance = this;

    }

    /**
     * Parses the bean structure during the different modes
     *
     * @param annotationInformation
     * @param beanObject
     * @param beanStructure
     */
    parse(annotationInformation, beanObject, beanStructure) {

        var instance = this;
        var beanObject = super.parse(annotationInformation, beanObject, beanStructure);
        var mode = beanObject.mode;

        switch(mode) {
            case "stage":
                beanObject = instance._stage(annotationInformation, beanObject, beanStructure);



                break;
            case "instantiate":
                beanObject = instance._instantiate(annotationInformation, beanObject, beanStructure);
                break;
            case "inject":
                beanObject = instance._inject(annotationInformation, beanObject, beanStructure);
                break;
            case "finishSetup":
                beanObject = instance._finishSetup(annotationInformation, beanObject, beanStructure);
                break;
            default:
                throw new Error("Unsupported mode");
                break;
        }
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanObject
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanObject, beanStructure) {
        var instance = this;
    }

    /**
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanObject
     * @param beanStructure
     * @private
     */
    _instantiate(annotationInformation, beanObject, beanStructure) {
        var instance = this;
    }

    /**
     * Inject the bean
     *
     * @param annotationInformation
     * @param beanObject
     * @param beanStructure
     * @private
     */
    _inject(annotationInformation, beanObject, beanStructure) {
        var instance = this;
    }

    /**
     * Finish bean setup
     *
     * @param annotationInformation
     * @param beanObject
     * @param beanStructure
     * @private
     */
    _finishSetup(annotationInformation, beanObject, beanStructure) {
        var instance = this;
    }
}

module.exports = exports = BeanParser;