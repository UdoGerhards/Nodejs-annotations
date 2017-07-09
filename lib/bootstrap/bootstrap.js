/**
 * http://usejsdoc.org/
 */
var Factory = require("../factory/Factory.js")
    , log4js = require("log4js")
    , path = require("path")
    , util = require("util");

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
    Factory.init();
    
    var parameters = parameters || {"scan": [process.env.PWD]}; // Add member "additionalExcludes" and "plugins"
    var contextList = Factory.process(parameters);
};