'use strict';

/**
 * @Context("Application")
 */
var Application = function() {

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
 *  @Init()
 */
Application.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
};

/**
 * @Run()
 * @type {Application}
 */
Application.prototype.run = function() {

}


module.exports = exports = Application;