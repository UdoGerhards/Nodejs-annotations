'use strict';

/**
 * @constructor
 */
function Service() {
    var instance = this;

    /*
     * @Qualifier("Bean")
     */
    instance.bean = null;

    /*
     * @Qualifier("Controller")
     */
    instance.controller= null;

    /*
     * @Qualifier("ComponentBean")
     */
    instance.component = null;

    instance.initFlag = null;
}

Service.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;

};

module.exports = exports = Service;