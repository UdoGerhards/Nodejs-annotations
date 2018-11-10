'use strict';

var ContextAnnotation = require("../../../../annotation/instance/Context/ContextAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js");

class ContextParser extends BeanParser {

    static get SUPPORTS() {
        return [ContextAnnotation.name]
    };
}

module.exports = exports = ContextParser;