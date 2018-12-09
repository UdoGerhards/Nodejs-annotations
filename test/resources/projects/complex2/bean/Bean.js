'use strict';

/**
 * @Bean("Bean")
 * @constructor
 */
function Bean() {
    var instance = this;

    /*
     * @Qualifier("ServiceBean")
     */
    instance.service = null;

    /*
     * @Qualifier("ComponentBean")
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