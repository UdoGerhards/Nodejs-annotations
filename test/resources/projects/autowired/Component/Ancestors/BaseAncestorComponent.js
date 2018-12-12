'use strict';

/**
 * @Prototype("BaseAncestorComponent")
 * @constructor
 */
function BaseAncestorComponent() {
    var instance = this;

    instance.initFlag = null;
}

/**
 * @Init()
 */
BaseAncestorComponent.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = BaseAncestorComponent;