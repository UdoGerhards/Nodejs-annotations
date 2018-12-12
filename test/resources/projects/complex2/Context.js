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

    /*
     * @Qualifier("InnerBeanLevel1")
     */
    instance.innerBeanLevel1 = null;

    /*
    * @Qualifier("InnerBeanLevel2")
    */
    instance.innerBeanLevel2 = null;

    /*
     * @Qualifier("InnerBeanLevel3")
     */
    instance.innerBeanLevel3 = null;

    instance.initFlag = null;

};

/**
 *  @Init()
 */
Application.prototype.init = function() {

    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");

};

/**
 * @Run()
 * @type {Application}
 */
Application.prototype.run = function() {

    console.log("Application is running!");

};


module.exports = exports = Application;
