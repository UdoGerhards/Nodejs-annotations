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
    , DummyAnnotation = require("../annotation/instance/Dummy/DummyAnnotationClass");

const uuidV4 = require('uuid/v4');

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

    var files = glob.sync(annotationParserPath + "**/*.js");
    var annotationParserList = instance.initializeAnnotationParser(files, tokenParserList);
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

Factory.prototype._prepareBeans = function() {

    var instance = this;

    var selfContext =  {};

    var identifier = uuidV4();


    var structureParserBean = {
        structure: null,
        namespace: identifier,
        _instance: structureParser,
        descriptor: {
            annotation: DummyAnnotation,
            annotationValue: "(\"StructureParser\")"
        }
    };
    selfContext[structureParserBean.namespace] = structureParserBean;

    identifier = uuidV4();
    var dependencyBuilderBean = {
        structure: null,
        namespace: identifier,
        _instance: dependencyBuilder,
        descriptor: {
            annotation: DummyAnnotation,
            annotationValue: "(\"DependencyBuilder\")"
        }
    };
    selfContext[dependencyBuilderBean.namespace] = dependencyBuilderBean;

    identifier = uuidV4();
    var contextBuilderBean = {
        structure: null,
        namespace: identifier,
        _instance: contextBuilder,
        descriptor: {
            annotation: DummyAnnotation,
            annotationValue: "(\"ContextBuilder\")"
        }
    };
    selfContext[contextBuilderBean.namespace] = contextBuilderBean;

    identifier = uuidV4();
    var factoryBean = {
        structure: null,
        namespace: identifier,
        _instance: instance,
        descriptor: {
            annotation: DummyAnnotation,
            annotationValue: "(\"FactoryBean\")"
        }
    };
    selfContext[factoryBean.namespace] = factoryBean;

    var parserStructur = {};
    parserStructur[factoryBean.namespace] = selfContext;

    return parserStructur;
}

Factory.prototype._scanForPlugins = function() {
    var instance = this;
    var path = instance.path;
    var pluginPath = instance.modulePath+path.sep+"node_modules"+path.sep+"annotations";
    var addBeans = instance._prepareBeans(); // Get all parsers, factory and contextbuilder as normal beans

    // Scan for annotation plugins
    instance._parseFiles(pluginPath, null,  addBeans);
}

/**
 * Initializes a given context
 *
 * @param {object}
 */
Factory.prototype._parseFiles = function (searchInPath, additionalExcludes, externals) {

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

    var parsePromises = [];
    var parsePromise = new Promise(function(resolve, reject){

        contextBuilder.on(global.phase._BUILD_FINISHED_, function(applicationStack){
            resolve(applicationStack);
        });

    });
    parsePromises.push(parsePromise);

    for (var scanIndex = 0; scanIndex < scanGlobs.length; scanIndex++) {

        /*
         * Prepare scan
         */
        var scan = scanGlobs[scanIndex];
        var scan = scan.searchIn;
        var scanExcludes = excludes;

        /*
         * Load dependencies
         */
        var dependencyPackages = dependencyBuilder.loadDependencies(scan, scanExcludes);

        /*
         * Parse results
         */
        contextBuilder.parseFileInformation(dependencyPackages).then(function(applicationStack) {

            // If externals are given
            if (externals) {
                applicationStack = _.merge(applicationStack, externals);
            }

            var processStack = [
                applicationStack,
                0
            ];

            contextBuilder.processApplicationStack(processStack);
        });
    }

    return parsePromises;
};


module.exports = exports = new Factory();