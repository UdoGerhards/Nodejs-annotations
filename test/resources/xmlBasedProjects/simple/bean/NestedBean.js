'use strict';

/**
 * @constructor
 */
class Bean {

    constructor() {

        var instance = this;

        instance.innerBean = null;

        instance.initFlag = null;
    }

    init() {
        var instance = this;
        instance.initFlag = true;
    }
}

module.exports = exports = Bean;