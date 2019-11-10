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

        /*
         * @Qualifier("TestNamespacedService")
         */
        instance.service = null;

        /*
         * @Qualifier("TestNamespacedController")
         */
        instance.controller = null;
    }
}


module.exports = exports = Application;