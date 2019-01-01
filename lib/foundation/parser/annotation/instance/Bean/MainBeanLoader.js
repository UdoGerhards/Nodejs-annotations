'use strict';

var EventEmitter = require('events').EventEmitter
    , util = require("util");

class MainBeanLoader extends EventEmitter {
    constructor() {
        super();
        var instance = this;
        instance.type = null;
        instance.namespace = null;
        instance.beanInstance = null;
        instance.path = null;
        instance.beanStructure = null;
        instance.logger = null;
    }

    setBeanStructure(beanStructure) {

        var instance = this;
        instance.beanStructure = beanStructure;

    }

    setPath(path) {

        var instance = this;
        instance.path = path;

    }

    setType(type) {

        var instance = this;
        instance.type = type;

    }

    setNamespace(namespaceSegment) {

        var instance = this;
        instance.namespace = namespaceSegment;

    }

    load() {
        var instance = this;
        var logger = instance.logger;
        var beanStructure = instance.beanStructure;

        var path = instance.path;
        var module = null;

        if (path) {
            // orig path
            try {
                module = require(path);
            } catch(error) {
                logger.error(error);
            }
        } else {
            module = beanStructure.virtual;
        }

        return module;
    }

    instantiate() {

        var instance = this;
        var logger = instance.logger;
        var beanStructure = instance.beanStructure;

        logger.debug("    ... instantiating main bean " + util.inspect(beanStructure.beanName) + ", " + util.inspect(instance.namespace));

        // Instantiate
        var module = instance.load();

        if (typeof module === "function") {
            try {
                instance.beanStructure._instance = new module();
            } catch(error) {
                logger.error(error);
            }
        } else if (typeof module === "object") {
            instance.beanStructure._instance = module;
        };

        instance._emitParentNamespace()
    }

    _emitParentNamespace() {

        var instance = this;
        var namespace = instance.namespace;

        instance.emit(namespace, instance.beanStructure._instance);
    }
}

module.exports = exports = MainBeanLoader;
