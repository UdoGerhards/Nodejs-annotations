'use strict';

var ComponentAnnotation = require("../../../../annotation/instance/Component/ComponentAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util");


class ComponentParser extends BeanParser {

    static get SUPPORTS() {
        return [ComponentAnnotation.name]
    };

    init() {
        super.init();
        var instance = this;

    }
}

module.exports = exports = ComponentParser;