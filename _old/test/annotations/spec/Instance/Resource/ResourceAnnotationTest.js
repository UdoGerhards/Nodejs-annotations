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

    var timeout = 50000;

    var resourcesPath = process.env.PWD.replace("/annotations","") + path.sep + path.join("resources", "annotations", "instance");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var libPath = process.env.PWD.replace("/test","").replace("/annotations", "") + path.sep + path.join("lib");

    var bootstrap = require( path.join( libPath, "bootstrap", "bootstrap.js"));



    log4js.configure(loggerConfig);
    var logger = log4js.getLogger("contextBuilder");

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