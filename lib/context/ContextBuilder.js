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
            logger.trace(beanStructures);
            return beanStructures;
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
        var processedApplicatonStack = [];

        for (var index = 0; index < applicationStack.length; index++) {
            var beanStack = applicationStack[index];        // Get each bean structure
            for (var uuid in beanStack) {

                var beanStructure = beanStack[uuid];

                // Process main annotation first
                beanStructure.stage = stage;
                var main = beanStructure.descriptor;
                var annotationParser = instance.annotationParser[main.annotation.name];

                // Process structure
                beanStructure = annotationParser.parse(main, beanStructure);
                beanStructure.structure.forEach(function(structureAnnotation) {
                    var annotationParser = instance.annotationParser[structureAnnotation.annotation.name];
                    beanStructure = annotationParser.parse(main, beanStructure);
                    beanStack[uuid] = beanStructure;
                });

                applicationStack[index] = beanStack;
            }
        }

        return applicationStack;

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
                    logger.debug(fileAsString);

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