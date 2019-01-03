'use strict';

/**
 * @Service("Service")
 * @constructor
 */
function Service() {
    var instance = this;

    /*
     * @Qualifier("Bean2")
     */
    instance.bean = null;

    /*
     * @Qualifier("Component2")
     */
    instance.component = null;


    instance.initFlag = null;
}

/**
 * @Init()
 */
Service.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");
}

module.exports = exports = Service;