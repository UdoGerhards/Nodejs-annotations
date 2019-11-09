'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Qualifier("Bean11")
         */
        instance.bean11 = null;

        /*
         * @Qualifier("Bean21")
         */
        instance.bean21 = null;

        /*
         * @Qualifier("Bean22")
         */
        instance.bean22 = null;

        /*
         * @Qualifier("Bean31")
         */
        instance.bean31 = null;

        /*
         * @Qualifier("Bean32")
         */
        instance.bean32 = null;

        /*
         * @Qualifier("Bean33")
         */
        instance.bean33 = null;

    }
}


module.exports = exports = Application;