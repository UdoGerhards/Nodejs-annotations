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

    var resourcesPath = process.env.PWD.replace("/annotations","") + path.sep + path.join("resources", "annotations", "inherits");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var libPath = process.env.PWD.replace("/test","").replace("/annotations", "") + path.sep + path.join("lib");

    var bootstrap = require( path.join( libPath, "bootstrap", "bootstrap.js"));


    log4js.configure(loggerConfig);
    var logger = log4js.getLogger("contextBuilder");



    it('Should instantiate a simple component with "@Inherits"', function(){

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("simple");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        let ParentClass = require(path.join(contextRoot, "parent.js"));
        let ChildClass = require(path.join(contextRoot, "child.js"));

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);
        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            assert.instanceOf(context.child, ParentClass, "Child is not an instanceof parent");
            assert.instanceOf(context.child, ChildClass, "Child is not an instanceof child");

        });
    });

    it('Should instantiate a component with multiple "@Inherits"', function(){

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("multiple");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        let GrantParentClass = require(path.join(contextRoot, "grandparent.js"));
        let ParentClass = require(path.join(contextRoot, "parent.js"));
        let ChildClass = require(path.join(contextRoot, "child.js"));

        /*
          Bootstrap the context and run the tests
         */
        this.timeout(timeout);
        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            assert.instanceOf(context.child, GrantParentClass, "Child is not an instanceof grandparent");
            assert.instanceOf(context.child, ParentClass, "Child is not an instanceof parent");
            assert.instanceOf(context.child, ChildClass, "Child is not an instanceof child");

        });
    });

    it('Should instantiate a component with multiple "@Inherits"', function(){

        /*
            Initialize context
         */
        var contextRoot = resourcesPath+path.sep+path.join("multipleWithBeans");
        var contextInfo = {
            "scan": [
                contextRoot
            ]
        };

        let GrantParentClass = require(path.join(contextRoot, "grandparent.js"));
        let ParentClass = require(path.join(contextRoot, "parent.js"));
        let ChildClass = require(path.join(contextRoot, "child.js"));

        /*
          Bootstrap the context and run the tests
         */
        this.timeout(timeout);
        let promise = bootstrap(contextInfo, "INFO", null);
        return promise.then(function(context){

            // Test context
            assert.isNotNull(context, "Context is null");
            assert.isObject(context, "Context is not an object");

            assert.instanceOf(context.child, GrantParentClass, "Child is not an instanceof grandparent");
            assert.instanceOf(context.child, ParentClass, "Child is not an instanceof parent");
            assert.instanceOf(context.child, ChildClass, "Child is not an instanceof child");

        });
    });

});