'use strict';

/**
 * @constructor
 */
class NestedBean {

    constructor() {

        var instance = this;

        instance.innerBean2 = null;

        instance.initFlag = null;
    }

    init() {
        var instance = this;
        instance.initFlag = true;
    }
}

module.exports = exports = NestedBean;