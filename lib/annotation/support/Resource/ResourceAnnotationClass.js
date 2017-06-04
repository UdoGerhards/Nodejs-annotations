'use strict';

var path = require("path")
    , util = require("util");

class Resource{
    static get TYPE() {return global.TYPE_ANNOTATION_TARGET};
}

module.exports = exports = Resource;