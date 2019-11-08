/**
 * http://usejsdoc.org/
 */
var EventEmitter = require('events').EventEmitter;

/**
 *  Class Factory
 */
class Factory extends EventEmitter {

    constructor() {

        super();

        var instance = this;

        instance.modulePath = __dirname.replace(/lib\/factory/, "");

        /* Logging */
        instance.LogManager = null;
        instance.logger = null;

        /* Internal utils */
        instance.stacks = [];
        instance.contextBuilder = null;
        instance.dependencyBuilder = null;
        instance.structureParser = null;
        instance.xmlParser = null;

        /* External resources */
        instance.path = null;
        instance.uuidV4 = null;

        instance.diagramTool = null;
    }

    init() {

        var instance = this;
        instance.logger = instance.LogManager.getLogger(instance);

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
                _instance: instance.structureParser
            },
            AnnotationDependencyBuilder: {
                _instance: instance.dependencyBuilder
            },
            AnnotationContextBuilder: {
                _instance: instance.contextBuilder
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
                _instance: instance.util
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
        var instance = this;
        var uuidV4 = instance.uuidV4;

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
                        annotation: "", //ResourceAnnotation,
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
    async process(parameters) {

        let instance = this;
        let logger = instance.logger;
        let contextBuilder = instance.contextBuilder;

        logger.debug("Starting to process ... ");

        var additionalPlugins = parameters.additionalPlugins || null;

        if (parameters.file) {

            logger.debug("    using '"+parameters.file+"' as context configuration ...");

            let xmlParser = instance.xmlParser;

            xmlParser.init(parameters.file);
            let applicationContext = xmlParser.process();
            return applicationContext.then(function(beanStructure){

                logger.debug("    pre parsing of application context done ... coninuing with parsing ...  ");

                beanStructure.nameToNamespace = {};

                //contextBuilder.emit(global.phase._BUILD_CONTEXT_, processStack);

                let res = contextBuilder.processApplicationStack(beanStructure);

                return res.then(function(applicationStack){

                    // Clean up application stack
                    let cleanedStructure = instance.cleanApplicationStructure(applicationStack);
                    cleanedStructure._parameters = parameters;

                    // Emit applicaton stack
                    instance.emit(global.phase._FINAL_APPLICATION_CONTEXT_, cleanedStructure);

                    return instance._returnContext(cleanedStructure);

                });
            });

        } else {

            let resolveFunc = null;
            let rejectFunc = null;

            var annotatedCTX = new Promise(function(resolve, reject){
                resolveFunc = resolve;
                rejectFunc = reject;
            });

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
                        let cleanedStructure = instance.cleanApplicationStructure(applicationStack);
                        cleanedStructure._parameters = parameters;

                        // Emit applicaton stack
                        instance.emit(global.phase._FINAL_APPLICATION_CONTEXT_, cleanedStructure);
                    });
                })
            } else {

                let parsingPromises = instance._parseFiles(parameters);
                contextBuilder.once(global.phase._BUILD_FINISHED_, function (applicationStack) {

                    // Clean up application stack
                    let cleanedStructure = instance.cleanApplicationStructure(applicationStack);
                    cleanedStructure._parameters = parameters;

                    // Emit applicaton stack
                    instance.emit(global.phase._FINAL_APPLICATION_CONTEXT_, cleanedStructure);
                });

                Promise.all(parsingPromises).then(function(result){
                    let applicationStructure = result[0];
                    let nametoNamespace = applicationStructure.nameToNamespace;
                    let context = instance._returnContext(nametoNamespace);
                    resolveFunc(context);
                })
            }

            return annotatedCTX;
        }
    };

    _returnContext(nameToNamespace) {
        let context = null;

        for(let beanName in nameToNamespace) {
            if (nameToNamespace[beanName]._isContext) {
                context = nameToNamespace[beanName]._instance;
                break;
            }
        }

        return context
    }

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
        let dependencyBuilder = instance.dependencyBuilder;
        let contextBuilder = instance.contextBuilder;

        var searchInPath = parameters.scan;
        var excludes = parameters.excludes || [];
        var externalBeans = parameters.externalContext || null;

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
        });

        contextBuilder.on(global.phase._BUILD_FINISHED_, buildListener);

        var parsingPromises = [];
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

            let packageKeys = Object.keys(dependencyPackages);
            if (packageKeys.length > 0) {
                    packageCounter++;

                    /*
                     * Parse results
                     */
                    let resolveFunc = null;
                    let rejectFunc = null;
                    let parsingPromise = new Promise(function(resolve, reject){
                        resolveFunc = resolve;
                        rejectFunc = reject;
                    });

                    parsingPromises.push(parsingPromise);

                    contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                        // If externals are given
                        //if (externalContext) {
                        //    applicationStack = instance._.merge(applicationStack, externalContext);
                        //}

                        let contextPromise = contextBuilder.processApplicationStack(applicationStack);;
                        contextPromise.then(function(result){
                            resolveFunc(result);
                        })
                    });
                }
            }

        return parsingPromises;
        }


    cleanApplicationStructure(applicationStructure) {

        var instance = this;

        //console.log("==========================================");
        //console.log("CLEANUP");
        //console.log("==========================================");

        var nameToNamespace = applicationStructure["nameToNamespace"];

        console.log(applicationStructure);

        for (var beanName in nameToNamespace) {

            if (nameToNamespace[beanName].descriptor) {
                var annotationInformation = {

                    "annotationValue": nameToNamespace[beanName].descriptor.annotationValue,
                    "annotation": nameToNamespace[beanName].descriptor.annotation,
                    "parentBeanName": nameToNamespace[beanName].descriptor.parentBeanName
                };
            }

            nameToNamespace[beanName].descriptor = {};
            nameToNamespace[beanName].descriptor.annotationInformation = annotationInformation;
            //delete nameToNamespace[beanName].descriptor;

            nameToNamespace[beanName].resolve = null;
            delete nameToNamespace[beanName].resolve;

            nameToNamespace[beanName].reject = null;
            delete nameToNamespace[beanName].reject;

            nameToNamespace[beanName].annotationPromises = null;
            delete nameToNamespace[beanName].annotationPromises;

            nameToNamespace[beanName].loader = null;
            delete nameToNamespace[beanName].loader;

            if (nameToNamespace[beanName].structure) {
                nameToNamespace[beanName].structure.forEach(function (struct) {

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

        applicationStructure = nameToNamespace;
        return applicationStructure;

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
        let instance = this;

        instance.diagramTool(applicationStructure, true);

    };
    
}

module.exports = exports = new Factory();