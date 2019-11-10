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

describe("AOP annotation test suite", function(){

    var contextBuilder = null;
    var timeout = 50000;

    var resourcesPath = process.env.PWD.replace("/annotations","") + path.sep + path.join("resources", "annotations", "aop");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var libPath = process.env.PWD.replace("/test","").replace("/annotations", "") + path.sep + path.join("lib");

    var bootstrap = require( path.join( libPath, "bootstrap", "bootstrap.js"));


    log4js.configure(loggerConfig);
    var logger = log4js.getLogger("contextBuilder");

    it('Should instantiate and wire a method after the target method with "@After"', function(){

        /*
            Initialize context
         */

        var contextRoot = resourcesPath+path.sep+path.join("After");
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

            context.bean.afterFunction("Test");

        });
    });
});