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

    _processApplicationStack(applicationStack) {

        var instance = this;
        var processedApplicatonStack = [];
        applicationStack.forEach(function (beanStack) {
            var processedBeanStack = [];
            beanStack.forEach(function (beanStructure) {
                var main = beanStructure.descriptor.main;
                var annotationParser = instance.annotationParser[main.annotation.name];
                var processedBeanStructure = annotationParser.parse(main, beanStructure);
                processedBeanStack.push(processedBeanStructure);
            });
            processedApplicatonStack.push(processedBeanStack);
        });

        return processedApplicatonStack;

    };

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