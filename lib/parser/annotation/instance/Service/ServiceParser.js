'use strict';

var ServiceAnnotation = require("../../../../annotation/instance/Service/ServiceAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util");

class ServiceParser extends BeanParser {

    static get SUPPORTS() {
        return [ServiceAnnotation.name]
    };
}

module.exports = exports = ServiceParser;