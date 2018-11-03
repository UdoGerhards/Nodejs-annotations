'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("TestBean")
         */
        instance.bean = null;
    }
}


module.exports = exports = Application;