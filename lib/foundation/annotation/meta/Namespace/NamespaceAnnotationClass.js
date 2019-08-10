'use strict';

let Support = require("../../../../../lib/foundation/annotation/base/SupportAware");

class Namespace extends Support {

    static get TYPE() {return global.TYPE_ANNOTATION_SUPPORT};
}

module.exports = exports = Namespace;