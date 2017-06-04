'use strict';

var structureParser = require("../parser/structure/StructureParser")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , Promise = require("bluebird");


class ContextBuilder {

    constructor() {
        var instance = this;

        instance.logger = null;
    }

    init() {
        var instance = this;
        var logger = instance.logger;
    }

    parseFileInformation(dependencyPackages) {

        var instance = this;
        var logger = instance.logger;

        for (var packageName in dependencyPackages) {
            var dependencyPackage = dependencyPackages[packageName];

            logger.info("\nProcessing dependencyPackages: '"+packageName+"':");

            var paths = dependencyPackage.paths;
            var buildBeanStructures = [];

            for (var index = 0; index < paths.length; index++) {
                try {
                    var path = paths[index];
                    if (_.endsWith(path, ".js")) {

                        logger.info("    - Parsing file: "+path);

                        /*
                         * Load the files async
                         */
                        var loadPromise = new Promise(function(resolve, reject) {
                                fs.readFile(path, 'utf8', function(error, data){
                                    if (!error) {
                                        var fileAsString = data.toString();
                                        logger.debug(fileAsString);
                                        resolve([
                                            path,
                                            fileAsString
                                        ]);
                                    } else {
                                        logger.error(error);
                                        reject(error);
                                    }
                                })
                        });

                        /*
                         * Build bean structure
                         */
                        loadPromise.then(function(fileInfo) {

                            var path = fileInfo[1];
                            var fileAsString = fileInfo[1];
                            var beanStructure = structureParser.parse(fileAsString);

                            return {
                                path: path,
                                beanStructure: beanStructure
                            }
                        });

                        buildBeanStructures.push(loadPromise);
                    }

                } catch(e) {
                    logger.error("Exception in parsing file: "+e);
                    throw e;
                }
            }
        }

        return Promise.all(buildBeanStructures).done(function(beanStructures){
            return beanStructures;
        });
    };
}

module.exports = exports = new ContextBuilder();