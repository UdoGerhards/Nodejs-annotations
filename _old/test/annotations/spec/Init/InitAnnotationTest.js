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

    var resourcesPath = process.env.PWD.replace("/annotations","") + path.sep + path.join("resources", "annotations");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var libPath = process.env.PWD.replace("/test","").replace("/annotations", "") + path.sep + path.join("lib");

    var bootstrap = require( path.join( libPath, "bootstrap", "bootstrap.js"));


    log4js.configure(loggerConfig);
    var logger = log4js.getLogger("contextBuilder");



    it('Should instantiate a simple component with "@Init"', function(){

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("init");
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

            assert.isTrue(context.initFlag, "Context was not initialized");

            // Test bean
            assert.isNotNull(context.bean, "Component is null");
            assert.isObject(context.bean, "Component is not an object");

            assert.isTrue(context.bean.initFlag, "Context was not initialized");

        });
    });

});