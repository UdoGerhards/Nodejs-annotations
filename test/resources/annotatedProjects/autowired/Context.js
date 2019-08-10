'use strict';

/**
 * @Context("Application")
 *
 * @Autowire(report_missing = true)
 */

// @Properties("/autowired/configs/**/*.{json,xml, properties}")

var Application = function() {

    var instance = this;

    instance.util = null;

    instance.path = null;

    instance.bean_A = null;

    instance.bean_B = null;

    instance.component = null;

    instance.configuration = null;

    instance.service = null;

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
