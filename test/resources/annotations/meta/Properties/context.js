'use strict';

/**
 * @Context("Application")
 */
// @Properties('/resources/annotations/meta/Properties/configs/**/*.{json,xml, properties}')
class Application {
    constructor()
    {

        var instance = this;

        instance.bean = null;

        /*
         * @Qualifier("xmlPropertiesBean")
         */
        instance.xmlConfig = null;

        /*
         * @Qualifier("jsonPropertiesBean")
         */
        instance.jsonConfig = null;

        /*
         * @Qualifier("javaPropertiesBean")
         */
        instance.javaConfig = null;
    }
}


module.exports = exports = Application;