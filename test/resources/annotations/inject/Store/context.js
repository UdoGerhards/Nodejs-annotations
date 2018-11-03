'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("TestInjectController")
         */
        instance.controller = null;
    }
}


module.exports = exports = Application;