'use strict';

let Member = require("../../../../../lib/foundation/annotation/base/MemberAware");

class Before extends Member {
    static get TYPE() {return global.TYPE_ANNOTATION_TARGET};
}

module.exports = exports = Before;