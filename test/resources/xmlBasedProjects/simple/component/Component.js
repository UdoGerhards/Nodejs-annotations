'use strict';

/**
 * @constructor
 */
function Component() {
    let instance = this;

    instance.bean = null;

    instance.initFlag = null;
}

Component.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
}

module.exports = exports = Component;