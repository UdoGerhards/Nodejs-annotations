'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("TestNamespaceBean")
         */
        instance.bean = null;
    }
}


module.exports = exports = Application;