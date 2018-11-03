'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("TestInjectBean")
         */
        instance.bean = null;
    }
}


module.exports = exports = Application;