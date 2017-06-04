'use strict';

var ControllerAnnotation = require("../../../../annotation/instance/Controller/ControllerAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util");

class ControllerParser extends BeanParser {

    static get SUPPORTS() {
        return [ControllerAnnotation.name]
    };

    init() {
        super.init();
        var instance = this;

    }
}

module.exports = exports = ControllerParser;