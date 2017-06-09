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

}

/**
 *  @Init()
 */
Application.prototype.init = function() {

    var instance = this;

}

/**
 * @Run()
 * @type {Application}
 */
Application.prototype.run = function() {

}


module.exports = exports = Application;
