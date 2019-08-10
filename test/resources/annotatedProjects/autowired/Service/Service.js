'use strict';

/**
 * @Service("Service")
 * @Inherits("AncestorService")
 * @Autowire()
 *

 */
function Service() {
    var instance = this;

    instance.bean = null;

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
};

module.exports = exports = Service;