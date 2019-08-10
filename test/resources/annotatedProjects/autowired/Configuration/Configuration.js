'use strict';

/**
 * @Configuration("Configuration")
 */
function Configuration() {
    var instance = this;

    instance.util = null;

    instance.path = null;

    instance.camelCase = null;

    instance.wildcard = null;


    instance.xmlPropertiesBean = null;


    instance.jsonPropertiesBean = null;


    instance.javaPropertiesBean = null;

}

/**
 * @Init()
 */
Configuration.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = Configuration;