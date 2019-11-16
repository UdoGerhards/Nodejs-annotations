'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("Child")
         */
        instance.child = null;
    }
}


module.exports = exports = Application;