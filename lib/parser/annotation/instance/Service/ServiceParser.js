'use strict';

var ServiceAnnotation = require("../../../../annotation/instance/Service/ServiceAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js");

class ServiceParser extends BeanParser {

    static get SUPPORTS() {
        return [ServiceAnnotation.name]
    };
}

module.exports = exports = ServiceParser;