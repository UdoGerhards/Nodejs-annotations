'use strict';

/**
 * Created by udogerhards on 2019-08-10.
 */

export class BeanAware {

    constructor() {
        let instance = this;

        // The annotation value
        instance.value = null;
        instance.namespace = null;

        // Further support beans for this member
        instance.support = [];
    }

    setValue(value) {
        let instance = this;
        instance.value = value;
    }

    getValue() {
        let instance = this;
        return instance.value;
    }

    setNamespace(namespace) {
        let instance = this;
        instance.namespace = namespace;
    }

    getNamespace() {
        let instance = this;
        return instance.namespace;
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

};