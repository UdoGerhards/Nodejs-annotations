'use strict';


var assert = require("chai").assert
    , log4js = require("log4js")
    , path = require("path")
    , util = require("util");


    var testContext = function(result) {

        var objects = [
            "LogManager",
            "DependencyBuilder",
            "StructureParser",
            "ContextBuilder",
            "Factory",
            "Esprima",
            "Estraverse",
            "FS",
            "Path",
            "Util",

        ];
        var functions = [
            "Diagram",
            "Beautify",
            "Bluebird",
            "Glob",
            "StaticMemberExpressionIdentifierMatch",
            "VariableDecorationStaticMemberExpressionIdentifierMatch",
            "Lodash"
        ];

        var lists = [
            "phase",
            "stages",
            "TokenParser",
            "AnnotationParser"
        ];


        var properties = [
            "LogManager",
            "DependencyBuilder",
            "StructureParser",
            "ContextBuilder",
            "Factory"
        ];

        var excludeProperties = [
            "domain"
        ];

        // Check all expected objects
        objects.forEach(function(value) {
            assert.isNotNull(result[value], +value+" is null ...");
            assert.isObject(result[value], value+" is not an object ... ");
        });

        // Lists
        functions.forEach(function(value) {
            assert.isNotNull(result[value], +value+" is null ...");
            assert.isFunction(result[value], value+" is not a function ... ");
        });

        // Arrays
        lists.forEach(function(value) {
            assert.isNotNull(result[value], +value+" is null ...");
            assert.isArray(result[value], value+" is not an array ... ");
        });

        // Check properties
        properties.forEach(function(value){

            var instance = result[value];

            var properties=Object.getOwnPropertyNames(result[value]);

            properties.forEach(function (prop) {
                if (!excludeProperties.includes(prop)) {
                    assert.isNotNull(instance[prop], value + "#" + prop + " is null where it should not!");
                }
            });

        });



    };

/**
 * Created by udogerhards on 20.10.18.
 */

describe("XML context described annotation test suite", function(){

    var timeout = 50000;

    var resourcesPath = process.env.PWD.replace("/test","") + path.sep + path.join("lib");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var logger = log4js.getLogger("contextBuilder");


    it('Should instantiate a XMLContextBuilder instance and test it', function() {

        var xmlContextBuilderClassPath = path.join(resourcesPath,"context", "XMLContextBuilder.js");
        var xmlContextBuilderClass = require(xmlContextBuilderClassPath);

        var XMLBuilderInstance = new xmlContextBuilderClass();
        XMLBuilderInstance.init("/Users/udogerhards/Documents/Bitbucket/nodejs-annotations", "/lib/configuration/DIAnnotationsContext.xml");

        this.timeout(timeout);

        var res = XMLBuilderInstance.process();

        return res.then(function(result) {

            testContext(result);

            return result;
            }
        );
    });

    it('Should instantiate the intial base context from the Foundation instance and test it', function() {

        var foundationClassPath = path.join(resourcesPath, "foundation", "Foundation.js");
        var FoundationSingleton = require(foundationClassPath);

        FoundationSingleton.init("/lib/configuration/DIAnnotationsContext.xml");
        var context = FoundationSingleton.getFullBaseContext();

        return context.then(function(result){

            testContext(result);

            return result;
        });

    });

    it('Should instantiate the initial base context from the Foundation instance and return the Factory instance', function() {

        var foundationClassPath = path.join(resourcesPath,"foundation", "Foundation.js");
        var FoundationSingleton = require(foundationClassPath);

        FoundationSingleton.init("/lib/configuration/DIAnnotationsContext.xml");
        var Factory = FoundationSingleton.getFactory();

        return Factory.then(function(result){

            assert.isNotNull(result, "Factory object is null ...");
            assert.isObject(result, "Factory is not an object ... ");

            return result;
        });

    });
});