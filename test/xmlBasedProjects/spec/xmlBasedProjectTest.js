'use strict';


var assert = require("chai").assert
    , log4js = require("log4js")
    , path = require("path");

/**
 * Created by udogerhards on 20.10.18.
 */

describe("XML based context annotation test suite", function(){

    let timeout = 50000;
    let moduleDir = path.normalize(process.env.PWD.replace("/test","").replace("resources",""). replace("xmlBasedProjects", ""));

    let resourcesPath = process.env.PWD ;

    let FoundationClassPath = path.join(moduleDir, "lib", "foundation", "Foundation.js");
    let Foundation = require(FoundationClassPath);

    let bootstrap = require(path.join(moduleDir, "lib", "bootstrap", "bootstrap.js"));

    it('Should prepare the application context for parsing for a simple project ', function() {

        // /Users/udogerhards/Documents/Bitbucket/nodejs-annotations/test/resources/xmlBasedProjects/simple/configuration/context.xml

        var simpleProjectPath = path.join(moduleDir, "test", "resources", "xmlBasedProjects", "simple");
        let contextConfiguration = path.join("configuration", "context.xml");

        /* Inject correct working dir */

        Foundation.init("/lib/configuration/DIAnnotationsContext.xml");

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        var libPromise = Foundation.getFullBaseContext();

        return libPromise.then(function(resolve){

            let XMLParser = resolve["XMLParser"];
            let fulPath = path.join(simpleProjectPath, contextConfiguration);

            XMLParser.init(fulPath);

            let parseResult = XMLParser.process();

            return parseResult.then(function(applicationStack){

                //console.log(applicationStack);

                return applicationStack;
            });
        });
    });


    it('Should instantiate a simple project ', function() {

        var simpleProjectPath = path.join(moduleDir, "test", "resources", "xmlBasedProjects", "simple");
        let contextConfiguration = path.join(simpleProjectPath, "configuration", "context.xml");
        console.log(contextConfiguration);
        console.error(contextConfiguration);

        var contextInfo = {
            "file": contextConfiguration,
            "projectLandScape": {
                "dir": resourcesPath,
                "useBeanNames": true,
                "showAnnotations": false,
                "avoidDefaultMethods": false,
                "excludeResources": true,
            }
        };


        this.timeout(timeout);
        let parsingPromise = bootstrap(contextInfo, "INFO", null);
        return parsingPromise.then(function(context){

            try {

                // Test context
                assert.isNotNull(context, "Context is null");
                assert.isObject(context, "Context is not an object");

                assert.isNotNull(context.bean, "Context property 'bean' is null");
                assert.isObject(context.bean, "Context property 'bean' is not an object");

                assert.isNotNull(context.controller, "Context property 'controller' is null");
                assert.isObject(context.controller, "Context property 'controller' is not an object");

                assert.isNotNull(context.service, "Context property 'service' is null");
                assert.isObject(context.service, "Context property 'service' is not an object");

                assert.isNotNull(context.component, "Context property 'component' is null");
                assert.isObject(context.component, "Context property 'component' is not an object");

                assert.isNotNull(context.initFlag, "Context property 'initFlag' is null");
                assert.equal(1, context.initFlag, "Init flag does not match expectation");

                assert.isNotNull(context.runFlag, "Context property 'runFlag' is null");
                assert.equal(2, context.runFlag, "Run flag does not match expectation");

                var bean = context.bean;

                assert.isNotNull(bean.innerBean1, "Bean property 'innerBean' is null");
                assert.isObject(bean.innerBean1, "Bean property 'innerBean' is not an object");

                assert.isNotNull(bean.initFlag, "Bean init flag is null");
                assert.isTrue(bean.initFlag, "Bean init flag is not 'true'");

                var controller = context.controller;

                assert.isNotNull(controller.bean, "Controller property 'bean' is null");
                assert.isObject(controller.bean, "Controller property 'bean' is not an object");

                assert.isNotNull(controller.component, "Controller property 'component' is null");
                assert.isObject(controller.component, "Controller property 'component' is not an object");

                assert.isNotNull(controller.initFlag, "Controller init flag is null");
                assert.isTrue(controller.initFlag, "Controller init flag is not 'true'");

                var service = context.service;

                assert.isNotNull(service, "Service is null");
                assert.isObject(service, "Service is not an object");

                assert.isNotNull(service.bean, "Service property 'bean' is null");
                assert.isObject(service.bean, "Service property 'bean' is not an object");

                assert.isNotNull(service.controller, "Service property 'controller' is null");
                assert.isObject(service.controller, "Service property 'controller' is not an object");

                assert.isNotNull(service.component, "Service property 'component' is null");
                assert.isObject(service.component, "Service property 'component' is not an object");

                assert.isNotNull(service.initFlag, "Service init flag is null");
                assert.isTrue(service.initFlag, "Service init flag is not 'true'");

                var component = context.component;

                assert.isNotNull(component, "Component is null");
                assert.isObject(component, "Component is not an object");

                assert.isNotNull(component.bean, "Component property 'bean' is null");
                assert.isObject(component.bean, "Component property 'bean' is not an object");

                assert.isNotNull(component.initFlag, "Component init flag is null");
                assert.isTrue(component.initFlag, "Component init flag is not 'true'");
            } catch(e) {
                console.log(e);

                reject(e);

            }
        })
    });
});