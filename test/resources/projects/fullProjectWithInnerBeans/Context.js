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

    console.log("Initialization ...");

}

/**
 * @Run()
 * @type {Application}
 */
Application.prototype.run = function() {

    console.log("Application is running!");

}


module.exports = exports = Application;
