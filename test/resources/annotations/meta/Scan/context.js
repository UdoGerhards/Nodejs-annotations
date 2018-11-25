'use strict';

/**
 * @Context("Application")
 * @Scan('/resources/annotations/meta/Scan/configs/**;./**')
 */
class Application {
    constructor()
    {

        var instance = this;

        instance.bean = null;
    }
}


module.exports = exports = Application;