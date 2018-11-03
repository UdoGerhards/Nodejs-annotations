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

describe("Meta annotation test suite", function(){

    var contextBuilder = null;
    var timeout = 50000;

    var resourcesPath = process.env.PWD + path.sep + path.join("resources", "annotations", "meta");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var bootstrap = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "bootstrap", "bootstrap.js"));
    var factory = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "factory", "Factory.js"));
    var contextBuilder = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "context", "ContextBuilder.js"));


    log4js.configure(loggerConfig);
    var logger = log4js.getLogger("contextBuilder");


    it('Should instantiate and add an AOP function before the objects target function with "@Before"', function(){

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("Namespace");
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

               try {
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

                   // Test availability of namespace var
                   assert.exists(context.bean._namespace, 'Namespace var is "null" or "undefined"');

                   // Remove all listeners
                   factory.removeAllListeners();
               } catch(e) {

                    reject(e);

               } finally {
                   resolve();
               }
            });
        });
    });

});