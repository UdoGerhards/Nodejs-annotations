/**
 * http://usejsdoc.org/
 */
var util = require("util")
    , glob = require("glob")
    , _ = require("lodash")
    , BaseAnnotation = require("../annotation/implementation/base/Base.js")
    , BaseProcessor = require("../annotation/parser/base/BaseProcessor.js")
    , structureParser = require("../parser/structure/StructureParser")
    , path = require("path")
    , dependencyBuilder = require("../dependency/DependencyBuilder.js");

/**
 *  Logger
 */
function Factory() {
    var instance = this;
    
    instance.configuration = null;
    
    instance.registry = new Registry();
    
    instance.rootPath = process.env.PWD;
    instance.modulePath = __dirname.replace(/lib\/factory/,"");
    
    instance.jsFileRegex = /\.js$/;
    
    instance.skipTestPaths = true;
    instance.skipNodeModules = true;
    
    instance.contexts = {}; 
    
    // Mandatory for included annotations
    
    /*
     * Setup the annotation parser
     */
    instance.structureParser= structureParser;
}

Factory.prototype.init = function(configuration) {
    var instance = this;
    
    instance.configuration = configuration;
    
    var modulePath = instance.modulePath+"lib"+path.sep;
    var baseAnnotationsLib = modulePath+"annotation"+path.sep+"**"+path.sep+"*.js";
    
    instance.setAnnotationLib(baseAnnotationsLib);
    instance.annotationParser.init();
    
    contextBuilder.setAnnotationParser(instance.annotationParser);
    
    // Scans for plugins
    logger.setLevel("INfO")
    logger.info("Initializing nodejs annotation system ...");
    instance.annotationParser.init();
    logger.info("... finished ...!");
}

/**
 * Initializes a given context
 * 
 * @param {object}
 */
Factory.prototype._parseFiles = function(searchInPath, additionalExcludes) {
    
    var instance = this;
    var plugins = _.keys(instance.registry.entries);
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
    
    /*
     * Process the found context(s)
     */
    for (var index = 0 ; index < plugins.length; index++) {
        var pluginName = plugins[index];
        var plugin = instance.registry.entries[pluginName];
        if (plugin.nodeInstance) {
            allContexts = plugin.nodeInstance._buildContext(allContexts, parsingResults.dependencyPackages);
        }
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
Factory.prototype._processContextList = function(contextList) {
    var instance = this;
    
    var plugins = _.keys(instance.registry.entries);
    
    // Instantiate any bean in the context
    for (var contextName in contextList) {
        var currentContext = contextList[contextName];
        var beanAnnotations = currentContext.beanAnnotations;
        
        // Staging
        logger.info("Stashing ... ");
        contextBuilder._stage(beanAnnotations, currentContext, contextList, null);
        for (var index = 0 ; index < plugins.length; index++) {
            var pluginName = plugins[index];
            var plugin = instance.registry.entries[pluginName];
            if (plugin.nodeInstance) {
                plugin.nodeInstance._stage(beanAnnotations, currentContext, contextList, null);
            }
        }
        logger.info("\n");
        
        // Inheritance
        contextBuilder._inherit(currentContext.inheritanceAnnotations, currentContext, contextList, null);
        for (var index = 0 ; index < plugins.length; index++) {
            var pluginName = plugins[index];
            var plugin = instance.registry.entries[pluginName];
            if (plugin.nodeInstance) {
                plugin.nodeInstance._inherit(beanAnnotations, currentContext, contextList, null);
            }
        }
        logger.info("\n");        
        
        // Instantiate
        logger.info("Instantiating ... ");
        contextBuilder._instantiate(beanAnnotations, currentContext, contextList, null);
        for (var index = 0 ; index < plugins.length; index++) {
            var pluginName = plugins[index];
            var plugin = instance.registry.entries[pluginName];
            if (plugin.nodeInstance) {
                plugin.nodeInstance._instantiate(beanAnnotations, currentContext, contextList, null);
            }
        }
        logger.info("\n");
        
        // Init beans
        logger.info("Finishing bean setup ...");
        contextBuilder._finishBeanSetup(beanAnnotations, currentContext, contextList, null);
        for (var index = 0 ; index < plugins.length; index++) {
            var pluginName = plugins[index];
            var plugin = instance.registry.entries[pluginName];
            if (plugin.nodeInstance) {
                plugin.nodeInstance._finishBeanSetup(beanAnnotations, currentContext, contextList, null);
            }
        }
        logger.info("\n"); 
        
        // Injecting
        logger.info("Injecting ... ");
        for (var index = 0 ; index < plugins.length; index++) {
            var pluginName = plugins[index];
            var plugin = instance.registry.entries[pluginName];
            if (plugin.nodeInstance) {
                plugin.nodeInstance._instantiate(beanAnnotations, currentContext, contextList, null);
            }
        }
        contextBuilder._inject(beanAnnotations, currentContext, contextList, null);
        logger.info("\n");       
        
        // Initialize
        logger.info("Initializing ...");
        for (var index = 0 ; index < plugins.length; index++) {
            var pluginName = plugins[index];
            var plugin = instance.registry.entries[pluginName];
            if (plugin.nodeInstance) {
                plugin.nodeInstance._initialize(beanAnnotations, currentContext, contextList, null);
            }
        }
        
        
        contextBuilder._initialize(beanAnnotations, currentContext, contextList, null);
        logger.info("\n");
    }
    
    // Run
    logger.info("Running ...");
    var contextName = _.keys(contextList)[0];
    contextBuilder._runContext(beanAnnotations, contextList[contextName], contextList, null);
    
    return contextList;
    
};

/**
 * Scans for given annotation libs and sets the found annotation files in the internal parser in order to detect annotations
 * in the files to be parsed.
 * 
 * If plugins where registered before the according libs will also be set in the parser.
 */
Factory.prototype.scanAnnotationLibs = function() {
    var instance = this;
    
    // Mandatory for included annotations
    var modulePath = instance.modulePath+"lib"+path.sep;
    var baseAnnotationsLib = modulePath+"annotation"+path.sep+"**"+path.sep+"*.js";
    
    instance.setAnnotationLib(baseAnnotationsLib);
    
    for (var index = 0; index < instance.registry.entries.length; index++) {
        var registryEntry = instance.registry.entries[index];
        var annotationLib = registryEntry.annotationLibs;
        instance.setAnnotationLib(annotationLib);
    }
};

/**
 * Loads given annotation libs and according parsers, given by configuration
 * 
 * @param           The path to the annotation lib
 */
Factory.prototype.setAnnotationLib = function(annotationLibPath) { 
   var instance = this;
   
   var annotationLib = glob.sync(annotationLibPath);
   
   for (var clazzIndex = 0; clazzIndex < annotationLib.length; clazzIndex++) {
        var clazzFile = annotationLib[clazzIndex];
        
        var AnnotationClazz = require(clazzFile);
        
        /*
         * Annotations
         */
        if (AnnotationClazz.prototype instanceof BaseAnnotation ) {
            instance.annotationParser.annotationPrototypes[AnnotationClazz.name] = AnnotationClazz;
        } 
        
        if ( AnnotationClazz instanceof BaseProcessor ) {
            instance.annotationParser.annotationProcessors[AnnotationClazz.constructor.name] = AnnotationClazz;
        }
    }
};



Factory.prototype._sortDependencies = function(dependencies) {
        var nodes = {};
        var nodeCount = 0;
        var ready = [];
        var output = [];

        // build the graph
        function add(element) {
            nodeCount++;
            nodes[element] = {
                needs : [],
                neededBy : [],
                name : element
            };
            if (dependencies[element]) {
                dependencies[element].forEach(function(dependency) {
                    if (!nodes[dependency])
                        add(dependency);
                    nodes[element].needs.push(nodes[dependency]);
                    nodes[dependency].neededBy.push(nodes[element]);
                });
            }
            if (!nodes[element].needs.length)
                ready.push(nodes[element]);
        }

        for (element in dependencies) {
            if (!nodes[element])
                add(element);
        }

        // sort the graph
        while (ready.length) {
            var dependency = ready.pop();
            output.push(dependency.name);
            dependency.neededBy.forEach(function(element) {
                element.needs = element.needs.filter(function(x) {
                    return x != dependency
                })
                if (!element.needs.length)
                    ready.push(element)
            })
        }

        // error-check
        if (output.length != nodeCount) {
            throw "circular dependency detected"
        }

        return output;
    };

module.exports = exports = new Factory();