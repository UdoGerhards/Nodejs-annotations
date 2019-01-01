'use strict';


/**
 * @Context("Application")
 * @Autowire()
 */
// @Properties('/resources/annotations/meta/Properties/configs/**/*.{json,xml, properties}')

var Application = function() {

    var instance = this;

    /**
     * @type {(number|boolean|integer|string)}
     */
    instance.number = null;

    /**
     * @type {string}
     */
    instance.testString = null;

    /**
     * @type {object}
     */
    instance.testObject = null;

    /**
     * @type {array}
     */
    instance.testArray = null;

    /**
     * @type {integer}
     */
    instance.testInteger = null;

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

/**
 * @param {string} id - Somebody's employee's id.
 * @param {string | Object} employee - Somebody's employee.
 */
Application.prototype.testEmployeeMatch = function(id, employees) {

    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");

};


/**
 * @param {Object} employees - The employees who are responsible for the project.
 */
Application.prototype.testEmployees = function(employees) {

    var instance = this;
    instance.initFlag = true;

    console.log("Initialization ...");

};


module.exports = exports = Application;
