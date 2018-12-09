'use strict';

/**
 * @Bean("Bean2")
 * @constructor
 */
function Bean2() {
    var instance = this;

    instance.initFlag = null;
}

/**
 * @Init()
 */
Bean2.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
}

module.exports = exports = Bean2;