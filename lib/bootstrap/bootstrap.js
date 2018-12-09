/**
 * http://usejsdoc.org/
 */
var Factory = require("../factory/Factory.js")
    , log4js = require("log4js")
    , path = require("path")
    , util = require("util")
    , jsonexport = require("jsonexport")
    , EventEmitter = require("events");

module.exports = exports = function (parameters,  loglevel, logfile) {
    var instance = this;
    
    var loglevel = loglevel || "info";
    var logfile = logfile || null;
    
    var appenders = [];
    appenders.push({type: 'console', category: 'nodejs-annotations'});
    
    if (logfile) {
        appenders.push({ type: 'file', filename: logfile, category: 'nodejs-annotations' })
    }
    
    log4js.configure({
        appenders: appenders
    });
    
    var logger = log4js.getLogger('nodejs-annotations');
    logger.setLevel(loglevel);

    Factory.logger = logger;

    /*
     * Get additional information form params
     */

    // Additional annotations
    if (parameters.annotationLibs && Array.isArray(parameters.annotationLibs)) {
        Factory.annotationLibs = Factory.annotationLibs.concat(parameters.annotationLib);
    } else if (parameters.annotationLibs) {
        Factory.annotationLibs.push(parameters.annotationLibs);
    }

    // Additional annotation parser
    if (parameters.annotationParserLibs && Array.isArray(parameters.annotationParserLibs)) {
        Factory.annotationParserLibs = Factory.annotationParserLibs.concat(parameters.annotationParserLibs);
    } else if (parameters.annotationParserLibs) {
        Factory.annotationParserLibs.push(parameters.annotationParserLibs);
    }

    // Additional token parser
    if (parameters.tokenParserLibs && Array.isArray(parameters.tokenParserLibs)) {
        Factory.tokenParserLibs = Factory.tokenParserLibs.concat(parameters.tokenParserLibs);
    } else if (parameters.tokenParserLibs) {
        Factory.tokenParserLibs.push(parameters.tokenParserLibs);
    }

    console.log(parameters);

    if (parameters.createProjectLandscape) {
        Factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, Factory._generateClassDiagramm);
    }

    Factory.init();
    
    var parameters = parameters || {"scan": [process.env.PWD]}; // Add member "additionalExcludes" and "plugins"
    var context = Factory.process(parameters);
    return context;
};