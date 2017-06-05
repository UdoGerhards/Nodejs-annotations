'use strict';

var path = require("path")
    , util = require("util")
    , Bean = require(process.env.PWD+path.sep+"lib"+path.sep+"annotation"+path.sep+"instance/Bean/BeanAnnotationClass.js");


class Resource extends Bean {

    static get TYPE() {return (constants.TYPE_ANNOTATION_AWARE + constants.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE + constants.TYPE_ANNOTATION_APPLICATION_CONTEXT_AWARE)};

}

module.exports = exports = Resource;