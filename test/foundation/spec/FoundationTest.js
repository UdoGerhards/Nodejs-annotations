'use strict';


var assert = require("chai").assert
    , log4js = require("log4js")
    , path = require("path")
    , util = require("util");

/**
 * Created by udogerhards on 20.10.18.
 */

describe("XML context described annotation test suite", function(){

    var timeout = 50000;

    var resourcesPath = process.env.PWD.replace("/test","") + path.sep + path.join("lib","foundation");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    //var bootstrap = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "bootstrap", "bootstrap.js"));
    //var factory = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "factory", "Factory.js"));
    //var contextBuilder = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "context", "ContextBuilder.js"));

    //log4js.configure(loggerConfig);
    var logger = log4js.getLogger("contextBuilder");


    /*
    it('Should match the correct module dir', function() {

        var foundationClassPath = path.join(resourcesPath, "FoundationClass.js");
        var foundationInstance = require(foundationClassPath);

        var testDir = "/Users/udogerhards/Documents/Bitbucket/DIAnnotations";

        assert.equal(foundationInstance._moduleDir, testDir, "Module directory not matched");
    });


    /**
    it('Should test the loading of the foundation configuration', function() {

        var foundationClassPath = path.join(resourcesPath, "FoundationClass.js");
        var foundationInstance = require(foundationClassPath);

        foundationInstance.init();
        /*
            Bootstrap the context and run the tests
        */
    /**
        this.timeout(timeout);

        return new Promise(function(resolve, reject){

            foundationInstance._configuration.done(function(value){

                //console.log(util.inspect(value,{depth:25}));

            });
        });
    });
    */

    it('Should instantiate a XMLContextBuilder instance and test it', function() {

        var xmlContextBuilderClassPath = path.join(resourcesPath,"context", "XMLContextBuilder.js");
        var xmlContextBuilderClass = require(xmlContextBuilderClassPath);

        var XMLBuilderInstance = new xmlContextBuilderClass();
        XMLBuilderInstance.init("/Users/udogerhards/Documents/Bitbucket/nodejs-annotations", "/lib/foundation/configuration/xmlContext.xml");

        this.timeout(timeout);

        var res = XMLBuilderInstance.process();

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

        return res.then(function(result) {

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

            return result;
            }
        );
    });
});