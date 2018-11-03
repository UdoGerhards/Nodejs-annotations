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

    /**
     * Function to which the before function is wired
     *
     * @Before("TestAOPBeforeBean", "beforeFunction")
     */

    wiredFunction(param) {

        var instance = this;

        instance.transformed = param;

        console.log("Application::wiredFunction");
        console.log(" =>"+param);
    }
}


module.exports = exports = Application;