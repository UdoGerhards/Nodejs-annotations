'use strict';

var Bean = require("../../../../lib/annotation/instance/Bean/BeanAnnotationClass.js");


class After extends Bean {

    static get TYPE() {return global.TYPE_ANNOTATION_TARGET};
}

module.exports = exports = After;