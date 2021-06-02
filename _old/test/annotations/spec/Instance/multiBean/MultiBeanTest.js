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

    it('Should instantiate a multi bean with internal beans', function(){

        /*
            Initialize context
        */
        var contextRoot = resourcesPath+path.sep+path.join("multi-bean");
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

            context.bean11.printName();

            context.bean21.printName();
            context.bean22.printName();

            context.bean31.printName();
            context.bean32.printName();
            context.bean33.printName();

            return context;

        });
    });

});