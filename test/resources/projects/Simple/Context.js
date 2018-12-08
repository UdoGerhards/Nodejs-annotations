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

    instance.runFlag = null;

    instance.counter = 0;

}

/**
 *  @Init()
 */
Application.prototype.init = function() {
    var instance = this;
    instance.initFlag = ++instance.counter;
};

/**
 * @Run()
 */
Application.prototype.run = function() {

   var instance = this;
   instance.runFlag = ++instance.counter;;

}


module.exports = exports = Application;
