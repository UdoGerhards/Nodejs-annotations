'use strict';

/**
 * @Prototype("AncestorComponent")
 * @Inherits("BaseAncestorComponent")
 * @constructor
 */
function AncestorComponent() {
    var instance = this;

    instance.service = null;

    instance.initFlag = null;
}

module.exports = exports = AncestorComponent;