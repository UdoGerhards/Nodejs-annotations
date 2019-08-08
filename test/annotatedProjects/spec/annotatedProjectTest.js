'use strict';


var assert = require("chai").assert
    , log4js = require("log4js")
    , path = require("path");

/**
 * Created by udogerhards on 20.10.18.
 */

describe("Project annotation test suite", function(){

    var timeout = 50000;


    let pos = process.env.PWD.indexOf("/test");

    let libRoot = "";
    if (pos >-1) {
        libRoot = process.env.PWD.substring(0, pos);
    } else {
        libRoot = process.env.PWD;
    }
    let testRoot = path.join(libRoot, "test");
    let resourceRoot = path.join(testRoot, "resources");

    let bootstrap = require(path.join(libRoot, "lib", "bootstrap", "bootstrap.js"));
    let factory = require( path.join(libRoot, "lib", "factory", "Factory.js"));

    let projectRoot = path.join(resourceRoot, "annotatedProjects");

    it('Should instantiate a type safe project', function() {

        /*
            Initialize context
         */
        var contextRoot = projectRoot+path.sep+path.join("typeSafe");
        var contextInfo = {
            "scan": [
                contextRoot
            ],
            /*
            "projectLandScape": {
                "dir": contextRoot,
                "useBeanNames": true,
                "showAnnotations": false,
                "avoidDefaultMethods": false,
                "excludeResources": true,
            }
            */
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        let loadPromise = bootstrap(contextInfo, "INFO", null);

        return loadPromise.then(function(context){

            try {

                //let context = getContextBean(applicationStack);

                assert.isNotNull(context, "Context is null");
                assert.isObject(context, "Context is not an object");

                assert.isNotNull(context.typeBean, "Context property 'typeBean' is null");
                assert.isObject(context.typeBean, "Context property 'typeBean' is not an object");

                context.typeBean._number = "1000";
                assert.typeOf(context.typeBean._number, "Number", "TypeBean '_nunber' is not a number");

                context.typeBean.setNumber("1000");
                assert.typeOf(context.typeBean._number, "Number", "TypeBean '_nunber' is not a number");

                context.typeBean._integer = 10000.23455;
                assert.typeOf(context.typeBean._integer, "Number", "TypeBean '_nunber' is not a number / integer");

                context.typeBean.setInteger("1000");
                assert.typeOf(context.typeBean._number, "Number", "TypeBean '_nunber' is not a number / integer");

                context.typeBean._float = "10000.23455";
                assert.typeOf(context.typeBean._float, "Number", "TypeBean '_nunber' is not a number / float");

                context.typeBean.setFloat("1000.2345");
                assert.typeOf(context.typeBean._number, "Number", "TypeBean '_nunber' is not a number / float");

                context.typeBean._boolean = "true";
                assert.typeOf(context.typeBean._boolean, "Boolean", "TypeBean '_boolean' is not a boolean");

                context.typeBean._boolean = 1;
                assert.typeOf(context.typeBean._boolean, "Boolean", "TypeBean '_boolean' is not a boolean");

                context.typeBean.setBoolean("true");
                assert.typeOf(context.typeBean._boolean, "Boolean", "TypeBean '_boolean' is not a boolean");

                context.typeBean._string = 1;
                assert.typeOf(context.typeBean._string, "String", "TypeBean '_string' is not a string");


                context.typedParamsBean.setNumber("1000");
                assert.typeOf(context.typedParamsBean._number, "Number", "TypeBean '_nunber' is not a number");

                context.typedParamsBean.setInteger("1000");
                assert.typeOf(context.typedParamsBean._integer, "Number", "TypeBean '_integer' is not a number");

                context.typedParamsBean.setFloat("1000");
                assert.typeOf(context.typedParamsBean._float, "Number", "TypeBean '_float' is not a number");

                context.typedParamsBean.setBoolean("true");
                assert.typeOf(context.typedParamsBean._boolean, "Boolean", "TypeBean '_boolean' is not a boolean");

                context.typedParamsBean.setString(10000);
                assert.typeOf(context.typedParamsBean._string, "STring", "TypeBean '_string' is not a string");


                //assert.isNotNull(context.typeBean.testService, "TestBean 'testService' is null");


                assert.isNotNull(context.typedParamsBean, "Context property 'typedParamsBean' is null");
                assert.isObject(context.typedParamsBean, "Context property 'typedParamsBean' is not an object");

                factory.removeAllListeners();
            } catch(e) {

                throw(e)

            }

        })
    });

     it('Should instantiate a simple project', function() {

        /*
            Initialize context
        */
        var contextRoot = projectRoot+path.sep+path.join("simple");
        var contextInfo = {
            "scan": [
                contextRoot
            ],
            "projectLandScape": {
                "dir": contextRoot,
                "useBeanNames": true,
                "showAnnotations": false,
                "avoidDefaultMethods": false,
                "excludeResources": true,
            }
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        let processPromise = bootstrap(contextInfo, "INFO", null);
        return processPromise.then(function(context){

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
                console.log(e);
                throw e;
            }
        });
    });

    it("Should instantiate a simple inheritance project", function() {

        /*
         Initialize context
         */
        var contextRoot = projectRoot+path.sep+path.join("inheritance","simple");
        var contextInfo = {
            "scan": [
                contextRoot
            ],
            /*
            "projectLandScape": {
                "dir": contextRoot,
                "useBeanNames": true,
                "showAnnotations": false,
                "avoidDefaultMethods": false,
                "excludeResources": true,
            }
            */
        };

        let ParentClass = require(contextRoot+path.sep+path.join("ParentBean.js"));

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        let processPromise = bootstrap(contextInfo, "INFO", null);
        return processPromise.then(function(context){

            assert.instanceOf(context.inheritor, ParentClass, "Inheritor is not a supobject of 'Parent'");

        });

    });

    it("Should instantiate a simple tree inheritance project", function() {

        /*
         Initialize context
         */
        var contextRoot = projectRoot+path.sep+path.join("inheritance","inheritanceTree");
        var contextInfo = {
            "scan": [
                contextRoot
            ],
            "projectLandScape": {
                "dir": contextRoot,
                "useBeanNames": true,
                "showAnnotations": false,
                "avoidDefaultMethods": false,
                "excludeResources": true,
            }
        };


        let ParentClass = require(contextRoot+path.sep+path.join("ParentBean.js"));
        let GrantParentClass = require(contextRoot+path.sep+path.join("GrantParent.js"));

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        let processPromise = bootstrap(contextInfo, "INFO", null);
        return processPromise.then(function(context){

            assert.instanceOf(context.inheritor, ParentClass, "Inheritor is not a supobject of 'Parent'");

            assert.instanceOf(context.inheritor, GrantParentClass, "Inheritor is not a supobject of 'GrandParent'");

        });

    });

    it("Should instantiate a complex project", function() {

        /*
         Initialize context
         */
        var contextRoot = projectRoot+path.sep+path.join("complex");
        var contextInfo = {
            "scan": [
                contextRoot
            ],
            /*
            "projectLandScape": {
                "dir": contextRoot,
                "useBeanNames": true,
                "showAnnotations": false,
                "avoidDefaultMethods": false,
                "excludeResources": true,
            }
            */
        };

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        let processPromise = bootstrap(contextInfo, "INFO", null);
        return processPromise.then(function(context){

            context.afterFunction(1);
            context.afterFunctionCounter(1);

        });

    });

});