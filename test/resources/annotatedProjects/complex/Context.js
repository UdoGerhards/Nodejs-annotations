'use strict';


/**
 * @Context("Application")
 */
var Application = function() {

    var instance = this;

    /**
     * @Qualifier("Bean_A")
     */
    instance.bean_A = null;

    /**
     * @Qualifier("Bean_B")
     */
    instance.bean_B = null;

    /**
     * @Qualifier("Controller_A")
     */
    instance.controller_A= null;

    /**
     * @Qualifier("Service_A")
     */
    instance.service_A = null;

    /**
     * @Qualifier("Service_B")
     */
    instance.service_B = null;

    /**
     * @Qualifier("Component_A")
     */
    instance.component_A = null;

    /**
     * @Qualifier("Component_B")
     */
    instance.component_B = null;

    instance.initFlag = null;

    instance.counter = 0;

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

/**
 * This method will be wrappe with an "After" aspect
 */
Application.prototype.afterFunction = function(number) {

    let instance = this;

    instance.counter += number;
};

/**
 * This method will be wrappe with an "After" aspect
 */
Application.prototype.afterFunctionCounter = function(number) {

    let instance = this;

    instance.counter += number;
};



module.exports = exports = Application;
