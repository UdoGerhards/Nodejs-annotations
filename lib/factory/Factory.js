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
    , applicationConstants = require("../helper/constants.js");

/**
 *  Logger
 */
function Factory() {
    var instance = this;

    instance.configuration = null;

    instance.rootPath = process.env.PWD;
    instance.modulePath = __dirname.replace(/lib\/factory/, "");

    instance.jsFileRegex = /\.js$/;

    instance.skipTestPaths = true;
    instance.skipNodeModules = true;

    instance.contexts = {};

    instance.logger = null;
}

Factory.prototype.init = function (configuration) {

    var instance = this;
    var logger = instance.logger;

    /*
     * Configuration
     */
    instance.configuration = configuration;


    /*
     * Base annotation library
     */
    var coreAnnotationLib = process.env.PWD + path.sep + "lib" + path.sep + "annotation" + path.sep;
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
    var tokenParserPath = process.env.PWD + path.sep + "lib" + path.sep + "parser" + path.sep + "member" + path.sep;
    var tokenParserList = {};

    var tokeParserFiles = glob.sync(tokenParserPath + "**/*.js");
    tokeParserFiles.forEach(function (file) {
        var TokenParserClass = require(file);

        var tokenParser = new TokenParserClass();

        tokenParser.annotations = annotations;
        tokenParser.expressionParser = tokenParserList;
        tokenParser.logger = logger;

        tokenParser.init();

        tokenParserList[TokenParserClass.name] = tokenParser;
    });

    logger.trace(tokenParserList);


    /*
     * AnnotationParser
     */
    var annotationParserPath = process.env.PWD + path.sep + "lib" + path.sep + "parser" + path.sep + "annotation" + path.sep;
    var annotationParserList = {};

    var files = glob.sync(annotationParserPath + "**/*.js");
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

    logger.trace(annotationParserList);


    /*
     * Structure parser
     */
    structureParser.removeTokens = ['BlockStatement', 'AssignmentExpression', 'Identifier', 'Literal', 'ClassBody', 'ClassExpression']
    structureParser.annotations = annotations;
    structureParser.expressionParser = tokenParserList;
    structureParser.annotationParser = annotationParserList;
    structureParser.logger = logger;

    structureParser.init();

    /*
     * Context builder
     */
    contextBuilder.annotations = annotations;
    contextBuilder.tokenParser = tokenParserList;
    contextBuilder.annotationParser = annotationParserList;
    contextBuilder.logger = logger;

    contextBuilder.init();


}

/**
 * Initializes a given context
 *
 * @param {object}
 */
Factory.prototype._parseFiles = function (searchInPath, additionalExcludes) {

    var instance = this;
    var allContexts = {};
    var additionalExcludes = additionalExcludes || null;

    if (!_.isArray(searchInPath)) {
        searchInPath = [searchInPath];
    }

    var scanGlobs = dependencyBuilder.buildStandardScanGlobs(searchInPath);

    for (var scanIndex = 0; scanIndex < scanGlobs.length; scanIndex++) {

        var glob = scanGlobs[scanIndex];
        var globPatterns = glob.searchIn;
        var excludes = glob.excludes;

        if (additionalExcludes) {
            excludes = excludes.concat(additionalExcludes);
        }

        /*
         * Load dependencies
         */
        var dependencyPackages = dependencyBuilder.loadDependencies(globPatterns, excludes);

        /*
         * Parse results
         */
        var parsingResults = contextBuilder._parseFileInformation(dependencyPackages);

        /*
         * Build context list
         */
        var contextList = contextBuilder._buildContext(parsingResults.dependencyPackages, parsingResults.beanAnnotationsGlobal);
        allContexts[contextList[0].beanQualifier] = contextList[0];
    }


    var allContexts = instance._processContextList(allContexts);
    return allContexts;
};

/**
 * Processe the results of parsing the given files which is represented by the context list.
 *
 * @param {Array}               The context list
 * @return {Array}              The processed context list with instantiated nodejs instances
 */
Factory.prototype._processContextList = function (contextList) {
    var instance = this;

    // Instantiate any bean in the context
    for (var contextName in contextList) {
        var currentContext = contextList[contextName];
        var beanAnnotations = currentContext.beanAnnotations;

        // Staging
        logger.info("Stashing ... ");
        contextBuilder._stage(beanAnnotations, currentContext, contextList, null);
        logger.info("\n");

        // Inheritance
        contextBuilder._inherit(currentContext.inheritanceAnnotations, currentContext, contextList, null);
        logger.info("\n");

        // Instantiate
        logger.info("Instantiating ... ");
        contextBuilder._instantiate(beanAnnotations, currentContext, contextList, null);
        logger.info("\n");

        // Init beans
        logger.info("Finishing bean setup ...");
        contextBuilder._finishBeanSetup(beanAnnotations, currentContext, contextList, null);
        logger.info("\n");

        // Injecting
        logger.info("Injecting ... ");
        contextBuilder._inject(beanAnnotations, currentContext, contextList, null);
        logger.info("\n");

        // Initialize
        logger.info("Initializing ...");

        contextBuilder._initialize(beanAnnotations, currentContext, contextList, null);
        logger.info("\n");
    }

    // Run
    logger.info("Running ...");
    var contextName = _.keys(contextList)[0];
    contextBuilder._runContext(beanAnnotations, contextList[contextName], contextList, null);

    return contextList;

};


module.exports = exports = new Factory();