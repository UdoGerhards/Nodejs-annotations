'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("TestController")
         */
        instance.controller = null;
    }
}


module.exports = exports = Application;