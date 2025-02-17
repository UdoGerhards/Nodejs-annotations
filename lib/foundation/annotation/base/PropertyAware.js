'use strict';

//const MemberAware = require("./MemberAware");

import MemberAware from "./MemberAware.js";

/**
 * Created by udogerhards on 2019-08-10.
 */

class PropertyAware extends MemberAware {

    constructor() {
        super();

        let instance = this;

        // Regarding member name of the bean
        instance.property = null;
        instance.member = null;
    }

    setProperty(property) {
        let instance = this;
        instance.property = property;
    }

    getProperty() {
        let instance = this;
        return instance.property;
    }
};

export default PropertyAware;