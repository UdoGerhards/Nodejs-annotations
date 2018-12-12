'use strict';

var ContextAnnotation = require("../../../../annotation/instance/Context/ContextAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js");

class ContextParser extends BeanParser {

    static get SUPPORTS() {
        return [ContextAnnotation.name]
    };

    constructor() {
        super();
    }

    _stage(annotationInformation, beanStructure, applicationStructure) {
        super._stage(annotationInformation, beanStructure, applicationStructure);
        beanStructure._isContext = true;
    }
}

module.exports = exports = ContextParser;