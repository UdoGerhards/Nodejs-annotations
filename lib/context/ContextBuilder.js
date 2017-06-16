'use strict';

var structureParser = require("../parser/structure/StructureParser")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , Promise = require("bluebird")
    , fs = Promise.promisifyAll(require("fs-extra"))
    , EvenEmitter = require('events').EventEmitter;


class ContextBuilder extends EvenEmitter {

    constructor() {
        super();
        var instance = this;

        instance.annotationParser = null;
        instance.logger = null;
        instance.stages= [];
    }

    init() {
        var instance = this;
        var logger = instance.logger;
        logger.info("Initializing context builder");

        instance.setStageHandler();
        instance.addListener(global.phase._BUILD_CONTEXT_, instance.processApplicationStack);
    }

    /**
     * Set handler for parsing bean structures
     */
    setStageHandler() {
        var instance = this;
        instance.stages.forEach(function(stage) {
            instance.addListener(stage, instance._parseBeanStructure);
        });
    }

    /**
     * Remove all handlers for bean structure parsing
     */
    removeStageHandler() {
        var instance = this;
        instance.stages.forEach(function(stage) {
            instance.removeListener(stage, instance._parseBeanStructure);
        });
    }

    /**
     * Parses files for the dependency packages
     *
     * @param dependencyPackages
     * @returns {Promise.<TResult>}
     */
    parseFileInformation(dependencyPackages) {

        var instance = this;
        var logger = instance.logger;

        logger.info("Parsing files ... ");

        for (var packageName in dependencyPackages) {
            var dependencyPackage = dependencyPackages[packageName];

            logger.trace("\nProcessing dependencyPackage: '" + packageName + "':");

            var paths = dependencyPackage.paths;
            var buildBeanStructures = [];

            for (var index = 0; index < paths.length; index++) {
                var path = paths[index];
                try {

                    logger.debug("    - Parsing file: " + path);
                    /*
                     * Load the files async
                     */

                    var loadPromise = instance._readFile(path);

                    buildBeanStructures.push(loadPromise);

                } catch (e) {
                    logger.error("Exception in parsing file: " + e);
                    throw e;
                }
            }
        }

        return Promise.all(buildBeanStructures).then(function (beanStructures) {

            var applicationContext = {}

            for (var index = 0; index < beanStructures.length; index++) {
                var beanStructure = beanStructures[index];
                for (var uuid in  beanStructure) {
                    var subBean = beanStructure[uuid];
                    if (!subBean.namespace.includes(':')) {
                        applicationContext[subBean.namespace] = beanStructure;
                    }
                }
            }

            applicationContext.nameToNamespace = {};

            return applicationContext;
        });
    };

    /**
     * Main processing function to setup an initialize beans
     *
     * @param applicationStack
     * @param stage
     * @returns {*}
     * @private
     * */

    processApplicationStack(mode) {
        var instance = this;
        var logger = instance.logger;

        var applicationStack = mode[0];
        var stage = instance.stages[mode[1]] || null;

        logger.info("Processing application context");

        if (stage !== null) {
            logger.info("Processing application stack, stage:"+util.inspect(stage));
            var beanStructurePromises = [];

            for (var mainUuid in applicationStack) {
                if (mainUuid !== "nameToNamespace") {
                    var beanStack = applicationStack[mainUuid];        // Get each bean structure
                    for (var uuid in beanStack) {

                        var beanStructurePromise = new Promise(function (resolve, reject) {
                            var beanStructure = beanStack[uuid];
                            beanStructure.resolve = resolve;
                            beanStructure.reject = reject;
                            beanStructure.stage = stage;

                            instance.emit(stage, [
                                beanStructure,
                                applicationStack
                            ]);
                        });

                        beanStructurePromises.push(beanStructurePromise);
                    }
                }
            }

            ++mode[1];
            Promise.all(beanStructurePromises).then(function (results) {
                var nextMode = [
                    applicationStack,
                    mode[1]
                ];

                instance.emit(global.phase._BUILD_CONTEXT_, nextMode);
            });
        } else {
            instance.emit(global.phase._BUILD_FINISHED_, mode[0]);
        }
    };


    _parseBeanStructure(parseInformation) {

        var instance = this;
        var logger = instance.logger;

        var beanStructure = parseInformation[0];
        var applicationStack = parseInformation[1];

        logger.info("Parsing beanstructure ...")


        // Process main annotation first
        beanStructure.annotationPromises = [];

        var main = beanStructure.descriptor;
        var annotationParser = instance.annotationParser[main.annotation.name];

        // Process structure
        annotationParser.parse(main, beanStructure, applicationStack);
        beanStructure.structure.forEach(function (structureAnnotation) {
            var annotationParser = instance.annotationParser[structureAnnotation.annotation.name];
            annotationParser.parse(structureAnnotation, beanStructure, applicationStack);
        });

        beanStructure.resolve();
    };

    /**
     * Reads a given file for later use with structure parser.
     *
     * @param filePath
     * @private
     */
    _readFile(filePath) {
        var instance = this;
        var logger = instance.logger;

        var loadPromise = new Promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf8', function (error, data) {
                if (!error) {
                    var fileAsString = data.toString();

                    var fileInfo = [
                        filePath,
                        fileAsString
                    ];

                    var beanStack = structureParser.parse(fileInfo);
                    resolve(beanStack)
                } else {
                    logger.error(error);
                    reject(error);
                }
            })
        });

        return loadPromise;

    }
}

module.exports = exports = new ContextBuilder();