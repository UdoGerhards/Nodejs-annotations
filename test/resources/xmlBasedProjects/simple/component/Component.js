'use strict';

/**
 * @Component("ComponentBean")
 * @constructor
 */
function Component() {
    var instance = this;

    /*
     * @Qualifier("Bean")
     */
    instance.bean = null;

    /*
     * @Qualifier("Controller")
     */
    instance.controller= null;

    /*
     * @Qualifier("ServiceBean")
     */
    instance.service = null;

    instance.initFlag = null;
}

/**
 * @Init()
 */
Component.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
}

module.exports = exports = Component;