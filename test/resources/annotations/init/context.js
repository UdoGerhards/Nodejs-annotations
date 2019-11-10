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

        instance.initFlag = false;
    }

    /**
     * @Init()
     */
    init() {

        let instance = this;
        instance.initFlag = true;
    }
}


module.exports = exports = Application;