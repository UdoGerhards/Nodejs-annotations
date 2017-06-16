'use strict';

/**
 * @Prototype("Parent")
 *
 * @constructor
 */
var ParentBean = function() {

    var instance = this;

    /*
     * @Qualifier("parentProperty1")
     */
    instance.parentProperty1  = null;

    /*
     * @Qualifier("parentProperty2")
     */
    instance.parentProperty2  = null;

    /*
     * @Qualifier("parentProperty3")
     */
    instance.parentProperty3  = null;

    /*
     * @Qualifier("parentProperty4")
     */
    instance.parentProperty4  = null;

    /*
     * @Qualifier("parentProperty5")
     */
    instance.parentProperty5  = null;

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
ParentBean.prototype.init = function() {

}

module.exports = exports = ParentBean;