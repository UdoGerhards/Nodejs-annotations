'use strict';

var path = require("path")
    , util = require("util")
    , Inject = require("../Inject/InjectAnnotationClass.js");

class Qualifier {
    static get TYPE() {return global.TYPE_ANNOTATION_TARGET};
    }

module.exports = exports = Qualifier;