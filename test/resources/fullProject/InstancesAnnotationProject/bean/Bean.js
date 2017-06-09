'use strict';

/**
 * @Bean()
 * @constructor
 */
function Bean() {
    var instance = this;

    /*
     * @Qualifier("Controller")
     */
    instance.controller= null;

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
}

module.exports = exports = Bean;