'use strict';

/**
 * @Component("Component_A")
 * @constructor
 */
function Component() {
    var instance = this;

    instance.initFlag = null;

    /**
     * @Qualifier("Controller_A")
     */
    instance.controller= null;

    /**
     * @Qualifier("Service_A")
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