'use strict';

var path = require("path")
    , util = require("util");


class Lazy {
    static get TYPE() {return global.TYPE_ANNOTATION_SUPPORT};
}

module.exports = exports = Lazy;