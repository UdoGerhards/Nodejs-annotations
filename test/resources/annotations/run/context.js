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

        instance.runFlag = false;
    }

    /**
     * @Run()
     */
    run() {

        let instance = this;
        instance.runFlag = true;
    }
}


module.exports = exports = Application;