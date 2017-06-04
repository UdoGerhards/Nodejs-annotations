/**
 * http://usejsdoc.org/
 */
var Factory = require("../factory/Factory.js")
    , log4js = require("log4js")
    , path = require("path")
    , util = require("util");

module.exports = exports = function (parameters, additionalExcludes,  loglevel, logfile) {
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
    
    global.logger = logger
    
    var parameters = parameters || {"scan": [process.env.PWD]};
   
    Factory.init(parameters);
    var contextList = Factory._parseFiles(parameters.scan, additionalExcludes);
};