var util = require("util")
    , glob = require("glob")
    , _ = require("lodash")
    , Toposort = require("toposort-class")
    , path = require("path")

function DependencyBuilder() {
    var instance = this;
    
    instance.skipTests = true;
    instance.skipNodeModules = true;
}

/**
 * Builds the list of module dependencies for the given glob patterns
 * 
 * @param {Array}           Array of globs to search in 
 * @returns                 The module list with all dependencies, sorted by dependencies
 */
DependencyBuilder.prototype.loadDependencies = function(globPatterns, excludes) {
    var instance = this;
    
    var files = instance.processGlobPatterns(globPatterns, excludes);
    var jsonFiles = instance.filterJsonFiles(files);
    var packageJsons = instance.filterPackageJsonFiles(jsonFiles);
    var dependencyPackages = instance.getPackageJsonDependencies(packageJsons);
    var sortedDependencyPackages = instance.sortModuleDependencies(dependencyPackages);
    var cleanedDependencyPackages = instance.cleanDependencies(sortedDependencyPackages);
    var groupedDependencyPackages = instance.groupFilePaths(cleanedDependencyPackages, files);
    
    return  groupedDependencyPackages;
};

/**
 * Processes the given path globs and returns the according files in the found directories
 * 
 * @param {Array}               The array of directory globs to search in 
 * @return {Array}              The array of found files 
 */

DependencyBuilder.prototype.processGlobPatterns = function(globPatterns, excludes) {
    var instance = this;
    
    var files = [];

    var options = {
        ignore: excludes || [];;
    }
    
    for (var index = 0; index < globPatterns.length; index++) {
        var globPatternFiles = glob.sync(globPatterns[index], options;
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
};

/**
 * Gets the according configuration files from found file paths
 * 
 * @param {array}
 * @return {array}
 */
DependencyBuilder.prototype.filterJsonFiles = function(foundFiles) {
    var instance = this;
    
    var jsonFiles = foundFiles.filter(function(value){
        
        return _.endsWith(value, ".json");
    });
    
    return jsonFiles;
    
};

/**
 * Extracts package.json files from configruation files in order to detect according modules
 * 
 * @param foundFiles
 * @returns
 */
DependencyBuilder.prototype.filterPackageJsonFiles = function(foundFiles) {
    var instance = this;
    
    var packagesJsons = foundFiles.filter(function(value){
        return _.endsWith(value, "package.json");
    });
    
    return packagesJsons;
};

/**
 * Creates snall package information with module name, dependencies and root path for found modules
 * 
 * @param packageJsons
 * @returns
 */
DependencyBuilder.prototype.getPackageJsonDependencies = function(packageJsons) {
    var instance = this;
    var packages = {};
    for (var index = 0 ; index < packageJsons.length; index++) {
        var filePath = packageJsons[index];
        var packageJson = require(filePath);
        var dependencies = _.keysIn(packageJson.dependencies) || [];
        dependencies = dependencies.concat(_.keysIn(packageJson.peerDependencies) || []);
        var modulePath = filePath.replace("package.json", "");
        var packageObject = {
                "config": filePath,
                "path": modulePath,
                "test": modulePath+"test"+path.sep,
                "name": packageJson.name,
                "dependencies": dependencies
        };
        packages[packageObject.name] = packageObject;
    }
    
    return packages;
};

/**
 * Cleans and removes unused packages 
 * 
 * @param dependencyPackages
 * @returns {___anonymous4907_4908}
 */
DependencyBuilder.prototype.cleanDependencies = function(dependencyPackages) {
    var instance = this;
    
    var cleanedDependencyPackages = {};
    for (var packageName in dependencyPackages) {
        var module = dependencyPackages[packageName];
        if (module) {
            cleanedDependencyPackages[packageName] = module;
        }
    }
    
    return cleanedDependencyPackages;
};  

/**
 * Sorts given module paths by the module dependencies
 * 
 * @param {object}
 * @return {object}
 */
DependencyBuilder.prototype.sortModuleDependencies = function(packageDependencies) {
    var instance = this;
    var sortedDependencies = {};
    
    var topoSort = new Toposort();
    var keys = _.keys(packageDependencies);
    if (keys.length > 1) {
        for (var packageName in packageDependencies) {
            var pckge = packageDependencies[packageName];
            topoSort.add(packageName, pckge.dependencies);
        }
        
        var sorted = topoSort.sort().reverse();
        for (var index = 0; index < sorted.length; index++) {
            var name = sorted[index];
            sortedDependencies[name] = packageDependencies[name];
        }
    } else {
        sortedDependencies = packageDependencies;
    }
    
    return sortedDependencies;
};

/**
 * Groups the found paths to the according module package.
 * The method tries to find the according borders of a module
 * 
 * @param dependencyPackages
 * @param filePaths
 * @returns
 */

DependencyBuilder.prototype.groupFilePaths = function(dependencyPackages, filePaths) {
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
    
    // Add paths to packages
    for (var depPackageName in dependencyPackages) {
        var packagePath = dependencyPackages[depPackageName].path;
        var tmpModulePaths = modulePaths;
        var index = tmpModulePaths.length-1;
        var found = false;
        while(index > -1 && !found) {
            if ( packagePath === tmpModulePaths[index].modulePath) {
                dependencyPackages[depPackageName].paths = tmpModulePaths[index].paths;
                modulePaths.splice(index,1);
                found = true;
            }
            index--;
        }
    }
    
    return dependencyPackages;
};

DependencyBuilder.prototype.buildStandardScanGlobs = function(globs) {
    var instance = this;
    var scanGlobs = [];
    
    logger.info("Building new standard globs ...");
    
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

module.exports = exports = new DependencyBuilder();