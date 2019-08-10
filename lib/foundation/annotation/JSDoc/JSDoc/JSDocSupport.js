'use strict';

let Support = require("../../../../../lib/foundation/annotation/base/SupportAware");

class JSDocSupport extends Support {
    static get STRICT() {return 0x99};
    static get CONVERT() {return 0x10};
}

module.exports = exports = JSDocSupport;