'use strict';

var mocha = require("mocha")
    , assert = require("chai").assert
    , expect = require("chai").expect
    , estraverse = require("estraverse")
    , log4js = require("log4js")
    , fs = require("fs-extra")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , glob = require("glob")
    , factory = require(process.env.PWD + path.sep + "lib" + path.sep + "factory" + path.sep + "Factory.js")
    , ClassUnderTest = require(process.env.PWD + path.sep + "lib" + path.sep + "context" + path.sep + "ContextBuilder.js")
    , sizeOf = require("object-sizeof");
;

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
        contextBuilder = ClassUnderTest;
        factory.init();
    });

    afterEach(function () {

    });

    describe("ContextBuilderInit", function () {

        it("Tests the initializtation of the context builder object", function () {
            contextBuilder.logger.setLevel("TRACE");

            assert.isNotNull(contextBuilder.annotationParser);
            assert.isObject(contextBuilder.annotationParser);
        });
    });

    describe("ParsingFile", function () {

        it("Parses a given file and gives back its bean structure", function () {

            this.timeout(timeout);

            var fileToParse = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep + "fullProject" + path.sep + "InstancesAnnotationProject" + path.sep + "Context.js";

            /*
             * Mocked dependency packages
             */
            var dependencyPackage = {
                paths: [fileToParse]
            }
            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");
            return contextBuilder.parseFileInformation(dependencyPackages).then(function (beansStack) {
                console.log(beansStack);
            });

        });

    });

    describe("ParsingMultipleFile", function () {

        it("Parses a given file and gives back its bean structure", function () {

            this.timeout(timeout);

            var fileToParser = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep + "fullProject" + path.sep + "InstancesAnnotationProject" + path.sep;

            var filesToParse = glob.sync(fileToParser + "**/*.js");

            /*
             * Mocked dependency packages
             */
            var dependencyPackage = {
                paths: filesToParse
            }

            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");
            return contextBuilder.parseFileInformation(dependencyPackages).then(function (beansStack) {
                logger.info(util.inspect(beansStack, {depth: 4}));
            });

        });

    });

    describe("StashSimpleObjects", function () {

        it("Parses a given file and gives back its bean structure", function () {

            this.timeout(timeout);

            var fileToParser = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep + "fullProject" + path.sep + "InstancesAnnotationProject" + path.sep;

            var filesToParse = glob.sync(fileToParser + "**/*.js");

            /*
             * Mocked dependency packages
             */
            var dependencyPackage = {
                paths: filesToParse
            }

            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");

            // Factory loads all stages but we only want to have _STASHING_ for the test
            contextBuilder.removeStageHandler();
            contextBuilder.stages = [
                global.stages._STASHING_
            ];
            contextBuilder.setStageHandler();

            return contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                assert.isNotNull(applicationStack);
                assert.isObject(applicationStack);

                var processStage = [
                    applicationStack,
                    0
                ];

                return new Promise(function(resolve, reject){
                    contextBuilder.on(global.phase._BUILD_FINISHED_, function(result) {
                        logger.info(util.inspect(result, {depth:1}));
                        resolve();
                    });

                    // Process
                    contextBuilder.processApplicationStack(processStage);
                });
            });

        });

    });

    describe("InstantiateSingleObjectWithInnerBeans", function () {

        it("Instantiates a single object with inner beans", function () {

            this.timeout(timeout);

            var fileToParse = resourcesPath + path.sep + "parser" + path.sep + "component2.js";

            var dependencyPackage = {
                paths: [fileToParse]
            };

            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");

            // Factory loads all stages but we only want to have _STASHING_ for the test
            contextBuilder.removeStageHandler();
            contextBuilder.stages = [
                global.stages._STASHING_,
                global.stages._INSTANTIATE_
            ];
            contextBuilder.setStageHandler();
            return contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                assert.isNotNull(applicationStack);
                assert.isObject(applicationStack);

                var processStage = [
                    applicationStack,
                    0
                ];

                return new Promise(function(resolve, reject){
                    contextBuilder.on(global.phase._BUILD_FINISHED_, function(result) {
                        logger.info(util.inspect(result, {depth:1}));
                        resolve();
                    });

                    // Process
                    contextBuilder.processApplicationStack(processStage);
                });

            });
        });
    });

    describe("InstantiateSimpleObjects", function () {

        it("Instantiates simple objects in the demo project", function () {

            this.timeout(timeout);

            var fileToParser = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep + "fullProject" + path.sep + "InstancesAnnotationProject" + path.sep;

            var filesToParse = glob.sync(fileToParser + "**/*.js");

            /*
             * Mocked dependency packages
             */
            var dependencyPackage = {
                paths: filesToParse
            }

            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");

            // Factory loads all stages but we only want to have _STASHING_ for the test
            contextBuilder.removeStageHandler();
            contextBuilder.stages = [
                global.stages._STASHING_,
                global.stages._INSTANTIATE_,
                global.stages._INJECT_,
                global.stages._FINISH_SETUP_
            ];
            contextBuilder.setStageHandler();
            return contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                assert.isNotNull(applicationStack);
                assert.isObject(applicationStack);

                var processStage = [
                    applicationStack,
                    0
                ];

                return new Promise(function(resolve, reject){
                    contextBuilder.on(global.phase._BUILD_FINISHED_, function(result) {
                        logger.info(util.inspect(result, {depth:1}));
                        resolve();
                    });

                    // Process
                    contextBuilder.processApplicationStack(processStage);
                });

            });
        });

    });

    describe("InstantiateWithInnerBeans", function () {

        it("Instantiates simple objects in the demo project", function () {

            this.timeout(timeout);

            var fileToParser = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep + "fullProjectWithInnerBeans" + path.sep + "InstancesAnnotationProject" + path.sep;

            var filesToParse = glob.sync(fileToParser + "**/*.js");

            /*
             * Mocked dependency packages
             */
            var dependencyPackage = {
                paths: filesToParse
            }

            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");
            // Factory loads all stages but we only want to have _STASHING_ for the test
            contextBuilder.removeStageHandler();
            contextBuilder.stages = [
                global.stages._STASHING_,
                global.stages._INSTANTIATE_,
                global.stages._INJECT_,
                global.stages._RUN_,
                global.stages._FINISH_SETUP_
            ];
            contextBuilder.setStageHandler();
            return contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                assert.isNotNull(applicationStack);
                assert.isObject(applicationStack);

                var processStage = [
                    applicationStack,
                    0
                ];

                return new Promise(function(resolve, reject){
                    contextBuilder.on(global.phase._BUILD_FINISHED_, function(result) {
                        logger.info(util.inspect(result, {depth:1}));
                        resolve();
                    });

                    // Process
                    contextBuilder.processApplicationStack(processStage);
                });

            });

        });

    });

    describe("SimpleInheritance", function() {
        it("Inherits from parent beans", function(){

            this.timeout(timeout);

            var fileToParser = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep + "inheritance" + path.sep+"simple"+path.sep;
            var filesToParse = glob.sync(fileToParser + "**/*.js");

            /*
             * Mocked dependency packages
             */
            var dependencyPackage = {
                paths: filesToParse
            }

            var dependencyPackages = {
                testPackage: dependencyPackage
            };


            contextBuilder.logger.setLevel("INFO");
            // Factory loads all stages but we only want to have _STASHING_ for the test
            contextBuilder.removeStageHandler();
            contextBuilder.stages = [
                global.stages._STASHING_,
                global.stages._INHERIT_,
                global.stages._INSTANTIATE_,
            ];
            contextBuilder.setStageHandler();

            return contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                assert.isNotNull(applicationStack);
                assert.isObject(applicationStack);

                var processStage = [
                    applicationStack,
                    0
                ];

                return new Promise(function(resolve, reject){
                    contextBuilder.on(global.phase._BUILD_FINISHED_, function(result) {
                        logger.info(util.inspect(result, {depth:3}));
                        resolve();
                    });

                    // Process
                    contextBuilder.processApplicationStack(processStage);
                });
            });
        });
    });

    describe("MultipleInheritance", function() {
        it("Inherits from parent beans", function(){

            this.timeout(timeout);

            var fileToParser = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep + "inheritance" + path.sep+"multiple"+path.sep;
            var filesToParse = glob.sync(fileToParser + "**/*.js");

            /*
             * Mocked dependency packages
             */
            var dependencyPackage = {
                paths: filesToParse
            }

            var dependencyPackages = {
                testPackage: dependencyPackage
            };


            contextBuilder.logger.setLevel("INFO");
            // Factory loads all stages but we only want to have _STASHING_ for the test
            contextBuilder.removeStageHandler();
            contextBuilder.stages = [
                global.stages._STASHING_,
                global.stages._INHERIT_,
                global.stages._INSTANTIATE_,
            ];
            contextBuilder.setStageHandler();

            return contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                assert.isNotNull(applicationStack);
                assert.isObject(applicationStack);

                var processStage = [
                    applicationStack,
                    0
                ];

                return new Promise(function(resolve, reject){
                    contextBuilder.on(global.phase._BUILD_FINISHED_, function(result) {
                        logger.info(util.inspect(result, {depth:1}));
                        resolve();
                    });

                    // Process
                    contextBuilder.processApplicationStack(processStage);
                });
            });
        });
    });

    describe("AsynchronInstantiateWithInnerBeans", function () {

        it("Instantiates simple objects in the demo project", function () {

            this.timeout(timeout);

            var fileToParser = process.env.PWD + path.sep + "test" + path.sep + "resources" + path.sep + "fullProjectWithInnerBeans" + path.sep + "InstancesAnnotationProject" + path.sep;

            var filesToParse = glob.sync(fileToParser + "**/*.js");

            /*
             * Mocked dependency packages
             */
            var dependencyPackage = {
                paths: filesToParse
            }

            var dependencyPackages = {
                testPackage: dependencyPackage
            };

            contextBuilder.logger.setLevel("INFO");
            return contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                assert.isNotNull(applicationStack);
                assert.isObject(applicationStack);

                var processStage = [
                    applicationStack,
                    0
                ];

                return new Promise(function(resolve, reject){
                    contextBuilder.on(global.phase._BUILD_FINISHED_, function(result) {
                        logger.info(util.inspect(result, {depth:1}));
                        resolve();
                    });

                    // Process
                    contextBuilder.processApplicationStack(processStage);
                });
            });

        });

    });

});