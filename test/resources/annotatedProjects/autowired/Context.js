'use strict';


/**
 * @Context("Application")
 * @Autowire()
 */
// @Properties('/resources/annotations/meta/Properties/configs/**/*.{json,xml, properties}')

var Application = function() {

    var instance = this;

    instance.util = null;

    instance.path = null;

    instance.bean = null;

    instance.otherBean = null;

    instance.component = null;

    instance.configuration = null;

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


module.exports = exports = Application;
