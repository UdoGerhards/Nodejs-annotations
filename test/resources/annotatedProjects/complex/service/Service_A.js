'use strict';

/**
 * @Service("Service_A")
 * @constructor
 */
function Service_A() {
    var instance = this;

    /**
     * @Qualifier("Bean_A")
     */
    instance.bean = null;

    /**
     * @Qualifier("Component_B")
     */
    instance.component = null;

    instance.initFlag = null;
}

/**
 * @Init()
 */
Service_A.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");
}

module.exports = exports = Service_A;