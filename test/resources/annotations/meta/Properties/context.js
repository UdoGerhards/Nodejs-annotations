'use strict';

/**
 * @Context("Application")
 */
// @Properties('../resources/annotations/meta/Properties/configs/**/*.{json,xml, properties}')
class Application {
    constructor()
    {

        var instance = this;

        instance.bean = null;

        /*
         * @Qualifier("XmlPropertiesBean")
         */
        instance.xmlConfig = null;

        /*
         * @Qualifier("JsonPropertiesBean")
         */
        instance.jsonConfig = null;

        /*
         * @Qualifier("JavaPropertiesBean")
         */
        instance.javaConfig = null;
    }
}


module.exports = exports = Application;