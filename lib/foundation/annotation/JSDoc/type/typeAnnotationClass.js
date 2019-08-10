'use strict';

let Member = require("../../../../../lib/foundation/annotation/base/MemberAware");

class type extends Member {
    static get TYPE() {return global.TYPE_ANNOTATION_TARGET};
}

module.exports = exports = type;