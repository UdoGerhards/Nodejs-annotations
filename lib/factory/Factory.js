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
 *  Class Factory
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
    var tokenParserFiles = glob.sync(tokenParserPath + "**/*.js");
    var tokenParserList = {};

    tokenParserList = instance.initializeTokenParser(tokenParserFiles, tokenParserList, annotations);
    logger.trace(tokenParserList);


    /*
     * AnnotationParser
     */
    var annotationParserPath = process.env.PWD + path.sep + "lib" + path.sep + "parser" + path.sep + "annotation" + path.sep;
    var annotationParserList = {};

    var files = glob.sync(annotationParserPath + "**/*.js");
    annotationParserList = instance.initializeAnnotationParser(files, tokenParserList);
    logger.trace(annotationParserList);


    /*
     * Structure parser
     */
    instance.initializeStructureParser(tokenParserList);

    /*
     * Context builder
     */
    instance.initializeContextBuilder(annotationParserList);


}

/**
 * Sub initializitation for token parsers
 * @param files
 * @param tokenParserList
 * @param annotations
 * @returns {{}}
 */
Factory.prototype.initializeTokenParser = function(files, tokenParserList, annotations) {
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

}

/**
 * Initialize all annotation parsers
 *
 * @param files
 * @returns {{}}
 */
Factory.prototype.initializeAnnotationParser = function(files, tokenParserList) {
    var instance = this;
    var logger  = instance.logger;
    var annotationParserList = {

    };

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

}

/**
 * Sub initializiation method for structure parser
 */
Factory.prototype.initializeStructureParser = function(tokenParserList) {
    var instance = this;
    var logger = instance.logger;

    structureParser.removeTokens = ['BlockStatement', 'AssignmentExpression', 'Identifier', 'Literal', 'ClassBody', 'ClassExpression']
    structureParser.expressionParser = tokenParserList;
    structureParser.logger = logger;
    structureParser.init();

}

/**
 * Sub initialization method for ContextBuilder
 *
 * @param               Annotation parser list
 */
Factory.prototype.initializeContextBuilder = function(annotationParserList) {
    var instance = this;
    var logger = instance.logger;

    contextBuilder.annotationParser = annotationParserList;
    contextBuilder.logger = logger;
    contextBuilder.stages = _.keys(global.stages);
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
    var excludes = additionalExcludes || [];

    if (!_.isArray(searchInPath)) {
        searchInPath = [searchInPath];
    }

    // Process excludes
    var mainRoot = instance.modulePath+path.sep;

    excludes.push(mainRoot+"node_modules"+path.sep);
    excludes.push(mainRoot+"test"+path.sep);

    var scanGlobs = dependencyBuilder.buildStandardScanGlobs(searchInPath);

    for (var scanIndex = 0; scanIndex < scanGlobs.length; scanIndex++) {

        /*
         * Prepare scan
         */
        var scan = scan.searchIn;
        var scanExcludes = excludes;

        /*
         * Exclude test-folder
         */
        var testExclude = scan.main+"test"+path.sep;
        scanExcludes.push(testExclude);

        /*
         * Load dependencies
         */
        var dependencyPackages = dependencyBuilder.loadDependencies(scan, scanExcludes);

        /*
         * Parse results
         */
        return contextBuilder.parseFileInformation(dependencyPackages).then(function(applicationStack) {

            var processStack = [
                applicationStack,
                0
            ];

            contextBuilder.processApplicationStack(processStack);
        });
    }


    var allContexts = instance._processContextList(allContexts);
    return allContexts;
};


module.exports = exports = new Factory();