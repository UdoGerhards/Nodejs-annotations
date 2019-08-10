'use strict';

let Support = require("../../../../../lib/foundation/annotation/base/SupportAware")

class PointCut extends Support {

    static get TYPE() {return global.TYPE_ANNOTATION_SUPPORT};
}

module.exports = exports = PointCut;