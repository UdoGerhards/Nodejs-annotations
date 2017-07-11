/**
 * http://usejsdoc.org/
 */
var util = require("util")
    , glob = require("glob")
    , _ = require("lodash")
    , structureParser = require("../parser/structure/StructureParser")
    , path = require("path")
    , dependencyBuilder = require("../dependency/DependencyBuilder.js")
    , contextBuilder = require("../context/ContextBuilder")
    , applicationConstants = require("../helper/constants.js")
    , Promise = require("bluebird")
    , ResourceAnnotation = require("../annotation/instance/Resource/ResourceAnnotationClass")
    , sizeof = require('object-sizeof');

const uuidV4 = require('uuid/v4');

/**
 *  Class Factory
 */
function Factory() {
    var instance = this;

    instance.modulePath = __dirname.replace(/lib\/factory/, "");
    instance.logger = null;
};

/**
 * Initialization
 * @param configuration
 */
Factory.prototype.init = function () {

    var instance = this;
    var logger = instance.logger;
    var modulePath = instance.modulePath;

    dependencyBuilder.logger = instance.logger;

    /*
     * Base annotation library
     */
    var coreAnnotationLib = modulePath+"/lib/annotation/";
    //var coreAnnotationLib = process.env.PWD + path.sep + "lib" + path.sep + "annotation" + path.sep;
    var annotations = {};

    var files = glob.sync(coreAnnotationLib + "**/*.js");
    files.forEach(function (file) {
        var annotation = require(file);
        annotations[annotation.name] = annotation;
    });

    logger.trace(annotations);

    /*
     * Token parser
     */
    var tokenParserPath = modulePath+"/lib/parser/member/";
   // var tokenParserPath = process.env.PWD + path.sep + "lib" + path.sep + "parser" + path.sep + "member" + path.sep;
    var tokenParserFiles = glob.sync(tokenParserPath + "**/*.js");
    var tokenParserList = {};

    tokenParserList = instance._initializeTokenParser(tokenParserFiles, tokenParserList, annotations);
    logger.trace(tokenParserList);

    /*
     * AnnotationParser
     */
    //var annotationParserPath = process.env.PWD + path.sep + "lib" + path.sep + "parser" + path.sep + "annotation" + path.sep;

    var annotationParserPath = modulePath+"/lib/parser/annotation/";
    var files = glob.sync(annotationParserPath + "**/*.js");
    var annotationParserList = instance._initializeAnnotationParser(files, tokenParserList);
    logger.trace(annotationParserList);

    /*
     * Structure parser
     */
    instance._initializeStructureParser(tokenParserList);

    /*
     * Context builder
     */
    instance._initializeContextBuilder(annotationParserList);
};

/**
 * Sub initializitation for token parsers
 * @param files
 * @param tokenParserList
 * @param annotations
 * @returns {{}}
 */
Factory.prototype._initializeTokenParser = function(files, tokenParserList, annotations) {
    var instance = this;
    var logger = instance.logger;
    var tokenParserList = {};

    files.forEach(function (file) {
        var TokenParserClass = require(file);

        var tokenParser = new TokenParserClass();

        tokenParser.annotations = annotations;
        tokenParser.expressionParser = tokenParserList;
        tokenParser.logger = logger;

        tokenParser.init();

        tokenParserList[TokenParserClass.name] = tokenParser;
    });

    return tokenParserList;
};

/**
 * Initialize all annotation parsers
 *
 * @param files
 * @returns {{}}
 */
Factory.prototype._initializeAnnotationParser = function(files, tokenParserList) {
    var instance = this;
    var logger  = instance.logger;
    var annotationParserList = {};

    files.forEach(function (file) {
        var AnnotationParser = require(file);
        var supports = AnnotationParser.SUPPORTS;
        if (supports && supports.length > 0) {
            supports.forEach(function (annotationName) {

                var annotationParser = new AnnotationParser();

                annotationParser.annotationParser = annotationParserList;
                annotationParser.tokenParser = tokenParserList;
                annotationParser.logger = logger;

                annotationParserList[annotationName] = annotationParser;
            });
        }
    });

    return annotationParserList;
};

/**
 * Sub initializiation method for structure parser
 */
Factory.prototype._initializeStructureParser = function(tokenParserList) {
    var instance = this;
    var logger = instance.logger;

    structureParser.removeTokens = ['BlockStatement', 'AssignmentExpression', 'Identifier', 'Literal', 'ClassBody', 'ClassExpression']
    structureParser.expressionParser = tokenParserList;
    structureParser.logger = logger;
    structureParser.init();

};

/**
 * Sub initialization method for ContextBuilder
 *
 * @param               Annotation parser list
 */
Factory.prototype._initializeContextBuilder = function(annotationParserList) {
    var instance = this;
    var logger = instance.logger;

    contextBuilder.annotationParser = annotationParserList;
    contextBuilder.logger = logger;

    // Order is important
    contextBuilder.stages = [
        global.stages._STASHING_,
        global.stages._INHERIT_,
        global.stages._INSTANTIATE_,
        global.stages._INJECT_,
        global.stages._INITIALIZE_,
        global.stages._RUN_,
        global.stages._FINISH_SETUP_
    ];

    contextBuilder.init();
};

/**
 * Parser context beans are served as external beans
 *
 * @private
 */
Factory.prototype._serveParserContext = function() {

    var instance = this;

    var parserContext = {
        AnnotationStructureParser: structureParser,
        AnnotationDependencyBuilder: dependencyBuilder,
        AnnotationContextBuilder: contextBuilder,
        AnnotationFactory: instance
    }

    return parserContext;
};

/**
 * Method fakes external objects as ressource beans
 *
 * @param externals
 * @returns {{}}
 * @private
 */
Factory.prototype._fakeExternalResources = function(externals) {

    var externalBeans = {};
    var firstIdentifier = null;

    if (externals) {
        for (var name in externals) {

            // Key namespace
            var identifier = uuidV4();

            // Fake key namespace
            firstIdentifier = firstIdentifier ? firstIdentifier : identifier;

            var externalBean = externals[name];

            // Add external objects as resources to the later available application context
            var externalResource = {
                namespace: identifier,
                _instance: externalBean,
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

Factory.prototype.bytesToSize = function(memObject, precision) {

    var precision = precision || 4;

    const unit = ['', 'K', 'M', 'G', 'T', 'P'];

    var formated = {}

    for (var name in memObject) {
        var input = memObject[name];

        if (unit >= unit.length) {
            return input + ' B';
        }

        var index = Math.floor(Math.log(input) / Math.log(1024));
        formated[name] = (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B'+' ('+input+')';
    }

    return formated;
}

/**
 * Main factory function. Will be called by "bootstrap"
 *
 * @param parameters                    The processing paramteters
 * @returns {Promise.<TResult>}         Parsing promise(s)
 */
Factory.prototype.process = function(parameters) {
    var instance = this;
    var logger = instance.logger;

    var additionalPlugins = parameters.additionalPlugins || null;

    logger.info("Scanning for plugins ... ");
    // Scan for plugins
    var pluginInitPromises = instance._scanForPlugins(additionalPlugins);
    if (pluginInitPromises) {

        return Promise.all(pluginInitPromises).then(function (results) {

            logger.info("Scanning application context ... ");
            // Parse context
            var applicationParsingPromise = instance._parseFiles(parameters);
            return Promise.all(applicationParsingPromise).then(function(application) {
                instance.printApplicationReport(application);

            });
        });

    } else {

        logger.info("Scanning application context ... ");
        // Parse context
        var applicationParsingPromise = instance._parseFiles(parameters);
        return Promise.all(applicationParsingPromise).then(function(application) {
            instance.printApplicationReport(application);
        });
    }
};

/**
 * Scans for parser plugins. This method takes an array of additional paths which will be scanned for additional plugins.
 *
 * @param additionalPlugins         The array with additional plugin paths
 * @private                         Parsing promise(s)
 */
Factory.prototype._scanForPlugins = function(additionalPlugins) {
    var instance = this;

    var pluginPath = [instance.modulePath+path.sep+"node_modules"+path.sep+"annotations"];

    var parserContext = instance._serveParserContext(); // Get all parsers, factory and contextbuilder as resource beans

    // Add external plugin directories
    var searchInPath = _.isArray(additionalPlugins)?pluginPath.concat(additionalPlugins):pluginPath;

    // Scan for annotation plugins
    var parameters = {
        "scan": searchInPath,
        "externalContext": parserContext
    }
    var parsingPromises = instance._parseFiles(parameters);

    return parsingPromises;
};

/**
 * Parser files and creates application context(s). Paths to search for files is defined in the given path array.
 *
 * @param {Array} searchInPath                  The defined paths to search in
 * @param {Array} additionalExcludes            Defined paths to be excluded
 * @param {Array} externals                     External objects served
 * @returns {Array}                             Array of parsing promises
 */
Factory.prototype._parseFiles = function (parameters) {

    var instance = this;
    var logger = instance.logger;

    var searchInPath = parameters.scan;
    var excludes = parameters.excludes || [];
    var externalBeans = parameters.externalContext || null;

    if (!_.isArray(searchInPath)) {
        searchInPath = [searchInPath];
    }

    // Process excludes path patterns
    var mainRoot = instance.modulePath+path.sep;

    excludes.push(mainRoot+"node_modules"+path.sep);
    excludes.push(mainRoot+"test"+path.sep);

    logger.info("... building dependencies ...");
    var scanGlobs = dependencyBuilder.buildStandardScanGlobs(searchInPath);


    // Process external beans
    var externalContext = instance._fakeExternalResources(externalBeans) || null;

    var parsePromises = [];

    var promiseResolver = null;
    var parsePromise = new Promise(function(resolve, reject){

        // Exit function for parsing
        contextBuilder.on(global.phase._BUILD_FINISHED_, function(applicationStack){

            logger.info("... Done!");
            resolve(applicationStack);
        });

        promiseResolver = function() {
            resolve(null);
        }
    });
    parsePromises.push(parsePromise);

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

            if (!_.isEmpty(dependencyPackages)) {

                /*
                 * Parse results
                 */
                contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                    // If externals are given
                    if (externalContext) {
                        applicationStack = _.merge(applicationStack, externalContext);
                    }

                    var processStack = [
                        applicationStack,
                        0
                    ];

                    contextBuilder.processApplicationStack(processStack);
                });

            } else {
                // resolve promise with empty result
                promiseResolver();
            }

        }

    return parsePromises;
};

Factory.prototype.printApplicationReport = function(application) {
    var instance = this;
    var logger = instance.logger;

    var appStructure = application[0].nameToNamespace;

    nameToNameSpace = appStructure.nameToNamespace;
    namespaceBeans = appStructure.beansWithNamespace

    for (var beanName in nameToNameSpace) {
        appStructure[beanName] = null;
        delete appStructure;
    }

    logger.info("=====================================================================================");
    logger.info("=========================== Application statistics, start ===========================");
    logger.info("");
    var beanTypes = {};
    var total = 0;
    for (var beanType in application[0].instanceTypes) {
        logger.info("    => "+util.inspect(beanType)+": "+util.inspect(application[0].instanceTypes[beanType].length));
        total += application[0].instanceTypes[beanType].length;
    }

    logger.info("");
    logger.info("Number total beans: "+util.inspect(total));

    /*
    logger.info("");
    logger.info("Beans with namespace:");
    logger.info("");
    for (var namespace in namespaceBeans) {
        logger.info(namspace+": "+nameToNameSpace[namespace]);
    }
    */

    logger.info("");
    var memory = instance.bytesToSize(process.memoryUsage());
    for (var name in memory) {
        logger.info("    => "+util.inspect(name)+": "+util.inspect(memory[name]));
    }

    logger.info("");
    logger.info("=========================== Application statistics, end ===========================");
    logger.info("=====================================================================================");
}




module.exports = exports = new Factory();