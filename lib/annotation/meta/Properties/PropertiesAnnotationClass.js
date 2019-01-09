'use strict';

var Bean = require("../../../../lib/annotation/instance/Bean/BeanAnnotationClass");

class Properties extends Bean {

    static get TYPE() {return global.TYPE_ANNOTATION_SUPPORT};
}

module.exports = exports = Properties;