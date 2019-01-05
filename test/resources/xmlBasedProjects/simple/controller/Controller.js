'use strict';

/**
 * @Controller("Controller")
 * @constructor
 */
function Controller() {
    var instance = this;

    instance.bean = null;

    instance.service = null;

    instance.component = null;

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