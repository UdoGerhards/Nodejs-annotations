'use strict';

/**
 * @Prototype("ParentComponent")
 * @Inherits("GrandParentComponent")
 */
function ParentComponent() {
    var instance = this;

    instance.service = null;

    instance.initFlag = null;
}

module.exports = exports = ParentComponent;