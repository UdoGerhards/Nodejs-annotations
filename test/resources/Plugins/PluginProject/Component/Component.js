'use strict';

/**
 * @Component("ComponentBean")
 * @Namespace();
 * @Resource("Util", "util");
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

    instance.service = null;

    instance.initFlag = null;
}

/**
 * Test setter
 * @Qualifier("ServiceBean")
 */
Component.prototype.setService = function(service) {
    var instance = this;
    console.log("Setter is called");
    instance.service = service;
}

/**
 * @Init()
 */
Component.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
};

/**
 * @Before("Controller","aspectFunction")
 */
Component.prototype.beforeWiredFunction = function() {

}

module.exports = exports = Component;