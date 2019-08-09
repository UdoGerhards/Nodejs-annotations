'use strict';

var Bean = require("../../../../../lib/foundation/annotation/instance/Bean/BeanAnnotationClass");

class Namespace extends Bean {

    static get TYPE() {return global.TYPE_ANNOTATION_SUPPORT};
}

module.exports = exports = Namespace;