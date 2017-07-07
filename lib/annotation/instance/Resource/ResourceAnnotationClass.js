'use strict';

var path = require("path")
    , util = require("util")
    , Bean = require("../../../../lib/annotation/instance/Bean/BeanAnnotationClass");


class Resource extends Bean {

    static get TYPE() {return (constants.TYPE_ANNOTATION_AWARE + constants.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE + constants.TYPE_ANNOTATION_APPLICATION_CONTEXT_AWARE)};

}

module.exports = exports = Resource;