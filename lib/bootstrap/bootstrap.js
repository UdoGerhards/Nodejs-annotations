/**
 * http://usejsdoc.org/
 */
var Foundation = require("../foundation/Foundation.js");

module.exports = exports = function (params) {
    let parameters = params;

    let libConfiguration = params.libConfiguration || "/lib/configuration/DIAnnotationsContext.xml";

    Foundation.init(libConfiguration);

    let libPromise = Foundation.getFactory();
    return libPromise.then(function(Factory){

        /*
         * Get additional information form params
         */
        let param = parameters;

        // Additional annotations
        if (param.annotationLibs && Array.isArray(param.annotationLibs)) {
            Factory.annotationLibs = Factory.annotationLibs.concat(param.annotationLib);
        } else if (param.annotationLibs) {
            Factory.annotationLibs.push(param.annotationLibs);
        }

        // Additional annotation parser
        if (param.annotationParserLibs && Array.isArray(param.annotationParserLibs)) {
            Factory.annotationParserLibs = Factory.annotationParserLibs.concat(param.annotationParserLibs);
        } else if (param.annotationParserLibs) {
            Factory.annotationParserLibs.push(param.annotationParserLibs);
        }

        // Additional token parser
        if (param.tokenParserLibs && Array.isArray(param.tokenParserLibs)) {
            Factory.tokenParserLibs = Factory.tokenParserLibs.concat(param.tokenParserLibs);
        } else if (param.tokenParserLibs) {
            Factory.tokenParserLibs.push(param.tokenParserLibs);
        }

        if (typeof param.projectLandScape !== "undefined") {
            Factory.on(global.phase._FINAL_APPLICATION_CONTEXT_, Factory._generateClassDiagramm);
        }

        //var params = params || {"scan": [process.env.PWD]}; // Add member "additionalExcludes" and "plugins"
        let context = Factory.process(params);
        return context;
    });
};