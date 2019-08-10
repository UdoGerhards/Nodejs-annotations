'use strict';

let Module = require("../../../../../lib/foundation/annotation/base/ModuleAware");

class Resource extends Module {

    static get TYPE() {return global.TYPE_ANNOTATION_MODULE};

}

module.exports = exports = Resource;