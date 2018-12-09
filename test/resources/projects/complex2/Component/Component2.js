'use strict';

/**
 * @Component("Component2")
 * @constructor
 */
function Component2() {
    var instance = this;

    instance.initFlag = null;
}

/**
 * @Init()
 */
Component2.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");
}

module.exports = exports = Component2;