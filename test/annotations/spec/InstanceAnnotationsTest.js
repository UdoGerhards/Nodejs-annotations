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

    var resourcesPath = process.env.PWD.replace("/annotations","") + path.sep + path.join("resources", "annotations", "instance");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var libPath = process.env.PWD.replace("/test","").replace("/annotations", "") + path.sep + path.join("lib");

    var bootstrap = require( path.join( libPath, "bootstrap", "bootstrap.js"));
    var factory = require(path.join(libPath, "foundation", "factory", "Factory.js"));
    var contextBuilder = require(path.join(libPath, "foundation", "context", "ContextBuilder.js"));


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

        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");

            assert.isObject(context, "Context is not an object");

            // Test bean
            assert.isNotNull(context.bean, "Bean is null");
            assert.isObject(context.bean, "Bean is not an object");

            // Test bean class
            assert.instanceOf(context.bean, TestClass, "Context bean has wrong class type");

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
        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            // Test bean
            assert.isNotNull(context.component, "Component is null");
            assert.isObject(context.component, "Component is not an object");

            // Test bean class
            assert.instanceOf(context.component, TestClass, "Context component has wrong class type");

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
        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            // Test bean
            assert.isNotNull(context.controller, "Controller is null");
            assert.isObject(context.controller, "Controller is not an object");

            // Test bean class
            assert.instanceOf(context.controller, TestClass, "Context bean has wrong class type");

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

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);
        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            // Test bean
            assert.isNotNull(context.prototype, "Bean is null");
            assert.isFunction(context.prototype, "Bean is not an object");

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
        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            // Test bean
            assert.isNotNull(context.service, "Bean is null");
            assert.isObject(context.service, "Bean is not an object");

            // Test bean class
            assert.instanceOf(context.service, TestClass, "Context bean has wrong class type");

        });
    });

    it('Should instantiate a simple configuration with "@Configuration"', function(){

        /*
            Initialize context
        */
        var contextRoot = resourcesPath+path.sep+path.join("configuration");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);
        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            // Test properties
            assert.isNotNull(context.cItemA, "Context property 'cItemA' is null");
            assert.isObject(context.cItemA, "Context property 'cItemA' is not an object");
            assert.isNotNull(context.cItemB, "Context property 'cItemB' is null");
            assert.isObject(context.cItemB, "Context property 'cItemB' is not an object");
            assert.isNotNull(context.cItemC, "Context property 'cItemC' is null");
            assert.isObject(context.cItemC, "Context property 'cItemC' is not an object");
            assert.isNotNull(context.cItemD, "Context property 'cItemC' is null");
            assert.isFunction(context.cItemD, "Context property 'cItemC' is not a function");


            console.log(context.cItemA);
            console.log(typeof context.cItemA);

            context.cItemB.printName();
            context.cItemB.printType();

            context.cItemC.printName();
            context.cItemC.printType();

            context.cItemD();
            console.log(typeof context.cItemD);

        });
    });

    it('Should instantiate a simple context with use of "@Resource"', function(){

        /*
            Initialize context
        */
        var contextRoot = resourcesPath+path.sep+path.join("resource");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);
        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            // Test properties
            assert.isNotNull(context.util, "Context property 'util' is null");
            assert.isObject(context.util, "Context property 'util' is not an object");
            assert.isNotNull(context.path, "Context property 'path' is null");
            assert.isObject(context.path, "Context property 'path' is not an object");
            assert.isNotNull(context._, "Context property '_' is null");
            assert.isFunction(context._, "Context property '_' is not an object");

        });
    });

});