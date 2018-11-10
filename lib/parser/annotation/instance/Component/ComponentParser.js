'use strict';

var ComponentAnnotation = require("../../../../annotation/instance/Component/ComponentAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js");

class ComponentParser extends BeanParser {

    static get SUPPORTS() {
        return [ComponentAnnotation.name]
    };
}

module.exports = exports = ComponentParser;