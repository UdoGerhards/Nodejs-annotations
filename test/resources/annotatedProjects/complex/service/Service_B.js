'use strict';

/**
 * @Service("Service_B")
 * @constructor
 */
function Service2() {
    var instance = this;

    instance.initFlag = null;
}

/**
 * @Init()
 */
Service2.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");
}

module.exports = exports = Service2;