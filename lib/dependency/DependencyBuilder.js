'use strict';

class DependencyBuilder {

    constructor(){

        var instance = this;

        /* Logging */
        instance.LogManager = null;
        instance.logger = null;

        /* External resources */
        instance.glob = null;
        instance._ = null;
        instance.toposort = null;
        instance.util = null;
        instance.path = null;
    }

    init() {

        var instance = this;
        instance.logger = instance.LogManager.getLogger(instance);

        instance.logger.info("DependencyBuilder initialized ... ");
    }

    _reportModuleOrder(groupedDependencyPackages) {
        var instance = this;
        var logger = instance.logger;
        var util = instance.util;

        logger.debug("---------------- Parsing order - modules, start ----------------");
        for (var module in groupedDependencyPackages) {
            var nodePackage = groupedDependencyPackages[module];
            logger.debug("    => "+module);
            if (nodePackage.paths && nodePackage.paths.length > 0) {
                for (var index = 0 ; index < nodePackage.paths.length ; index++) {
                    logger.debug("      " + util.inspect(nodePackage.paths[index]));
                }
            }
        }
        logger.debug("---------------- Parsing order - modules, end ----------------");

    }

    /**
     * Builds the list of module dependencies for the given glob patterns
     *
     * @param {Array}           Array of globs to search in
     * @returns                 The module list with all dependencies, sorted by dependencies
     */
    loadDependencies(globPatterns, excludes) {
        var instance = this;
        var _ = instance._;

        var files = instance.processGlobPatterns(globPatterns, excludes);
        var jsonFiles = instance.filterJsonFiles(files);
        var nodePackageJsons = instance.filterPackageJsonFiles(jsonFiles);

        // Extract .json files from files to be parsed since esprima cannot parse them
        var filesToParse = _.difference(files, jsonFiles);

        var dependencyPackages = instance.getPackageJsonDependencies(nodePackageJsons);
        var sortedDependencyPackages = instance.sortModuleDependencies(dependencyPackages);
        var cleanedDependencyPackages = instance.cleanDependencies(sortedDependencyPackages);
        var groupedDependencyPackages = instance.groupFilePaths(cleanedDependencyPackages, filesToParse);

        // Report module order
        instance._reportModuleOrder(groupedDependencyPackages);

        return  groupedDependencyPackages;
    }

    /**
     * Processes the given path globs and returns the according files in the found directories
     *
     * @param {Array}               The array of directory globs to search in
     * @return {Array}              The array of found files
     */

    processGlobPatterns(globPatterns, excludes) {
        var instance = this;
        var glob = instance.glob;

        var files = [];

        var options = {
            ignore: excludes || []
        }

        for (var index = 0; index < globPatterns.length; index++) {
            var globPatternFiles = glob.sync(globPatterns[index], options);
            files = files.concat(globPatternFiles);
        }

        files = files.filter(function(path) {

            var res = true;

            for (var index = 0; index < excludes.length; index++) {
                res = (path.indexOf(excludes[index]) < 0) && res;
            }

            return res;
        });

        return files;
    }

    /**
     * Gets the according configuration files from found file paths
     *
     * @param {array}
     * @return {array}
     */
    filterJsonFiles(foundFiles) {
        var instance = this;
        var _ = instance._;

        var jsonFiles = foundFiles.filter(function(value){

            //return _.endsWith(value, ".json");

            return value.endsWith(".json");
        });

        return jsonFiles;

    }


    /**
     * Extracts nodePackage.json files from configruation files in order to detect according modules
     *
     * @param foundFiles
     * @returns
     */
    filterPackageJsonFiles(foundFiles) {
        var instance = this;
        var _ = instance._;

        var nodePackagesJsons = foundFiles.filter(function(value){
            //return _.endsWith(value, "nodePackage.json");
            return value.endsWith("package.json");
        });

        return nodePackagesJsons;
    }

    /**
     * Creates snall nodePackage information with module name, dependencies and root path for found modules
     *
     * @param nodePackageJsons
     * @returns
     */
    getPackageJsonDependencies(nodePackageJsons) {
        var instance = this;
        var _ = instance._;
        var path = instance.path;

        var nodePackages = {};
        for (var index = 0 ; index < nodePackageJsons.length; index++) {
            var filePath = nodePackageJsons[index];
            var nodePackageJson = require(filePath);
            //var dependencies = _.keysIn(nodePackageJson.dependencies) || [];
            var dependencies = Object.keys(nodePackageJson.dependencies) || [];
            //dependencies = dependencies.concat(_.keysIn(nodePackageJson.peerDependencies) || []);
            var modulePath = filePath.replace("package.json", "");
            var nodePackageObject = {
                "config": filePath,
                "path": modulePath,
                "test": modulePath+"test"+path.sep,
                "name": nodePackageJson.name,
                "dependencies": dependencies
            };
            nodePackages[nodePackageObject.name] = nodePackageObject;
        }

        return nodePackages;
    }

    /**
     * Cleans and removes unused nodePackages
     *
     * @param dependencyPackages
     * @returns {___anonymous4907_4908}
     */
    cleanDependencies(dependencyPackages) {
        var instance = this;

        var cleanedDependencyPackages = {};
        for (var nodePackageName in dependencyPackages) {
            var module = dependencyPackages[nodePackageName];
            if (module) {
                cleanedDependencyPackages[nodePackageName] = module;
            }
        }

        return cleanedDependencyPackages;
    }

    /**
     * Sorts given module paths by the module dependencies
     *
     * @param {object}
     * @return {object}
     */
    sortModuleDependencies(nodePackageDependencies) {
        var instance = this;
        var _ = instance._;
        var Toposort = instance.toposort;

        var sortedDependencies = {};

        var topoSort = new Toposort();
        //var keys = _.keys(nodePackageDependencies);

        var keys = Object.keys(nodePackageDependencies);
        if (keys.length > 1) {
            for (var nodePackageName in nodePackageDependencies) {
                var pckge = nodePackageDependencies[nodePackageName];
                topoSort.add(nodePackageName, pckge.dependencies);
            }

            var sorted = topoSort.sort().reverse();
            for (var index = 0; index < sorted.length; index++) {
                var name = sorted[index];
                sortedDependencies[name] = nodePackageDependencies[name];
            }
        } else {
            sortedDependencies = nodePackageDependencies;
        }

        return sortedDependencies;
    }

    /**
     * Groups the found paths to the according module nodePackage.
     * The method tries to find the according borders of a module
     *
     * @param dependencyPackages
     * @param filePaths
     * @returns
     */

    groupFilePaths(dependencyPackages, filePaths) {
        var instance = this;

        var depPackagePaths = [];
        for (var depName in dependencyPackages) {
            var depPackage = dependencyPackages[depName];
            depPackagePaths.push(depPackage.path);
        }

        // sort array by the length of their contained strings
        depPackagePaths.sort(function(a, b) {
            return a.length - b.length || // sort by length, if equal then
                a.localeCompare(b);    // sort by dictionary order
        }).reverse();

        filePaths.sort(function(a, b) {
            return a.length - b.length || // sort by length, if equal then
                a.localeCompare(b);    // sort by dictionary order
        }).reverse();


        // Group paths
        var modulePaths = [];
        for (var index = 0; index < depPackagePaths.length; index++) {
            var tmpFilePaths = filePaths.slice(0);
            var filePathIndex = 0;
            var modulePath = {
                "modulePath": depPackagePaths[index],
                "paths": []
            };

            var testPath = null;

            var filePathIndex = tmpFilePaths.length-1; // Important, start from last element otherwise later on "filePaths.splice(filePathIndex,1);" will not work
            while(filePathIndex > -1) {
                if (tmpFilePaths[filePathIndex].indexOf(depPackagePaths[index]) === 0) {
                    modulePath.paths.push(tmpFilePaths[filePathIndex]);
                    filePaths.splice(filePathIndex,1);
                }
                filePathIndex--;
            }

            modulePaths.push(modulePath);
        }

        // Add paths to nodePackages
        for (var depPackageName in dependencyPackages) {
            var nodePackagePath = dependencyPackages[depPackageName].path;
            var tmpModulePaths = modulePaths;
            var index = tmpModulePaths.length-1;
            var found = false;
            while(index > -1 && !found) {
                if ( nodePackagePath === tmpModulePaths[index].modulePath) {
                    dependencyPackages[depPackageName].paths = tmpModulePaths[index].paths;
                    modulePaths.splice(index,1);
                    found = true;
                }
                index--;
            }
        }

        return dependencyPackages;
    }

    buildStandardScanGlobs(globs) {
        var instance = this;
        var scanGlobs = [];
        var logger = instance.logger;
        var util = instance.util;
        var path = instance.path;


        for (var index = 0; index < globs.length; index++) {
            var glob = globs[index];
            logger.info("    => main path: "+util.inspect(glob));

            var cleaned = null;
            if (glob.indexOf("*") > -1) {
                cleaned = glob.substring(0,glob.indexOf("*"));
            } else {
                cleaned = glob;
            }

            var mainRoot = cleaned.replace(/\/$/,"")+path.sep;
            var scanGlob = [mainRoot+"**/**"+path.sep+"*.js*"];

            var scan = {
                searchIn: scanGlob,
                main: mainRoot
            };

            scanGlobs.push(scan);
        }

        return scanGlobs;
    }
    
}







module.exports = exports = new DependencyBuilder();