'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("TestService")
         */
        instance.service = null;
    }
}


module.exports = exports = Application;