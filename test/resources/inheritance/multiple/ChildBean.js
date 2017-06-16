'use strict';

/**
 * @Bean("Child")
 * @Inherits("Parent")
 *
 * @constructor
 */
var Child = function() {

    var instance = this;

    /*
     * @Qualifier("childProperty1")
     */
    instance.childProperty1  = null;

    /*
     * @Qualifier("childProperty2")
     */
    instance.childProperty2  = null;

    /*
     * @Qualifier("childProperty3")
     */
    instance.childProperty3  = null;

    /*
     * @Qualifier("childProperty4")
     */
    instance.childProperty4  = null;

    /*
     * @Qualifier("childProperty5")
     */
    instance.childProperty5  = null;

    /*
     * @Qualifier("parentPropertyOverwritten1")
     */
    instance.parentPropertyOverwritten1 = null;

    /*
     * @Qualifier("parentPropertyOverwritten2")
     */
    instance.parentPropertyOverwritten2 = null;

    /*
     * @Qualifier("parentPropertyOverwritten3")
     */
    instance.parentPropertyOverwritten3 = null;

}

/**
 * @Init()
 */
Child.prototype.init = function() {

}

module.exports = exports = Child;