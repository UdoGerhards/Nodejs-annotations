'use strict';

var fs = require("fs")
    , path = require("path")
    , XmlContextBuilderClass = require("./context/XMLContextBuilder")
    , LogManager = require("./logging/LogManager")
    , util = require('util');

/**
 * Foundation Class
 *
 * Initializes the parser context
 *
 * Created by udogerhards on 26.12.18.
 *
 * @constructor()
 */
class Foundation {

    constructor() {

        var instance = this;

        var workingDir = process.env.PWD;

        /* Logging */
        instance.logManager = LogManager;
        instance.logger = null;

        /* Moudle directory */
        instance._moduleDir = instance._matchPackageJsonDir(workingDir);

        /* Context building */
        instance._contextFile = null;
        instance._XMLContextBuilder = new XmlContextBuilderClass();

        /* Base context */
        instance.baseContext = null;
    }

    /**
     * Initializes the Foundation class
     */
    init(contextFilePath) {

        var instance = this;

        instance.logger = instance.logManager.getLogger(instance.constructor.name);

        var logger = instance.logger;

        logger.info("Initializing Foundation ... ");

        instance._XMLContextBuilder.init(instance._moduleDir, contextFilePath);
        instance._contextFile = path.join(instance._moduleDir, contextFilePath);
    }

    /**
     * Returns the base (initial) context.
     *
     * This method loads the context from the given xml file and returns it to the caller.
     *
     * @returns {*|PromiseLike<T | never>|Promise<T | never>}
     */
    getFullBaseContext() {
        var instance = this;
        var baseContext = instance._process();
        return baseContext.then(function(loadedContext){
            return loadedContext;
        });
    }

    /**
     * Returns the factory object from the base (initial) context.
     *
     * This method loads the context from the given xml file and returns the factory bean from it
     *
     * @returns {*|PromiseLike<T | never>|Promise<T | never>}
     */
    getFactory() {
        var instance = this;
        var baseContext = instance._process();
        return baseContext.then(function(loadedContext){
            return loadedContext['Factory'];
        });
    }

    /**
     * Processes the given xml base configuration file and loads the base (initial) root context
     *
     * @returns {*}
     * @private
     */
    _process() {
        var instance = this;
        var logger = instance.logger;

        logger.info("Parsing base xml context ... ");
        logger.trace("    Reading xml based context from '"+instance._contextFile+"' ...");

        return instance._XMLContextBuilder.process(instance._contextFile).then(function(context){

            logger.trace("    Received context: "+util.inspect(context, {depth: 0}));

            instance.baseContext = context;
            return context;
        });
    }

    /**
     * Matches the current module / lib directory based on the next package.json which can be found.
     *
     * @param workingDir
     * @returns {string}
     * @private
     */
    _matchPackageJsonDir(workingDir) {

        var instance = this;
        var logger = instance.logger;

        var pathSegements = workingDir.split("/");
        var searchPath = path.join(workingDir, "package.json");
        while(!fs.existsSync(searchPath)) {
            var tmpSegs = pathSegements.slice(0,pathSegements.length-1);
            searchPath = tmpSegs.join(path.sep)+path.sep+"package.json";
            pathSegements = tmpSegs;
        }

        var libPath = pathSegements.join(path.sep);

        return libPath;
    }
}

module.exports = exports = new Foundation();