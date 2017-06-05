'use strict';

var path = require("path")
    , util = require("util");

class Inject {
    static get TYPE() {return global.TYPE_ANNOTATION_TARGET};
    }

module.exports = exports = Inject;