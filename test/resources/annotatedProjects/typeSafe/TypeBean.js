'use strict';

/**
 * @Bean()
 * Created by udogerhards on 2019-08-05.
 */
class TypeBean {

    constructor() {
        let instance = this;

        /**
         * @type {number}
         */
        instance._number = null;

        /**
         * @type {integer}
         */
        instance._integer = null;

        /**
         * @type {float}
         */
        instance._float = null;

        /**
         * @type {boolean}
         */
        instance._boolean = null;

        /**
         * @type {string}
         */
        instance._string = null;

        /**
         * @type {TestService}
         */
        instance.testService = null;
    }

    /**
     * @Init()
     */
    init() {

        let instance = this;

        instance._number = "2000";

    }

    setNumber(value) {
        let instance = this;
        instance._number = value;
    }

    setInteger(value) {
        let instance = this;
        instance._integer = value;
    }

    setFloat(value) {
        let instance = this;
        instance._float = value;
    }

    setBoolean(value) {
        let instance = this;
        instance._boolean = value;
    }

    setString(value) {
        let instance = this;
        instance._string = value;
    }

}

module.exports = exports = TypeBean;