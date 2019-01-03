'use strict';

/**
 * @Component("ComponentBean")
 * @constructor
 */
function Component() {
    var instance = this;

    /*
     * @Qualifier("Controller")
     */
    instance.controller= null;

    instance.initFlag = null;
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