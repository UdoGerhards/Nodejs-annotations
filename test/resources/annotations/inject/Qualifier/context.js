'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("TestInjectComponent")
         */
        instance.component = null;
    }
}


module.exports = exports = Application;