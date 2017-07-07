'use strict';

var path = require("path")
    , util = require("util")
    , Bean = require("../../../../lib/annotation/instance/Bean/BeanAnnotationClass");


class Lazy extends Bean {
    static get TYPE() {return Bean.TYPE_ANNOTATION_SUPPORT};
}

module.exports = exports = Lazy;