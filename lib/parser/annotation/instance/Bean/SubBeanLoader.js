'use strict';

var MainBeanLoader = require("./MainBeanLoader")
    , _ = require("lodash")
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

        if (_.isFunction(definition)) {
            instance.beanStructure._instance = new definition();
        } else if (_.isObject(definition)) {
            instance.beanStructure._instance = definition;
        }

        instance._emitParentNamespace()
    }
}

module.exports = exports = SubBeanLoader;