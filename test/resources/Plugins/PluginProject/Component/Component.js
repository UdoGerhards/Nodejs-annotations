'use strict';

/**
 * @Component("ComponentBean")
 * @Namespace();
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

    console.log(instance._namespace);
    console.log(instance._canonicalName);
}

module.exports = exports = Component;