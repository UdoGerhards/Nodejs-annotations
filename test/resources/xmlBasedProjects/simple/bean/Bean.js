'use strict';

/**
 * @constructor
 */
class Bean {

    constructor() {

        var instance = this;

        /*
         * @Qualifier("Controller")
         */
        instance.controller = null;

        /*
         * @Qualifier("ServiceBean")
         */
        instance.service = null;

        /*
         * @Qualifier("ComponentBean")
         */
        instance.component = null;

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