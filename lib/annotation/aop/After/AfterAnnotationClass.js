'use strict';

var path = require("path")
    , util = require("util")
    , Bean = require(process.env.PWD+path.sep+"lib"+path.sep+"annotation"+path.sep+"instance/Bean/BeanAnnotationClass.js");


class After extends Bean {
}

module.exports = exports = After;