'use strict';

import BeanAware from "./BeanAware.js";

/**
 * Created by udogerhards on 2019-08-10.
 */

class MemberAware extends BeanAware {

    constructor() {
        super();

        let instance = this;

        // Regarding member name of the bean
        instance.property = null;
        instance.member = null;
    }

    setMember(member) {
        let instance = this;
        instance.member = member;
    }

    getMember() {
        let instance = this;
        return instance.member;
    }
};

export default MemberAware;