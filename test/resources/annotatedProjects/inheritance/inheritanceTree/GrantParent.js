'use strict';

/**
 * @Prototype("GrantParent")
 *
 * @constructor
 */
var ParentParentBean = function() {

    var instance = this;

    /*
     * @Qualifier("parentParentProperty1")
     */
    instance.parentParentProperty1  = null;

    /*
     * @Qualifier("parentParentProperty2")
     */
    instance.parentParentProperty2  = null;

    /*
     * @Qualifier("parentParentProperty3")
     */
    instance.parentParentProperty3  = null;

    /*
     * @Qualifier("parentParentProperty4")
     */
    instance.parentParentProperty4  = null;

    /*
     * @Qualifier("parentParentProperty5")
     */
    instance.parentParentProperty5  = null;

    /*
     * @Qualifier("parentParentPropertyOverwritten1")
     */
    instance.parentParentPropertyOverwritten1 = null;

    /*
     * @Qualifier("parentParentPropertyOverwritten2")
     */
    instance.parentParentPropertyOverwritten2 = null;

    /*
     * @Qualifier("parentParentPropertyOverwritten3")
     */
    instance.parentParentPropertyOverwritten3 = null;

}

/**
 * @Init()
 */
ParentParentBean.prototype.init = function() {

    console.log("Grant parent initilized!");

}

module.exports = exports = ParentParentBean;