'use strict';

/**
 * @Service("ServiceBean")
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

    /*
     * @Qualifier("InnerBeanLevel2")
     */
    instance.innerBeanLevel2 = null;

    /*
     * @Qualifier("InnerBeanLevel3")
     */
    instance.innerBeanLevel3 = null;

    instance.initFlag = null;
}

/**
 * @Init()
 */
Service.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");
}

module.exports = exports = Service;