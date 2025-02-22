import fs from 'fs';
import path from 'path';
import FoundationXMLParserClass from "./context/parser/xml/FoundationXMLParser.js";
import LogManager from "../logging/LogManager.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/**
 * Foundation Class
 *
 * Initializes the parser context
 *
 * Created by udogerhards on 26.12.18.
 *
 * @constructor()
 */
class  Foundation{

    constructor() {

        var instance = this;

        //var workingDir = process.env.PWD;

        let workingDir = __dirname.replace('lib/foundation', "");

        /* Logging */
        instance.logManager = LogManager;
        instance.logger = null;

        /* Module directory */
        instance._moduleDir = instance._matchPackageJsonDir(workingDir);

        /* Context building */
        instance._contextFile = null;
        instance._FoundationXMLParser = new FoundationXMLParserClass();

        /* Base context */
        instance.baseContext = null;
    }

    /**
     * Initializes the Foundation class
    init(contextFilePath) {

        var instance = this;

        var logger = instance.logger;

        instance._FoundationXMLParser.init(instance._moduleDir, contextFilePath);
        instance._contextFile = path.join(instance._moduleDir, contextFilePath);
    } */

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
        return baseContext.then(function (loadedContext) {
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

        console.log();
        console.log("***********************************************************************************");
        console.log("*                                                                                 *");
        console.log("*  DI-Annotations                                                                 *");
        console.log("*                                                                                 *");
        console.log("*  Library for dependency injection in nodejs                                     *");
        console.log("***********************************************************************************");
        console.log();

        var baseContext = instance._process();
        return baseContext.then(function (loadedContext) {
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

        //logger.info("Parsing base xml context ... ");
        //logger.trace("    Reading xml based context from '"+instance._contextFile+"' ...");

        return instance._FoundationXMLParser.process(instance._contextFile).then(function (context) {

            //logger.trace("    Received context: "+util.inspect(context, {depth: 0}));

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
        while (!fs.existsSync(searchPath)) {
            var tmpSegs = pathSegements.slice(0, pathSegements.length - 1);
            searchPath = tmpSegs.join(path.sep) + path.sep + "package.json";
            pathSegements = tmpSegs;
        }

        var libPath = pathSegements.join(path.sep);

        return libPath;
    }
};

let FoundationBase = new Foundation();

export function init(contextFilePath) {

    var instance = FoundationBase;

    var logger = instance.logger;

    instance._FoundationXMLParser.init(instance._moduleDir, contextFilePath);
    instance._contextFile = path.join(instance._moduleDir, contextFilePath);
};

export function getFactory() {
    var instance = FoundationBase;

    console.log();
    console.log("***********************************************************************************");
    console.log("*                                                                                 *");
    console.log("*  DI-Annotations                                                                 *");
    console.log("*                                                                                 *");
    console.log("*  Library for dependency injection in nodejs                                     *");
    console.log("***********************************************************************************");
    console.log();

    var baseContext = instance._process();
    return baseContext.then(function (loadedContext) {
        return loadedContext['Factory'];
    });
};