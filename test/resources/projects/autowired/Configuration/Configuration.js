'use strict';

/**
 * @Configuration("Configuration")
 * @Resource("Util", "util")
 * @Resource("Path", "path")
 *
 * @Autowire()
 *
 * @constructor
 */
function Configuration() {
    var instance = this;

    instance.util = null;

    instance.path = null;

}

/**
 * @Init()
 */
Configuration.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = Configuration;