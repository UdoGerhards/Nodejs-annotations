'use strict';

/**
 * @Bean("Bean")
 * @Autowire()
 * @constructor
 */
function Bean() {
    var instance = this;

    instance.serviceBean = null;

    instance.componentBean = null;

    instance.initFlag = null;
}

/**
 * @Init()
 */
Bean.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = Bean;