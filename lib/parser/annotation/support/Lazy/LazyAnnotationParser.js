'use strict';

var Bean = require("../../../../annotation/instance/Bean/BeanAnnotationClass");

class Lazy extends Bean {
    static get TYPE() {return Bean.TYPE_ANNOTATION_SUPPORT};
}

module.exports = exports = Lazy;