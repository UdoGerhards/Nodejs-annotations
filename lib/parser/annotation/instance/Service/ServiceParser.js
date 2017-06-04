'use strict';

var ServiceAnnotation = require("../../../annotation/Service/ServiceAnnotationClass")
    , BeanParser = require("../Bean/BeanParser.js")
    , path = require("path")
    , util = require("util");

class ServiceParser extends BeanParser {

    static get SUPPORTS() {
        return [ServiceAnnotation.name]
    };

    init() {
        super.init();
        var instance = this;
    }
}

module.exports = exports = ServiceParser;