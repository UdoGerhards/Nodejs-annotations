'use strict';

/**
 * @Controller()
 * @constructor
 */
function Controller() {
    var instance = this;

    /*
     * @Qualifier()
     */
    instance.bean = null;

    /*
     * @Qualifier("ServiceBean")
     */
    instance.service = null;

    /*
     * @Qualifier("ComponentBean")
     */
    instance.component = null;
}

/**
 * @Init()
 */
Controller.prototype.init = function() {
    var instance = this;
}

module.exports = exports = Controller;