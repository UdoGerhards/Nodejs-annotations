/**
 * @Bean()
 * Created by udogerhards on 2019-08-05.
 */
class TypedParamsBean {

    constructor() {
        let instance = this;

        instance._number = null;

        instance._integer = null;

        instance._float = null;

        instance._boolean = null;

        instance._string = null;
    }

    /**
     * @param {number}
     */
    setNumber(value) {
        let instance = this;
        instance._number = value;
    }

    /**
     * @param {integer}
     */
    setInteger(value) {
        let instance = this;
        instance._integer = value;
    }

    /**
     * @param {float}
     */
    setFloat(value) {
        let instance = this;
        instance._float = value;
    }

    /**
     * @param {boolean}
     */
    setBoolean(value) {
        let instance = this;
        instance._boolean = value;
    }

    /**
     * @param {string}
     */
    setString(value) {
        let instance = this;
        instance._string = value;
    }
}

module.exports = exports = TypedParamsBean;