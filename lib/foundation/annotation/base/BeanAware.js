'use strict';

/**
 * Created by udogerhards on 2019-08-10.
 */

class BeanAware {

    constructor() {
        let intance = this;

        // The annotation value
        instance.value = null;
        instance.namespace = null;
    }

    setValue(value) {
        let instance = this;
        instance.value = value;
    }

    getValue() {
        let intance = this;
        return intance.value;
    }

    setNamespace(namespace) {
        let instance = this;
        instance.namespace = namespace;
    }

    getNamespace() {
        let instance = this;
        return instance.namespace;
    }

}

module.exports = exports = BeanAware;