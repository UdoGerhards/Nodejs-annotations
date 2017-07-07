'use strict';

/**
 * @Prototype()
 */
function Prototype() {
    var instance = this;

    /*
     * @Qualifier("Controller")
     */
    instance.inheritedProperty1= null;

    /*
     * @Qualifier("ServiceBean")
     */
    instance.inheritedProperty2 = null;
}

/**
 * @Init()
 */
Prototype.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
}

module.exports = exports = Prototype;