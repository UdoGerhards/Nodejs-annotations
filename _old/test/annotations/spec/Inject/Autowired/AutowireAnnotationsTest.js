'use strict';


var assert = require("chai").assert
    , log4js = require("log4js")
    , path = require("path")
    , Promise = require("bluebird");

/**
 * Created by udogerhards on 20.10.18.
 */

describe("Autowire annotation test suite", function(){

    var timeout = 50000;
    var resourcesPath = process.env.PWD.replace("/annotations","") + path.sep + path.join("resources", "annotations", "inject");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var libPath = process.env.PWD.replace("/test","").replace("/annotations", "") + path.sep + path.join("lib");

    var bootstrap = require( path.join( libPath, "bootstrap", "bootstrap.js"));



    log4js.configure(loggerConfig);
    var logger = log4js.getLogger("contextBuilder");

    it('Should instantiate a simple project with @Autowire annotation', function() {

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("Autowire");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        // Load test classes
        // Instantiate test class
        var AutowiredBean = require(contextRoot+path.sep+path.join("bean.js"));
        var AutowiredController = require(contextRoot+path.sep+path.join("controller.js"));
        var AutowiredService = require(contextRoot+path.sep+path.join("service.js"));
        var AutowiredComponent = require(contextRoot+path.sep+path.join("component.js"));
        var QualifiedService = require(contextRoot+path.sep+path.join("qualifiedService.js"));

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            assert.isNotNull(context.autowiredBean, "Context property 'autowiredBean' is null");
            assert.isObject(context.autowiredBean, "Context property 'autowiredBean' is not an object");

            assert.isNotNull(context.autowiredController, "Context property 'autowiredController' is null");
            assert.isObject(context.autowiredController, "Context property 'autowiredController' is not an object");

            assert.isNotNull(context.autowiredService, "Context property 'autowiredService' is null");
            assert.isObject(context.autowiredService, "Context property 'autowiredService' is not an object");

            assert.isNotNull(context.autowiredComponent, "Context property 'autowiredComponent' is null");
            assert.isObject(context.autowiredComponent, "Context property 'autowiredComponent' is not an object");

            assert.isNotNull(context.service, "Context property 'service' is null");
            assert.isObject(context.service, "Context property 'service' is not an object");

            assert.isNull(context.nonExistingBean, "Context property 'nonExistingBean' is not null");
            assert.isNull(context.nonExistingComponent, "Context property 'nonExistingComponent' is not null");

            // Check classes matching
            assert.instanceOf(context.autowiredBean, AutowiredBean, "Context property 'autowiredBean' has wrong class type");
            assert.instanceOf(context.autowiredController, AutowiredController, "Context property 'autowiredController' has wrong class type");
            assert.instanceOf(context.autowiredService, AutowiredService, "Context property 'autowiredService' has wrong class type");
            assert.instanceOf(context.autowiredComponent, AutowiredComponent, "Context property 'autowiredComponent' has wrong class type");
            assert.instanceOf(context.service, QualifiedService, "Context property 'service' has wrong class type");

        });
    });
});