'use strict';

var path = require("path")
    , util = require("util")
    , Bean = require(process.env.PWD+path.sep+"lib"+path.sep+"annotation"+path.sep+"Bean/BeanAnnotationClass.js");


class Lazy extends Bean {
    static get TYPE() {return Bean.TYPE_ANNOTATION_SOURCE};
}

module.exports = exports = Lazy;