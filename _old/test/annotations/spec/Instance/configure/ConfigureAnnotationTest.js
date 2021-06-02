'use strict';


var assert = require("chai").assert
    , log4js = require("log4js")
    , path = require("path");

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
            //assert.isFunction(context.cItemD, "Context property 'cItemC' is not a function");


            console.log(context.cItemA);
            console.log(typeof context.cItemA);

            context.cItemB.printName();
            context.cItemB.printType();

            context.cItemC.printName();
            context.cItemC.printType();

            context.cItemD();
            console.log(typeof context.cItemD);

            return context;

        });
    });
});