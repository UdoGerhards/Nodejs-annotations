'use strict';

var PluginAnnotation = require("../../../../annotation/instance/Plugin/PluginAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util");


class PluginParser extends BeanParser {

    static get SUPPORTS() {
        return [PluginAnnotation.name]
    };
}

module.exports = exports = PluginParser;