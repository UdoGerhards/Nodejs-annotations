'use strict';

var Bean = require("../../../../../lib/foundation/annotation/instance/Bean/BeanAnnotationClass.js");


class Before extends Bean {
    static get TYPE() {return global.TYPE_ANNOTATION_TARGET};
}

module.exports = exports = Before;