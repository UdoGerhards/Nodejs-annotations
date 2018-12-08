'use strict';

/**
 * @Context("Application")
 * @Resource("Util", "util")
 * @Resource("Path", "path")
 * @Resource("_", "lodash")
 *
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         *  @Qualifier("Util")
         */
        instance.util = null;

        /*
         *  @Qualifier("Path")
         */
        instance.path = null;

        /*
         *  @Qualifier("_")
         */
        instance._ = null;

    }
}


module.exports = exports = Application;