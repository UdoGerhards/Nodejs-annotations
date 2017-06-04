'use strict';

var path = require("path")
    , util = require("util")
    , Bean = require(process.env.PWD+path.sep+"lib"+path.sep+"annotation"+path.sep+"instance/Bean/BeanAnnotationClass.js");

class Init extends Bean {

    static get TYPE() {return Bean.TYPE_CLASS_MEMBER_AWARE};
}

module.exports = exports = Init;