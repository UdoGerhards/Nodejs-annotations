'use strict';

var EventEmitter = require('events').EventEmitter
    , util = require("util")
    , _ = require("lodash")
    , vm = require('vm');

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

    instantiate() {

        var instance = this;
        var logger = instance.logger;
        var beanStructure = instance.beanStructure;
        var path = instance.path;

        logger.debug("    ... instantiating main bean " + util.inspect(beanStructure.beanName) + ", " + util.inspect(instance.namespace));

        // Instantiate
        var beanInstance = null;
        var module = null;

        if (path) {
            // orig path
            try {
                module = require(path);
            } catch(error) {
                console.error(error);
            }
        } else {
        // virtual inheritance
            module = beanStructure.virtual();
            var parent = beanStructure.parent;
            var parentName = parent.name;
            var targetname = module.name;

            // create own context
            var inheritanceSandbox = {};

            inheritanceSandbox[parentName] = parent;
            inheritanceSandbox[targetname] = module;

            // runInNewContext is not working at all; it serves always the same context like we have here and additional vars are not set :( ; Bad hack here
            global[parentName] = parent;

            // Fake new command
            try {
                if (_.isFunction(module)) {
                    var cmd = "new " + module.name + "()";
                    module = vm.runInNewContext(cmd, inheritanceSandbox);
                }
            } catch(error) {
                console.log(error);
            }

            // runInNewContext is not working at all; it serves always the same context like we have here and additional vars are not set :( ; Bad hack here
            global[parentName] = null;
            delete global[parentName];
        }

        var test = null;
        if (_.isFunction(module)) {
            instance.beanStructure._instance = new module();
        } else if (_.isObject(module)) {
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
