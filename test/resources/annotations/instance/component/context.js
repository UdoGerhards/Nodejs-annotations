'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("TestComponent")
         */
        instance.component = null;
    }
}


module.exports = exports = Application;