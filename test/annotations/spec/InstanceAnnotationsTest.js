'use strict';


var mocha = require("mocha")
    , assert = require("chai").assert
    , log4js = require("log4js")
    , path = require("path")
    , util = require("util")
    , Promise = require("bluebird");

/**
 * Created by udogerhards on 20.10.18.
 */

describe("Instance annotation test suite", function(){

    var contextBuilder = null;
    var timeout = 50000;

    var resourcesPath = process.env.PWD + path.sep + path.join("resources", "annotations", "instance");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var bootstrap = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "bootstrap", "bootstrap.js"));
    var factory = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "factory", "Factory.js"));
    var contextBuilder = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "context", "ContextBuilder.js"));


    log4js.configure(loggerConfig);
    var logger = log4js.getLogger("contextBuilder");


    it('Should instantiate a simple bean with "@Bean"', function(){

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("bean");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        // Instantiate test class
        var TestClass = require(contextRoot+path.sep+path.join("bean_test.js"));

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){
           factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

               var contextInfo = applicationStack[0];
               var context = contextInfo.instanceTypes.Context[0];

               // Test context
               assert.isNotNull(context, "Context is null");
               assert.isObject(context, "Context is not an object");

               // Test bean
               assert.isNotNull(context.bean, "Bean is null");
               assert.isObject(context.bean, "Bean is not an object");

               // Test bean class
               assert.instanceOf(context.bean, TestClass, "Context bean has wrong class type");

               // Remove all listeners
               factory.removeAllListeners();

                resolve();
            });
        });
    });

    it('Should instantiate a simple component with "@Cpmponent"', function(){

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("component");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        // Instantiate test class
        var TestClass = require(contextRoot+path.sep+path.join("component_test.js"));

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);
        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){
            factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

                var contextInfo = applicationStack[0];
                var context = contextInfo.instanceTypes.Context[0];

                // Test context
                assert.isNotNull(context, "Context is null");
                assert.isObject(context, "Context is not an object");

                // Test bean
                assert.isNotNull(context.component, "Component is null");
                assert.isObject(context.component, "Component is not an object");

                // Test bean class
                assert.instanceOf(context.component, TestClass, "Context component has wrong class type");

                // Remove all listeners
                factory.removeAllListeners();

                resolve();
            });
        });
    });

    it('Should instantiate a simple controller with "@Controller"', function(){

        /*
            Initialize context
        */
        var contextRoot = resourcesPath+path.sep+path.join("controller");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        // Instantiate test class
        var TestClass = require(contextRoot+path.sep+path.join("controller_test.js"));

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);
        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){
            factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

                var contextInfo = applicationStack[0];
                var context = contextInfo.instanceTypes.Context[0];

                // Test context
                assert.isNotNull(context, "Context is null");
                assert.isObject(context, "Context is not an object");

                // Test bean
                assert.isNotNull(context.controller, "Controller is null");
                assert.isObject(context.controller, "Controller is not an object");

                // Test bean class
                assert.instanceOf(context.controller, TestClass, "Context bean has wrong class type");

                // Remove all listeners
                factory.removeAllListeners();

                resolve();
            });
        });
    });

    it('Should instantiate a simple prototype with "@Prototype"', function(){

        /*
            Initialize context
        */
        var contextRoot = resourcesPath+path.sep+path.join("prototype");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        // Instantiate test class
        var TestClass = require(contextRoot+path.sep+path.join("prototype_test.js"));

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);
        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){
            factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

                var contextInfo = applicationStack[0];
                var context = contextInfo.instanceTypes.Context[0];

                // Test context
                assert.isNotNull(context, "Context is null");
                assert.isObject(context, "Context is not an object");

                // Test bean
                assert.isNotNull(context.prototype, "Bean is null");
                assert.isFunction(context.prototype, "Bean is not an object");

                // Test bean class
                //assert.typeOf(context.prototype, TestClass, "Context bean has wrong class type");

                // Remove all listeners
                factory.removeAllListeners();

                resolve();
            });
        });
    });

    it('Should instantiate a simple service with "@Service"', function(){

        /*
            Initialize context
        */
        var contextRoot = resourcesPath+path.sep+path.join("service");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        // Instantiate test class
        var TestClass = require(contextRoot+path.sep+path.join("service_test.js"));

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);
        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){
            factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

                var contextInfo = applicationStack[0];
                var context = contextInfo.instanceTypes.Context[0];

                // Test context
                assert.isNotNull(context, "Context is null");
                assert.isObject(context, "Context is not an object");

                // Test bean
                assert.isNotNull(context.service, "Bean is null");
                assert.isObject(context.service, "Bean is not an object");

                // Test bean class
                assert.instanceOf(context.service, TestClass, "Context bean has wrong class type");

                // Remove all listeners
                factory.removeAllListeners();

                resolve();
            });
        });

    });

});