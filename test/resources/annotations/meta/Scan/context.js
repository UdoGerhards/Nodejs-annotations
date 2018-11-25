'use strict';

/**
 * @Context("Application")
 */
// @Scan('/resources/annotations/meta/Scan/configs/**/*.{json,xml}')
class Application {
    constructor()
    {

        var instance = this;

        instance.bean = null;
    }
}


module.exports = exports = Application;