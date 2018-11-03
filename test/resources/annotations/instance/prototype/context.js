'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("TestPrototype")
         */
        instance.prototype = null;
    }
}


module.exports = exports = Application;