'use strict';

const BeanAware = require("./BeanAware");

/**
 * Created by udogerhards on 2019-08-10.
 */

class MemberAware extends BeanAware {

    constructor() {
        super();

        let instance = this;

        // Regarding member name of the bean
        instance.Member = null;

        // Further support beans for this member
        instance.upport = [];
        instance.func = false;
    }

    setFunc(func) {
        let instance = this;
        instance.isFunc = isFunc;
    }

    isFunc() {
        let instance = this;
        return instance.isFunc;
    }

    setMember(member) {
        let instance = this;
        instance.member = member;
    }

    getMember() {
        let instance = this;
        return instance.member;
    }

    setSupport(support) {
        let instance = this;
        instance.support = support;
    }

    addSupport(supporAnnotation) {
        let instance = this;
        instance.suppoert.push(supporAnnotation);
    }

    getSupport() {
        let instance = this;
        return instance.support;
    }

    findSupport(search) {
        let instance = this;
        let res = null;

        instance.support.every(function (supportAnnotation) {
            if (supportAnnotation.constructor.name == search) {
                res = supportAnnotation;
                return false;
            }
        });

        return res;
    }

}

module.exports = exports = MemberAware;