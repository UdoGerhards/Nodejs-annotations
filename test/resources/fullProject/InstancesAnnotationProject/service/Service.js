'use strict';

/**
 * @Service("ServiceBean")
 * @constructor
 */
function Service() {
    var instance = this;

    /*
     * @Qualifier()
     */
    instance.bean = null;

    /*
     * @Qualifier()
     */
    instance.controller= null;

    /*
     * @Qualifier("ComponentBean")
     */
    instance.component = null;
}

/**
 * @Init()
 */
Service.prototype.init = function() {
    var instance = this;

}

module.exports = exports = Service;