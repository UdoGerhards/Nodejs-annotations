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

    var timeout = 50000;

    var resourcesPath = process.env.PWD.replace("/annotations","") + path.sep + path.join("resources", "annotations", "meta");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var libPath = process.env.PWD.replace("/test","").replace("/annotations", "") + path.sep + path.join("lib");

    var bootstrap = require( path.join( libPath, "bootstrap", "bootstrap.js"));

    log4js.configure(loggerConfig);
    var logger = log4js.getLogger("contextBuilder");

    it('Should instantiate and scan a folder with "@Properties"-annotation', function(){

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("Properties");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout*10);

        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            // Test bean
            assert.isNotNull(context.xmlConfig, "Bean parameter 'xmlConfig' is null");
            assert.isObject(context.xmlConfig, "Bean parameter 'xmlConfig' not an object");
            assert.isNotNull(context.jsonConfig, "Bean parameter 'jsonConfig' is null");
            assert.isObject(context.jsonConfig, "Bean parameter 'jsonConfig' not an object");
            assert.isNotNull(context.javaConfig, "Bean parameter 'javaConfig' is null");
            assert.isObject(context.javaConfig, "Bean parameter 'javaConfig' not an object");

        });
    });

});