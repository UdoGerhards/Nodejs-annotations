/**
 * http://usejsdoc.org/
 */
var util = require("util")
    , EventEmitter = require('events').EventEmitter;

const uuidV4 = require('uuid/v4');

/**
 *  Class Factory
 */
class Factory extends EventEmitter {

    constructor() {

        super();

        var instance = this;

        instance.modulePath = __dirname.replace(/lib\/factory/, "");

        /* Logging */
        instance.logManager = null;
        instance.logger = null;

        /* Internal utils */
        instance.stacks = [];
        instance.dependencyBuilder = null;

        /* External resources */
        instance.esprima = null;
        // TODO: Remove lodash if possible
        //instance._ = null;
        instance.path = null;
        instance.estraverse = null;
    }

    init() {

        var instance = this;
        instance.logger = instance.logManager.getLogger(instance.constructor.name);

        instance.logger.info("Factory initialized ... ");
    }

    /**
     * Parser context beans are served as external beans
     *
     * @private
     */
    _serveParserContext(params) {

        var instance = this;

        var parserContext = {
            AnnotationStructureParser: {
                _instance: structureParser
            },
            AnnotationDependencyBuilder: {
                _instance: dependencyBuilder
            },
            AnnotationContextBuilder: {
                _instance: contextBuilder
            },
            AnnotationFactory: {
                _instance: instance
            },
            AnnotationBaseParser: {
                virtual: function () {
                    return BaseParser
                }
            },
            Util: {
                _instance: util
            },
            Parameter: {
                _instance: params
            }
        }

        return parserContext;
    }

    /**
     * Method fakes external objects as ressource beans
     *
     * @param externals
     * @returns {{}}
     * @private
     */
    _fakeExternalResources(externals) {

        var externalBeans = {};
        var firstIdentifier = null;

        if (externals) {
            for (var name in externals) {

                // Key namespace
                var identifier = uuidV4();

                // Fake key namespace
                firstIdentifier = firstIdentifier ? firstIdentifier : identifier;

                var externalBean = externals[name]._instance;
                var virtualBean = externals[name].virtual;

                // Add external objects as resources to the later available application context
                var externalResource = {
                    namespace: identifier,
                    _instance: externalBean,
                    virtual: virtualBean,
                    descriptor: {
                        annotation: ResourceAnnotation,
                        annotationValue: "(\"" + name + "\")"
                    }
                };

                // Prepare own bean structure for externals
                externalBeans[externalResource.namespace] = externalResource;
            }

            // Prepare for merge with application context
            var parserStructur = {};
            parserStructur[firstIdentifier] = externalBeans;

            return parserStructur;
        } else {
            return null;
        }
    }

    bytesToSize(memObject, precision) {

        var precision = precision || 4;

        const unit = ['', 'K', 'M', 'G', 'T', 'P'];

        var formated = {}

        for (var name in memObject) {
            var input = memObject[name];

            if (unit >= unit.length) {
                return input + ' B';
            }

            var index = Math.floor(Math.log(input) / Math.log(1024));
            formated[name] = (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B' + ' (' + input + ')';
        }

        return formated;
    }

    /**
     * Main factory function. Will be called by "bootstrap"
     *
     * @param parameters                    The processing paramteters
     * @returns {Promise.<TResult>}         Parsing promise(s)
     */
    process(parameters) {
        var instance = this;
        var logger = instance.logger;
        var contextBuilder = instance.contextBuilder;

        var additionalPlugins = parameters.additionalPlugins || null;

        logger.info("Scanning for plugins ... ");
        // Scan for plugins
        var pluginCounter = instance._scanForPlugins(additionalPlugins, parameters);
        if (pluginCounter > 0) {
            instance.once(global.phase._BUILD_FINISHED_, function (pluginStack) {

                // Emit plugin stack
                instance.emit(global.phase._FINAL_PLUGIN_CONTEXT_, pluginStack);

                instance._parseFiles(parameters)
                instance.once(global.phase._BUILD_FINISHED_, function (applicationStack) {

                    // Clean up application stack
                    instance.cleanApplicationStructure(applicationStack);
                    applicationStack._parameters = parameters;

                    // Emit applicaton stack
                    instance.emit(global.phase._FINAL_APPLICATION_CONTEXT_, applicationStack);

                });
            })
        } else {
            instance._parseFiles(parameters)
            instance.once(global.phase._BUILD_FINISHED_, function (applicationStack) {

                // Clean up application stack
                instance.cleanApplicationStructure(applicationStack);
                applicationStack._parameters = parameters;

                // Emit applicaton stack
                instance.emit(global.phase._FINAL_APPLICATION_CONTEXT_, applicationStack);

            });
        }
    };

    /**
     * Scans for parser plugins. This method takes an array of additional paths which will be scanned for additional plugins.
     *
     * @param additionalPlugins         The array with additional plugin paths
     * @private                         Parsing promise(s)
     */
    _scanForPlugins(additionalPlugins, params) {
        var instance = this;

        if (params.skipPlugins) {
            return null;
        }

        var pluginPath = [process.env.PWD + instance.path.sep + "node_modules" + instance.path.sep + "@annotations" + instance.path.sep];

        var parserContext = instance._serveParserContext(params); // Get all parsers, factory and context builder as resource beans

        // Add external plugin directories
        //var searchInPath = instance._.isArray(additionalPlugins) ? pluginPath.concat(additionalPlugins) : pluginPath;
        var searchInPath = Array.isArray(additionalPlugins) ? pluginPath.concat(additionalPlugins) : pluginPath;

        // Scan for annotation plugins
        var parameters = {
            "scan": searchInPath,
            "externalContext": parserContext
        }

        return instance._parseFiles(parameters);
    }

    /**
     * Parser files and creates application context(s). Paths to search for files is defined in the given path array.
     *
     * @param {Array} searchInPath                  The defined paths to search in
     * @param {Array} additionalExcludes            Defined paths to be excluded
     * @param {Array} externals                     External objects served
     * @returns {Array}                             Array of parsing promises
     */
    _parseFiles(parameters) {

        var instance = this;
        var logger = instance.logger;

        var searchInPath = parameters.scan;
        var excludes = parameters.excludes || [];
        var externalBeans = parameters.externalContext || null;

        //if (!instance._.isArray(searchInPath)) {
        if (!Array.isArray(searchInPath)) {
            searchInPath = [searchInPath];
        }

        searchInPath.forEach(function (searchPath) {
            if (!searchPath.includes("/node_modules")) {
                excludes.push(searchPath + "**/node_modules/**/*.js");
                excludes.push(searchPath + "**/test/**/*.js");
            }
        });


        logger.info("... building dependencies ...");
        var scanGlobs = dependencyBuilder.buildStandardScanGlobs(searchInPath);


        // Process external beans
        var packageCounter = 0;
        var externalContext = instance._fakeExternalResources(externalBeans) || null;
        var parsingPromises = [];

        /*
         * Listening to the parsing process
         */
        function buildListener(beans) {
            instance.stacks.push(beans);
            packageCounter--;

            if (packageCounter === 0) {
                instance.emit(global.phase._BUILD_FINISHED_, instance.stacks);
                instance.stacks = [];
            }
        };

        var listener = contextBuilder.listeners(global.phase._BUILD_FINISHED_);
        listener.forEach(function (func) {
            if (func.name === buildListener.name) {
                contextBuilder.removeListener(global.phase._BUILD_FINISHED_, func);
            }
        })

        contextBuilder.on(global.phase._BUILD_FINISHED_, buildListener);

        for (var scanIndex = 0; scanIndex < scanGlobs.length; scanIndex++) {
            /*
             * Prepare scan
             */
            var scan = scanGlobs[scanIndex].searchIn;
            var scanExcludes = excludes;

            /*
             * Load dependencies
             */
            var dependencyPackages = dependencyBuilder.loadDependencies(scan, scanExcludes);

            //if (!instance._.isEmpty(dependencyPackages)) {
            if (dependencyPackages && dependencyPackages.length > 0) {
                    packageCounter++;

                    /*
                     * Parse results
                     */
                    contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                        // If externals are given
                        if (externalContext) {
                            applicationStack = instance._.merge(applicationStack, externalContext);
                        }

                        var processStack = [
                            applicationStack,
                            0
                        ];

                        contextBuilder.processApplicationStack(processStack);
                    });
                }
            }

        return packageCounter;
        }


    cleanApplicationStructure(applicationStructure) {

        var instance = this;

        //console.log("==========================================");
        //console.log("CLEANUP");
        //console.log("==========================================");

        applicationStructure[0].classToBean = null;
        delete applicationStructure[0].classToBean;


        for (var beanName in applicationStructure[0]["nameToNamespace"]) {

            if (applicationStructure[0]["nameToNamespace"][beanName].descriptor) {
                var annotationInformation = {

                    "annotationValue": applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotationValue,
                    "annotation": applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotation,
                    "parentBeanName": applicationStructure[0]["nameToNamespace"][beanName].descriptor.parentBeanName
                };
            }

            applicationStructure[0]["nameToNamespace"][beanName].descriptor = {};
            applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotationInformation = annotationInformation;
            //delete applicationStructure[0]["nameToNamespace"][beanName].descriptor;

            applicationStructure[0]["nameToNamespace"][beanName].resolve = null;
            delete applicationStructure[0]["nameToNamespace"][beanName].resolve;

            applicationStructure[0]["nameToNamespace"][beanName].reject = null;
            delete applicationStructure[0]["nameToNamespace"][beanName].reject;

            applicationStructure[0]["nameToNamespace"][beanName].annotationPromises = null;
            delete applicationStructure[0]["nameToNamespace"][beanName].annotationPromises;

            applicationStructure[0]["nameToNamespace"][beanName].loader = null;
            delete applicationStructure[0]["nameToNamespace"][beanName].loader;

            if (applicationStructure[0]["nameToNamespace"][beanName].structure) {
                applicationStructure[0]["nameToNamespace"][beanName].structure.forEach(function (struct) {

                    struct.start = null;
                    delete struct.start;
                    struct.codeStart = null;
                    delete struct.codeStart;

                    struct.end = null;
                    delete struct.end;
                    struct.codeEnd = null;
                    delete struct.codeEnd;
                });
            }

        }

        try {
            global.gc();
        } catch (e) {
        }

        var memory = process.memoryUsage();
        memory = instance._humanReadable(memory);

        console.log(memory);

        //instance._generateClassDiagramm(applicationStructure);

    }

    _humanReadable(valueObject) {

        var newValueObject = {};

        var memory = {
            G: (1024*1024*1024),
            M: (1024*1024),
            K: 1024
        };

        for (var name in valueObject) {

            var segSize = valueObject[name];

            var hRValue = [];
            var last = null;

            for (var size in memory) {
                var mem = memory[size];

                var hRmem = Math.floor(segSize / mem);
                segSize = segSize % mem;

                if (hRmem > 0) {
                    hRValue.push(hRmem+size);
                }
            }

            if (segSize > 0) {
                hRValue.push(segSize);
            }

            newValueObject[name] = hRValue.join(" ");

        }

        return newValueObject;
    }

    /**
     * Generates a class diagramm from the given application context
     * @private
     */

    _generateClassDiagramm(applicationStructure) {

        diagramTool(applicationStructure, true);

    };
    
}

module.exports = exports = new Factory();