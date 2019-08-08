'use strict';

/**
 * @Controller("Controller_A")
 * @constructor
 */
function Controller() {
    var instance = this;

    /**
     * @Qualifier("Bean_A")
     */
    instance.bean = null;

    /**
     * @Qualifier("Service_A")
     */
    instance.serviceA = null;

    /**
     * @Qualifier("Service_B")
     */
    instance.serviceB = null;

    instance.initFlag = null;
}

/**
 * @Init()
 */
Controller.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");
}

module.exports = exports = Controller;