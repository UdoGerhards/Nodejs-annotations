'use strict';

var ControllerAnnotation = require("../../../../annotation/instance/Controller/ControllerAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js");

class ControllerParser extends BeanParser {

    static get SUPPORTS() {
        return [ControllerAnnotation.name]
    };

}

module.exports = exports = ControllerParser;