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

    var resourcesPath = process.env.PWD + path.sep + path.join("resources", "projects");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var bootstrap = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "bootstrap", "bootstrap.js"));
    var factory = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "factory", "Factory.js"));
    var contextBuilder = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "context", "ContextBuilder.js"));


    log4js.configure(loggerConfig);
    var logger = log4js.getLogger("contextBuilder");

    var getContextBean = function(applicationStack) {

        var contextInfo = applicationStack[0];
        var context = contextInfo.instanceTypes.Context[0];

        return context;

    };

    it('Should instantiate a simple project', function() {

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("simple");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){
            factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

                try {

                    var context = getContextBean(applicationStack);

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

                    assert.isNotNull(context.runFlag, "Context property 'initFlag' is null");
                    assert.equal(2, context.runFlag, "Run flag does not match expectation");

                    var bean = context.bean;

                    assert.isNotNull(bean.controller, "Bean property 'controller' is null");
                    assert.isObject(bean.controller, "Bean property 'controller' is not an object");

                    assert.isNotNull(bean.service, "Bean property 'service' is null");
                    assert.isObject(bean.service, "Bean property 'service' is not an object");

                    assert.isNotNull(bean.component, "Bean property 'component' is null");
                    assert.isObject(bean.component, "Bean property 'component' is not an object");

                    assert.isNotNull(bean.initFlag, "Bean init flag is null");
                    assert.isTrue(bean.initFlag, "Bean init flag is not 'true'");
                    
                    var controller = context.controller;

                    assert.isNotNull(controller.bean, "Controller property 'bean' is null");
                    assert.isObject(controller.bean, "Controller property 'bean' is not an object");

                    assert.isNotNull(controller.service, "Controller property 'service' is null");
                    assert.isObject(controller.service, "Controller property 'service' is not an object");

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

                    assert.isNotNull(component.controller, "Component property 'controller' is null");
                    assert.isObject(component.controller, "Component property 'controller' is not an object");

                    assert.isNotNull(component.service, "Component property 'service' is null");
                    assert.isObject(component.service, "Component property 'service' is not an object");

                    assert.isNotNull(component.initFlag, "Component init flag is null");
                    assert.isTrue(component.initFlag, "Component init flag is not 'true'");


                    factory.removeAllListeners();
                } catch(e) {

                    reject(e);

                } finally {
                    resolve();
                }
            });
        });
    });

    it('Should instantiate a simple project', function() {

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("complex");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){
            factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

                try {

                    //console.log(util.inspect(applicationStack, {depth:25}));

                    var context = getContextBean(applicationStack);;

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

                    assert.isNotNull(context.innerBeanLevel1, "Context property 'innerBeanLevel1' is null");
                    assert.isObject(context.innerBeanLevel1, "Context property 'innerBeanLevel2' is not an object");

                    assert.isNotNull(context.innerBeanLevel2, "Context property 'innerBeanLevel2' is null");
                    assert.isObject(context.innerBeanLevel2, "Context property 'innerBeanLevel2' is not an object");

                    assert.isNotNull(context.innerBeanLevel2, "Context property 'innerBeanLevel3' is null");
                    assert.isObject(context.innerBeanLevel2, "Context property 'innerBeanLevel3' is not an object");

                    assert.isNotNull(context.initFlag, "Context property 'initFlag' is null");
                    assert.equal(1, context.initFlag, "Init flag does not match expectation");


                    var bean = context.bean;

                    assert.isNotNull(bean.controller, "Bean property 'controller' is null");
                    assert.isObject(bean.controller, "Bean property 'controller' is not an object");

                    assert.isNotNull(bean.service, "Bean property 'service' is null");
                    assert.isObject(bean.service, "Bean property 'service' is not an object");

                    assert.isNotNull(bean.component, "Bean property 'component' is null");
                    assert.isObject(bean.component, "Bean property 'component' is not an object");

                    assert.isNotNull(bean.initFlag, "Bean init flag is null");
                    assert.isTrue(bean.initFlag, "Bean init flag is not 'true'");

                    var controller = context.controller;

                    assert.isNotNull(controller.bean, "Controller property 'bean' is null");
                    assert.isObject(controller.bean, "Controller property 'bean' is not an object");

                    assert.isNotNull(controller.service, "Controller property 'service' is null");
                    assert.isObject(controller.service, "Controller property 'service' is not an object");

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

                    assert.isNotNull(component.controller, "Component property 'controller' is null");
                    assert.isObject(component.controller, "Component property 'controller' is not an object");

                    assert.isNotNull(component.service, "Component property 'service' is null");
                    assert.isObject(component.service, "Component property 'service' is not an object");

                    assert.isNotNull(component.initFlag, "Component init flag is null");
                    assert.isTrue(component.initFlag, "Component init flag is not 'true'");


                    factory.removeAllListeners();
                } catch(e) {

                    reject(e);

                } finally {
                    resolve();
                }
            });
        });
    });

    it('Should instantiate a complex project', function() {

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("complex2");
        var contextInfo = {
            "scan": [
                contextRoot
            ],
            /*
            "projectLandScape": {
                "dir": contextRoot,
                "useBeanNames": true,
                "showObjectMethods": false,
                "mapType": "svg"
            }
            */
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){
            factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

                try {

                    //console.log(util.inspect(applicationStack, {depth:25}));

                    /*
                    var context = getContextBean(applicationStack);;

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

                    assert.isNotNull(context.innerBeanLevel1, "Context property 'innerBeanLevel1' is null");
                    assert.isObject(context.innerBeanLevel1, "Context property 'innerBeanLevel2' is not an object");

                    assert.isNotNull(context.innerBeanLevel2, "Context property 'innerBeanLevel2' is null");
                    assert.isObject(context.innerBeanLevel2, "Context property 'innerBeanLevel2' is not an object");

                    assert.isNotNull(context.innerBeanLevel2, "Context property 'innerBeanLevel3' is null");
                    assert.isObject(context.innerBeanLevel2, "Context property 'innerBeanLevel3' is not an object");

                    assert.isNotNull(context.initFlag, "Context property 'initFlag' is null");
                    assert.equal(1, context.initFlag, "Init flag does not match expectation");


                    var bean = context.bean;

                    assert.isNotNull(bean.controller, "Bean property 'controller' is null");
                    assert.isObject(bean.controller, "Bean property 'controller' is not an object");

                    assert.isNotNull(bean.service, "Bean property 'service' is null");
                    assert.isObject(bean.service, "Bean property 'service' is not an object");

                    assert.isNotNull(bean.component, "Bean property 'component' is null");
                    assert.isObject(bean.component, "Bean property 'component' is not an object");

                    assert.isNotNull(bean.initFlag, "Bean init flag is null");
                    assert.isTrue(bean.initFlag, "Bean init flag is not 'true'");

                    var controller = context.controller;

                    assert.isNotNull(controller.bean, "Controller property 'bean' is null");
                    assert.isObject(controller.bean, "Controller property 'bean' is not an object");

                    assert.isNotNull(controller.service, "Controller property 'service' is null");
                    assert.isObject(controller.service, "Controller property 'service' is not an object");

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

                    assert.isNotNull(component.controller, "Component property 'controller' is null");
                    assert.isObject(component.controller, "Component property 'controller' is not an object");

                    assert.isNotNull(component.service, "Component property 'service' is null");
                    assert.isObject(component.service, "Component property 'service' is not an object");

                    assert.isNotNull(component.initFlag, "Component init flag is null");
                    assert.isTrue(component.initFlag, "Component init flag is not 'true'");

                    */


                    factory.removeAllListeners();
                } catch(e) {

                    reject(e);

                } finally {
                    resolve();
                }
            });
        });
    });


    it('Should instantiate a simple project with inheritance', function() {

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("inheritance", "simple");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){

            factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

                //console.log(util.inspect(applicationStack, {depth:25}));

                try {

                    var context = getContextBean(applicationStack);

                    // Test context
                    assert.isNotNull(context, "Context is null");
                    assert.isObject(context, "Context is not an object");

                    assert.isNotNull(context.inheritor, "Context property 'bean' is null");
                    assert.isObject(context.inheritor, "Context property 'bean' is not an object");


                    factory.removeAllListeners();
                } catch(e) {

                    reject(e);

                } finally {
                    resolve();
                }
            });
        });
    });

    it('Should instantiate a simple project with inheritance tree', function() {

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("inheritance", "inheritanceTree");
        var contextInfo = {
            "scan": [
                contextRoot
            ],
            /*
            "projectLandScape": {
                "dir": contextRoot,
                "useBeanNames": false,
                "showObjectMethods": true,
                "mapType": "svg"
            }
            */
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){
            factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

                try {

                    var context = getContextBean(applicationStack);

                    // Test context
                    assert.isNotNull(context, "Context is null");
                    assert.isObject(context, "Context is not an object");

                    assert.isNotNull(context.inheritor, "Context property 'bean' is null");
                    assert.isObject(context.inheritor, "Context property 'bean' is not an object");


                    factory.removeAllListeners();
                } catch(e) {

                    reject(e);

                } finally {
                    resolve();
                }
            });
        });
    });

    it('Should instantiate a simple autowried project', function() {

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("autowired");
        var contextInfo = {
            "scan": [
                contextRoot
            ],
            "projectLandScape": {
                "dir": contextRoot,
                "useBeanNames": true,
                "avoidDefaultMethods": true,
                "excludeResources": true,
                "imageType": "svg",
                //"imageName": "application"
            }
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        bootstrap(contextInfo, "INFO", null);
        return new Promise(function(resolve, reject){
            factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, function(applicationStack) {

                try {

                    var context = getContextBean(applicationStack);

                    //console.log(util.inspect(applicationStack, {depth:5}));

                    // Test context
                    assert.isNotNull(context, "Context is null");
                    assert.isObject(context, "Context is not an object");

                    assert.isNotNull(context.bean, "Context property 'bean' is null");
                    assert.isObject(context.bean, "Context property 'bean' is not an object");


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