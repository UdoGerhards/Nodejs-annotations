/**
 * http://usejsdoc.org/
 */
var Foundation = require("../foundation/Foundation.js");

module.exports = exports = function (parameters,  loglevel, logfile) {
    var instance = this;

    Foundation.init("/lib/foundation/configuration/xmlContext.xml");
    var libPromise = Foundation.getFactory();

    return libPromise.then(function(Factory){

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

        if (typeof parameters.projectLandScape !== "undefined") {
            Factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, Factory._generateClassDiagramm);
        }

        Factory.init();

        var parameters = parameters || {"scan": [process.env.PWD]}; // Add member "additionalExcludes" and "plugins"
        var context = Factory.process(parameters);

        return context;
    });
};