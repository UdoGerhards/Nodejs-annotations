'use strict';

var ResourceAnnotation = require("../../../../annotation/instance/Resource/ResourceAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util");

class ResourceParser extends BeanParser {

    static get SUPPORTS() {
        return [ResourceAnnotation.name]
    };

    init() {
        super.init();
        var instance = this;
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
}

module.exports = exports = ResourceParser;