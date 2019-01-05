'use strict';

/**
 * @Component("ComponentBean")
 * @constructor
 */
function Component() {
    let instance = this;

    instance.bean = null;

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