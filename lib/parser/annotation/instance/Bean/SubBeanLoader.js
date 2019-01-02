'use strict';

var MainBeanLoader = require("./MainBeanLoader")
    , util = require("util");

class SubBeanLoader extends MainBeanLoader {

    constructor() {
        super();

        var instance = this;
        instance.parentProperty = null;
    }

    setParentProperty(parentProperty) {
        var instance = this;
        instance.parentProperty = parentProperty;
    }

    instantiate(parent) {
        var instance = this;
        var logger = instance.logger;

        var beanStructure = instance.beanStructure;
        var definition = parent[instance.parentProperty];

        logger.debug("    ... instantiating sub bean " + util.inspect(beanStructure.beanName) +", "+util.inspect(instance.namespace));

        //if (_.isFunction(definition)) {
        if (typeof definition == "function") {
            instance.beanStructure._instance = new definition();
        //} else if (_.isObject(definition)) {
        } else if (typeof definition == "object") {
            instance.beanStructure._instance = definition;
        }

        instance._emitParentNamespace()
    }
}

module.exports = exports = SubBeanLoader;