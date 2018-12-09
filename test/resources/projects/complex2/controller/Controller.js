'use strict';

/**
 * @Controller("Controller")
 * @constructor
 */
function Controller() {
    var instance = this;

    /*
     * @Qualifier("Bean")
     */
    instance.bean = null;

    /*
     * @Qualifier("Service")
     */
    instance.service = null;

    /*
    * @Qualifier("Service2")
    */
    instance.service = null;

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