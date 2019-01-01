'use strict';

var fs = require("fs")
    , path = require("path")
    , XmlContextBuilderClass = require("./context/XMLContextBuilder")
    , LogManager = require("./logging/LogManager");

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

        instance.logManager = LogManager;
        instance.logger = null;

        instance._moduleDir = instance._matchPackageJsonDir(workingDir);
        instance._contextFile = null;
        instance._XMLContextBuilder = new XmlContextBuilderClass();
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

    process() {
        var instance = this;
        var logger = instance.logger;

        logger.info("Parsing base xml context ... ");
        logger.trace("    Reading xml based context from '"+instance._contextFile+"' ...");


        return instance._XMLContextBuilder.process(instance._contextFile);
    }

    _matchPackageJsonDir(workingDir) {

        var instance = this;

        var pathSegements = workingDir.split("/");
        var searchPath = path.join(workingDir, "package.json");
        while(!fs.existsSync(searchPath)) {
            var tmpSegs = pathSegements.slice(0,pathSegements.length-1);
            searchPath = tmpSegs.join(path.sep)+path.sep+"package.json";
            pathSegements = tmpSegs;
        }

        return pathSegements.join(path.sep);
    }
}

module.exports = exports = new Foundation();