'use strict';

/**
 * @Component("Component_B")
 * @constructor
 */
function Component() {
    var instance = this;

    instance.initFlag = null;

    /**
     * @Qualifier("Service_B")
     */
    instance.service = null;
}

/**
 * @Init()
 */
Component.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");
}

module.exports = exports = Component;