'use strict';

const EvenEmitter = require('events').EventEmitter;

class ContextBuilder extends EvenEmitter {

    constructor() {
        super();
        var instance = this;

        /* Logging */
        instance.LogManager = null;
        instance.logger = null;

        /* Internal utils */
        instance.annotationParser = null;
        instance.stages = [];

        /* External resources */
        // TODO: Remove bluebird and use buildin promise technology
        instance.promise = null;

        instance.util = null;

        instance.structureParser = null;
        instance.xmlParser = null;

        instance.uuidValidator = null;

        instance.applicationStack = null;

        instance.fs = null;
    }

    init() {
        var instance = this;

        instance.logger = instance.LogManager.getLogger(instance);
        var logger = instance.logger;

        logger.trace("Initializing ContextBuilder ...");

        //instance.addListener(global.phase._BUILD_CONTEXT_, instance.processApplicationStack);

        instance.stages = [
            global.stages._STASHING_,
            global.stages._INHERIT_,
            global.stages._INSTANTIATE_,
            global.stages._INJECT_,
            global.stages._AOP_INITIALIZE,
            global.stages._AOP_WIRE,
            global.stages._INITIALIZE_,
            global.stages._RUN_,
            global.stages._FINISH_SETUP_
        ];

        logger.info("Contexbuilder initilized ... ");
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
        //var promise = instance.promise;
        let promise = Promise

        var buildBeanStructures = [];

        for (var packageName in dependencyPackages) {
            var dependencyPackage = dependencyPackages[packageName];

            logger.trace("\nProcessing dependencyPackage: '" + packageName + "':");

            var paths = dependencyPackage.paths;

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

        return promise.all(buildBeanStructures).then(function (beanStructures) {

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
     * Processes the application structure
     *
     * @param parsingPackage
     */
    processApplicationStack(parsingPackage) {

        let instance = this;
        let logger = instance.logger;
        let stagePromises = [];

        let resolveFunc = null;
        let returnPromis = new Promise(function(resolve, reject){
            resolveFunc = resolve;
        });

        logger.debug("Parsing application structure!")

        instance.stages.forEach(function(stageName){
            let stagePromise = instance.processStages(stageName, parsingPackage );
            stagePromises.push(stagePromise);
        });

        /*
        instance.promise.all(stagePromises).then(function(results) {
            instance.emit(global.phase._BUILD_FINISHED_, parsingPackage );
            resolveFunc(parsingPackage);
        });
        */
        Promise.all(stagePromises).then(function(results) {
            instance.emit(global.phase._BUILD_FINISHED_, parsingPackage );
            resolveFunc(parsingPackage);
        });

        return returnPromis;
    }


    /**
     * Processes a dedicated parsing stage
     *
     * @param stage
     * @param applicationStack
     * @returns {Array}
     * @private
     */
    processStages(stage, applicationStack) {
        let instance = this;
        let logger = instance.logger;
        let uuidValidator = instance.uuidValidator;
        //let promise = instance.promise;
        let promise = Promise;
        let beanStructurePromises = [];
        let util = instance.util;

        logger.info("    ... processing application stack with stage:"+util.inspect(stage));

        for (var mainUuid in applicationStack) {
            if (uuidValidator.is(mainUuid)) {
                var beanStack = applicationStack[mainUuid];        // Get each bean structure
                for (var uuid in beanStack) {
                    var beanStructurePromise = new promise(function (resolve, reject) {
                        try {

                            logger.debug("       ... bean: '"+uuid+"' ... ")

                             var beanStructure = beanStack[uuid];
                             beanStructure.resolve = resolve;
                             beanStructure.reject = reject;
                             beanStructure.stage = stage;

                              instance._parseBeanStructure(
                                  [
                                      beanStructure,
                                      applicationStack
                                  ]
                              );

                        } catch(error) {
                            logger.error(error);
                        }
                    });

                    beanStructurePromises.push(beanStructurePromise);
                }
            }
        }

        return beanStructurePromises;

    }

    /**
     * Parsing a dedicated bean structure for a given stage.
     * This method is event driven.
     *
     * @param parseInformation
     * @private
     */
    _parseBeanStructure(parseInformation) {

        var instance = this;
        var logger = instance.logger;
        
        var beanStructure = parseInformation[0];
        var applicationStack = parseInformation[1];

        // Process main annotation first
        beanStructure.annotationPromises = [];

        var main = beanStructure.descriptor;

        // Explicit "null" checking since already instantiated beans can be provided as beanStructure; They will miss a few properties like leading annotation. @see Factory#_prepareBeans since this is used to work on plugins
        if (main) {
            var annotationParser = instance.annotationParser[main.annotation.name];

            try {
                // Process structure
                annotationParser.parse(main, beanStructure, applicationStack);
                if (beanStructure.structure) {
                    beanStructure.structure.forEach(function (structureAnnotation) {
                        var annotationParser = instance.annotationParser[structureAnnotation.annotation.name] || null;
                        if (annotationParser) {
                            annotationParser.parse(structureAnnotation, beanStructure, applicationStack);
                        }
                    });
                }
            } catch(e) {

                logger.error("Processing error on annotation '"+main.annotation.name+"' ... error thrown was: ", e);

                throw e;
            }
        }

        if (beanStructure._beanPromises) {

            promise.all(beanStructure._beanPromises).then(function(){
                beanStructure.resolve()
            })

        } else {
            beanStructure.resolve()
        }
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
        let fs = instance.fs;
        let promise = Promise;
        let structureParser = instance.structureParser;

        var loadPromise = new promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf8', function (error, data) {
                if (!error) {
                    var fileAsString = data.toString();

                    var fileInfo = [
                        filePath,
                        fileAsString
                    ];

                    var beanStack = null;
                    try {
                        beanStack = structureParser.parse(fileInfo);
                    } catch (error) {
                        logger.error(error);
                        logger.error(filePath);
                    }
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