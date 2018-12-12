'use strict';

/**
 * @Context("Application")
 * @Autowire()
 */
class Application {
    constructor()
    {

        var instance = this;

        instance.autowiredBean = null;

        instance.autowiredService = null;

        instance.autowiredController = null;

        instance.autowiredComponent = null;

        /*
         * @Qualifier("NonExistingBean")
         */
        instance.nonExistingBean = null;

        /*
         * @Qualifier("NonExistingComponent")
         */
        instance.nonExistingComponent = null;

        /*
         * @Qualifier("QualifiedService")
         */
        instance.service = null;
    }
}


module.exports = exports = Application;