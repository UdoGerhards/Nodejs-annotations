'use strict';

/**
 * @Context("Application")
 */
class Application {
    constructor()
    {

        var instance = this;

        /*
         * @Store("Controller")
         */
        instance.controllerArr = [];

        /*
         * @Store("Controller")
         */
        instance.controllerList = {};
    }
}


module.exports = exports = Application;