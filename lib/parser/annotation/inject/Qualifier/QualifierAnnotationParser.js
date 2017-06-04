'use strict';

var path = require("path")
    , util = require("util")
    , Bean = require(process.env.PWD+path.sep+"lib"+path.sep+"annotation"+path.sep+"Bean/BeanAnnotationClass.js");

class Qualifier extends Bean {
    static get TYPE() {return Bean.TYPE_ANNOTATION_AWARE + Bean.TYPE_ANNOTATION_TARGET + Bean.TYPE_CLASS_MEMBER_AWARE}
    }

module.exports = exports = Qualifier;