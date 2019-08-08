'use strict';

/**
 * @Bean("Bean_A")
 * @constructor
 */
function Bean() {
    var instance = this;

    /**
     * @Qualifier("Service_A")
     */
    instance.service = null;

    /**
     * @Qualifier("Component_A")
     */
    instance.component = null;

    instance.initFlag = null;
}

/**
 * @Init()
 */
Bean.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
}

module.exports = exports = Bean;