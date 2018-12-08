'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        instance.bean = null;

        /*
         *  @Qualifier("ConfigItemA")
         */
        instance.cItemA = null;

        /*
         *  @Qualifier("ConfigItemB")
         */
        instance.cItemB = null;

        /*
         *  @Qualifier("ConfigItemC")
         */
        instance.cItemC = null;

        /*
         *  @Qualifier("ConfigItemD")
         */
        instance.cItemD = null;

    }
}


module.exports = exports = Application;