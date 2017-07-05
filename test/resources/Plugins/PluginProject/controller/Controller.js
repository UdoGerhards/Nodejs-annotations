'use strict';

/**
 * @Controller("Controller")
 */
function Controller() {
    var instance = this;

    /*
     * @Qualifier("Bean")
     */
    instance.bean = null;

    /*
     * @Qualifier("ServiceBean")
     */
    instance.service = null;

    /*
     * @Qualifier("ComponentBean")
     */
    instance.component = null;

    /*
     * @Qualifier("Util")
     */
    instance.util = null;

    instance.initFlag = null;
}

/**
 * @Init()
 */
Controller.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
}

module.exports = exports = Controller;