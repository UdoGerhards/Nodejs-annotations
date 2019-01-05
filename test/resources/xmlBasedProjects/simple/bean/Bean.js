'use strict';

/**
 * @constructor
 */
class Bean {

    constructor() {

        var instance = this;

        instance.initFlag = null;
    }


    /**
     * @Init()
     */
    init() {
        var instance = this;
        instance.initFlag = true;
    }
}

module.exports = exports = Bean;