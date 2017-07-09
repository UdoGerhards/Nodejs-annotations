'use strict';

var ConfigurationAnnotation = require("../../../../annotation/instance/Configuration/ConfigurationAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util");


class ConfigurationParser extends BeanParser {

    static get SUPPORTS() {
        return [ConfigurationAnnotation.name]
    };
}

module.exports = exports = ConfigurationParser;