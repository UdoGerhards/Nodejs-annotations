'use strict';

/**
 * @Bean()
 * @constructor
 */
function Bean() {
    var instance = this;

    /*
     * @Qualifier("BeanThis")
     */
    this.controller= null;

    /*
     * @Qualifier("ServiceBean")
     */
    instance.service = null;

    /*
     * @Qualifier("ComponentBean")
     */
    instance.component = null;
}

/**
 * @Init()
 */
Bean.prototype.init = function() {
    var instance = this;
}

module.exports = exports = Bean;