'use strict';

/**
 * Created by udogerhards on 2019-08-10.
 */

class SupportAware {

    constructor() {
        let instance = this;

        // The annotation value
        instance.value = null;
    }

    setValue(value) {
        let instance = this;
        instance.value = value;
    }

    getValue() {
        let instance = this;
        return instance.value;
    }

};

export default SupportAware;