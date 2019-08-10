'use strict';

let Context = require("../../../../../lib/foundation/annotation/base/ContextAware");

class Aspect extends Context {

    static get TYPE() {return (global.TYPE_ANNOTATION_AWARE + global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE)};

}

module.exports = exports = Aspect;