'use strict';

/**
 * @Configuration("Configuration")
 * @Resource("Util", "util")
 * @Resource("Path", "path")
 * @Resource("CamelCase", "camelcase")
 * @Resource("Wildcard", "wildcard")
 *
 * @Autowire()
 *
 * @constructor
 */
function Configuration() {
    var instance = this;

    instance.util = null;

    instance.path = null;

    instance.camelCase = null;

    instance.wildcard = null;

    /*
     * @Qualifier("xmlPropertiesBean")
     */
    instance.xmlPropertiesBean = null;

    /*
     * @Qualifier("jsonPropertiesBean")
     */
    instance.jsonPropertiesBean = null;

    /*
     * @Qualifier("javaPropertiesBean")
     */
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