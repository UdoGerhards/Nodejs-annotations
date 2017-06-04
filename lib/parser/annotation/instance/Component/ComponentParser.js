'use strict';

var ComponentAnnotation = require("../../../annotation/Component/ComponentAnnotationClass")
    , BeanParser = require("../Bean/BeanParser.js")
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