'use strict';

/**
 * @constructor
 */
function Controller() {
    var instance = this;

    instance.bean = null;

    instance.component = null;

    instance.initFlag = null;
}

Controller.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
}

module.exports = exports = Controller;