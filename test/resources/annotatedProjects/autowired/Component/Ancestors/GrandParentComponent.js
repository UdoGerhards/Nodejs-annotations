'use strict';

/**
 * @Prototype("GrandParentComponent")
 */
function GrandParentComponent() {
    var instance = this;

    instance.initFlag = null;
}

/**
 * @Init()
 */
GrandParentComponent.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = GrandParentComponent;