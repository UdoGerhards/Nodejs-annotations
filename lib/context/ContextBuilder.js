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

        instance.annotations = null;
        instance.tokenParser = null;
        instance.annotationParser = null;
        instance.logger = null;
    }

    init() {
        var instance = this;
        var logger = instance.logger;
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

            var applicationContext =  {}

            for (var index =  0; index < beanStructures.length; index++) {
                var beanStructure = beanStructures[index];
                for (var uuid in  beanStructure) {
                    var subBean = beanStructure[uuid];
                    if (!subBean.namespace.includes(':')) {
                        applicationContext[subBean.namespace] = beanStructure;
                    }
                }
            }

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
     */
    processApplicationStack(applicationStack, stage) {

        var instance = this;
        var beanStructurePromises = [];

        for (var mainUuid in applicationStack) {
            var beanStack = applicationStack[mainUuid];        // Get each bean structure
            for (var uuid in beanStack) {

                var beanStructure = beanStack[uuid];

                var beanStructurePromise = new Promise(function(resolve, reject) {

                    // Process main annotation first
                    beanStructure.annotationPromises = [];
                    beanStructure.stagePromise = beanStructurePromise;
                    beanStructure.stage = stage;
                    var main = beanStructure.descriptor;
                    var annotationParser = instance.annotationParser[main.annotation.name];

                    // Process structure
                    annotationParser.parse(main, beanStructure, applicationStack);
                    beanStructure.structure.forEach(function(structureAnnotation) {
                        var annotationParser = instance.annotationParser[structureAnnotation.annotation.name];

                        annotationParser.parse(structureAnnotation, beanStructure, applicationStack);
                    });

                    resolve();
                });

                beanStructurePromises.push(beanStructurePromise);
            }
        }

        return Promise.all(beanStructurePromises).then(function(results) {
            return applicationStack
        });
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