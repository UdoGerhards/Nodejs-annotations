'use strict';

let Support = require("../../../../../lib/foundation/annotation/base/SupportAware");

class Autowire extends Support {

    static get TYPE() {return global.TYPE_ANNOTATION_SUPPORT};

    }

module.exports = exports = Autowire;