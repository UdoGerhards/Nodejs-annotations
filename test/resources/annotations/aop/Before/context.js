'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("TestAOPBeforeBean")
         */
        instance.bean = null;

        /*
         * Transformed variable
         */
        instance.transformed = null;
    }

}


module.exports = exports = Application;