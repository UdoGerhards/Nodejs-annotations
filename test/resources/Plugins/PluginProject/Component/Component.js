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
};

/**
 * @Before("Controller","aspectFunction")
 */
Component.prototype.beforeWiredFunction = function() {

}

module.exports = exports = Component;