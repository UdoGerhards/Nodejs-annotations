'use strict';


/**
 * @Context("Application")
 */
var Application = function() {

    var instance = this;

    /*
     * @Qualifier("Inheritor")
     */
    instance.inheritor = null;

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
