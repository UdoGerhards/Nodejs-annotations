'use strict';

/**
 * @Component("ComponentBean")
 * @constructor
 */
function Component() {
    var instance = this;

    /*
     * @Qualifier()
     */
    instance.bean = null;

    /*
     * @Qualifier()
     */
    instance.controller= null;

    /*
     * @Qualifier("ServiceBean")
     */
    instance.service = null;
}

/**
 * @Init()
 */
Component.prototype.init = function() {
    var instance = this;
}

module.exports = exports = Component;