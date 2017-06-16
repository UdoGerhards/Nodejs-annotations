'use strict';

var ContextAnnotation = require("../../../../annotation/instance/Context/ContextAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util");

class ContextParser extends BeanParser {

    static get SUPPORTS() {
        return [ContextAnnotation.name]
    };
}

module.exports = exports = ContextParser;