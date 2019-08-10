'use strict';

var Bean = require("../Bean/BeanAnnotationClass");

class Resource extends Bean {

    static get TYPE() {return global.TYPE_ANNOTATION_MODULE};

}

module.exports = exports = Resource;