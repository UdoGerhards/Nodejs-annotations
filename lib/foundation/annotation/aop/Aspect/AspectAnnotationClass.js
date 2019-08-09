'use strict';

var Bean = require("../../../../../lib/foundation/annotation/instance/Bean/BeanAnnotationClass.js");


class Aspect extends Bean {

    static get TYPE() {return (global.TYPE_ANNOTATION_AWARE + global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE)};

}

module.exports = exports = Aspect;