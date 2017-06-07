'use strict';

var mocha = require("mocha")
    , assert = require("chai").assert
    , expect = require("chai").expect
    , estraverse = require("estraverse")
    , esprima = require("esprima")
    , log4js = require("log4js")
    , fs = require("fs-extra")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , glob = require("glob")
    , factory = require(process.env.PWD + path.sep +"lib"+path.sep+"factory"+path.sep+"Factory.js")
    , ClassUnderTest = require(process.env.PWD + path.sep +"lib"+path.sep+"context"+path.sep+"ContextBuilder.js")
    , sizeOf = require("object-sizeof");;

describe("ContextBuilderTestSuite", function () {

    var contextBuilder = null;
    var timeout = 50000;

    var resourcesPath = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep;
    var loggerConfig = process.env.PWD + path.sep + "test" + path.sep + "config" + path.sep + "log4js.json";

    log4js.configure(loggerConfig);

    var factoryLogger = log4js.getLogger("factory");
    var logger = log4js.getLogger("contextBuilder");

    beforeEach(function () {

        factory.logger = factoryLogger;
        factory.init();

        contextBuilder = ClassUnderTest;
        contextBuilder.logger = logger;


    });

    afterEach(function () {

    });

    describe("ContextBuilderInit", function() {

        it("Tests the initializtation of the context builder object", function() {
            contextBuilder.logger.setLevel("TRACE");
            contextBuilder.init();

            assert.isNotNull(contextBuilder.annotations);
            assert.isObject(contextBuilder.annotations);
            assert.isNotNull(contextBuilder.tokenParser);
            assert.isObject(contextBuilder.tokenParser);
            assert.isNotNull(contextBuilder.annotationParser);
            assert.isObject(contextBuilder.annotationParser);
        });
    });

    describe("ParsingFile", function() {

        it("Parses a given file and gives back its bean structure", function() {

            this.timeout(timeout);

            var fileToParse = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep+"fullProject"+path.sep+"InstancesAnnotationProject"+path.sep+"Context.js";

            /*
             * Mocked dependency packages
             */
            var dependencyPackage =  {
                paths: [fileToParse]
            }
            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");
            return contextBuilder.parseFileInformation(dependencyPackages).then(function(beansStack){
                            console.log(beansStack);
            });

        });

    });

    describe("ParsingMultipleFile", function() {

        it("Parses a given file and gives back its bean structure", function() {

            this.timeout(timeout);

            var fileToParser = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep+"fullProject"+path.sep+"InstancesAnnotationProject"+path.sep;

            var filesToParse = glob.sync(fileToParser + "**/*.js");

            /*
             * Mocked dependency packages
             */
            var dependencyPackage =  {
                paths: filesToParse
            }

            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");
            return contextBuilder.parseFileInformation(dependencyPackages).then(function(beansStack){
                logger.info(util.inspect(beansStack, {depth:4}));
            });

        });

    });

    describe("StageSimpleObjects", function() {

        it("Parses a given file and gives back its bean structure", function() {

            this.timeout(timeout);

            var fileToParser = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep+"fullProject"+path.sep+"InstancesAnnotationProject"+path.sep;

            var filesToParse = glob.sync(fileToParser + "**/*.js");

            /*
             * Mocked dependency packages
             */
            var dependencyPackage =  {
                paths: filesToParse
            }

            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");
            return contextBuilder.parseFileInformation(dependencyPackages).then(function(applicationStack){

                assert.isNotNull(applicationStack);
                assert.isArray(applicationStack);

                applicationStack.forEach(function(beanStack){
                    beanStack.forEach(function(beanStructure) {
                        beanStructure.stage =  global._STAGE_
                    })
                });

                var processedApplicationStack = contextBuilder.processApplicationStack(applicationStack);
                console.log(sizeOf(processedApplicationStack));
            });

        });

    });

    describe("InstantiateSimpleObjects", function() {

        it("Instantiates simple objects in the demo project", function() {

            this.timeout(timeout);

            var fileToParser = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep+"fullProject"+path.sep+"InstancesAnnotationProject"+path.sep;

            var filesToParse = glob.sync(fileToParser + "**/*.js");

            /*
             * Mocked dependency packages
             */
            var dependencyPackage =  {
                paths: filesToParse
            }

            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");
            return contextBuilder.parseFileInformation(dependencyPackages).then(function(applicationStack){

                assert.isNotNull(applicationStack);
                assert.isObject(applicationStack);

                contextBuilder.processApplicationStack(applicationStack, global._STAGE_);
                contextBuilder.processApplicationStack(applicationStack, global._INSTANTIATE_);
                contextBuilder.processApplicationStack(applicationStack, global._FINISH_SETUP_);

                console.log(sizeOf(applicationStack));

                logger.info(util.inspect(applicationStack, {depth:1}));
            });

        });

    });
});