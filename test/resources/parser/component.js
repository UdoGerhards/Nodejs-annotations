'use strict';

/**
 * @Service("ExtensionManager")
 * @Lazy()
 * @Ressource()
 *
 **/
function ExtensionManager() {
    var instance = this;

    instance.namespace =
        "ExtensionManager";

    /*
     * @Qualifier("ExtensionManagerPackageInfo")
     */
    instance.packageInfo = null;

    /*
     * @Qualifier("AppDir")
     */
    instance.appFoundation = null;

    // @Qualifier("FileManager")
    instance.fileManager = null;

    /*
     * @Qualifier("ConfigurationManager")
     */
    instance.configurationManager = null;

    /*
     * Local instance configuration
     */
    instance.localConfiguration = null;

    /*
     * @Qualifier"BitBucketRestService"
     */
    instance.bitbucket = null;

    /*
     * @Qualifier("LocalExtensionService")
     */
    instance.local = null;

    /*
     * @Qualifier("Bluebird")
     */
    instance.bluebird = null;

    /*
     * @Qualifier("Md5")
     */
    instance.md5 = null;

    /*
     * @Qualifier("Logger")
     */
    instance.logger = null;

    /*
     * @Qualifier("Util")
     */
    instance.util = null;

    /*
     * @Qualifier("Lodash")
     */
    instance._ = null;

    /*
     *@Qualifier("ChildExec")
     */
    instance.exec = null;

    instance.directory = null;

    instance.cmdInstall = null;
    instance.cmdUninstall = null;
}

// TODO: Check if initialization takes place after initialization of "index.js" to avoid false or wrong values in Application Configuration
/**
 * Initializer
 *
 * @Init()
 */
ExtensionManager.prototype.init = function() {

    var instance = this;
    var logger = instance.logger;
    var util = instance.util;

    logger.info("Initializing extension manager ...");

    var sectionName = instance.packageInfo.name.replace(instance.appFoundation.group_regex, "");
    instance.localConfiguration = instance.configurationManager.getExtensionConfiguration(sectionName);

    logger.trace(util.inspect(instance.localConfiguration, {depth: null}));

    instance.bitbucket.user = instance.localConfiguration.repositories.user;
    instance.bitbucket.password = instance.localConfiguration.repositories.password;
    instance.bitbucket.repositoryRoot = instance.localConfiguration.repositories.url;

    instance.local.extensionDirectory = instance.appFoundation.root+instance.localConfiguration.local.extensionDirectory;

    // TODO: Maybe check to put this in extension initializeation "extension.js"
    instance.appFoundation.group = instance.localConfiguration.local.group;

    instance.cmdInstall = instance.localConfiguration.local.install;
    instance.cmdUninstall = instance.localConfiguration.local.uninstall;

    logger.info("Extension manager is up and running ... ");

};

/**
 * Loads all known extensions
 */

ExtensionManager.prototype.load = function() {

    var instance = this;
    var bitbucket = instance.bitbucket;
    var local = instance.local;
    var logger = instance.logger;
    var util = instance.util;
    var _ = instance._

    logger.info("Loading extension context ... ");
    logger.debug("    loading remote repositories ... ");

    return bitbucket.load().then(function(repositories){

        logger.trace(util.inspect(bitbucket.repositories, {depth: null}));
        instance.directory = bitbucket.repositories;

        logger.debug("    loading local extensions ... ");
        var localExtensions = local.load();

        logger.trace(util.inspect(localExtensions, {depth: null}));
        logger.debug("    merging with remote result ...");

        var extensionNames = _.keys(localExtensions);
        extensionNames.forEach(function(fullExtensionName) {
            var shortName = fullExtensionName.replace(instance.appFoundation.group_regex, "");
            var extensionInfo = localExtensions[fullExtensionName] || null;
            if (instance.directory[shortName]) {
                logger.trace(instance.directory[shortName]);
                instance.directory[shortName].installed = extensionInfo.version;
                instance.directory[shortName].packageInfo = extensionInfo.packageInfo;
            }
        });

        return instance.directory;
    });
};

/**
 * Loads a package.json file either from local (installed) or remote (repository) package identified by package name and an optional version
 *
 * @param {String}                  The package name
 * @param {String}                  Optional, the version
 *
 * @returns {Object}                A promise with the operation result
 *
 * @throws {Object}                 A exepction if the extension is not within the known extensions of the cms
 */
ExtensionManager.prototype.loadPackageJson = function(extensionName, version) {
    var instance = this;
    var bitbucket = instance.bitbucket;
    var local = instance.local;
    var logger = instance.logger;
    var util = instance.util;
    var _ = instance._;
    var Promise = instance.bluebird;
    var fileManager = instance.fileManager;

    logger.info("Loading 'package.json' for extension: "+util.inspect(extensionName)+", version: "+util.inspect(version));

    var extensionInformation = instance.directory[extensionName] || null;

    if (!extensionInformation) {
        throw new Error("No such extension package, name: "+util.inspect(extensionName));
    }

    // Handle already installed extensions locally
    if (extensionInformation.installed && extensionInformation.installed === version) {
        logger.debug("    getting it from local installation ...");
        return fileManager.readFileAsync(extensionInformation.packageInfo);
    } else {
        var dedicatedPackage = null;
        var versions = extensionInformation.versions || null;

        logger.debug("    getting it from remote repository ...");

        if (versions) {
            var counter = 0;
            while(!dedicatedPackage && counter < versions.length) {
                if (versions[counter].version === version) {
                    dedicatedPackage = versions[counter];
                }
                ++counter;
            }

            if (!dedicatedPackage) {
                throw new Error("No such extension package, version: "+util.inspect(version));
            }

            var packageJson = dedicatedPackage.packageInfo;
            return bitbucket.getFile(packageJson);
        }
    }
};

/**
 * Installs an extension to the cms by its name and a dedicated version
 *
 * @param {String}                  The shorthand extension name
 * @param {String}                  Optional, the dedicated version
 *
 * @return {Object}                 A promise with the results from the commandline
 *
 * @throws {Ojbect}                 If the given name cannot be found in available cms packages
 */
// @Init()
ExtensionManager.prototype.installPackage = function(extensionName, version) {

    var instance = this;
    var directory = instance.directory;
    var logger = instance.logger;
    var util = instance.util;
    var _ = instance._;
    var Promise = instance.bluebird;
    var exec = instance.exec;

    var version = version || null;

    logger.info("Installing extension name "+util.inspect(extensionName)+", version "+util.inspect(version));

    var extensionInformation = instance.directory[extensionName] || null;

    if (!extensionInformation) {
        throw new Error("No such extension package, name: "+util.inspect(extensionName));
    } else if (extensionInformation.installed === version) {
        throw new Error("Extension with name: "+util.inspect(extensionName)+", version: "+util.inspect(version)+" is already installed!");
    }

    var versions = extensionInformation.versions;
    var branchUrl = null;
    versions.forEach(function(branch) {
        if (!branchUrl && (!version || branch.version === version)) {
            // Selects the given version of if no version is given, the most top from the branches
            branchUrl = extensionInformation.url+"#"+branch.hash;
            logger.debug("    url: "+util.inspect(branchUrl));
        }
    });

    return new Promise(function(resolve, reject){
        var install = instance.cmdInstall+" "+branchUrl;
        var options = {
            cwd: instance.appFoundation.root
        };

        exec(install, options, function(error, stdout, stderr) {
            if (error) {
                logger.error("Could not install package ", util.inspect(extensionName)+", version "+util.inspect(version));
                logger.error(error);
                reject(error);
            } else {
                // Refresh information for local installed extensions
                instance.local.load();
                logger.debug(stdout);
            }
            resolve(true);
        });
    });
};

/**
 * Uninstalls a package from the cms directory by its short name (wihout group name)
 *
 * @param {String}                  The shortname of the cms package
 *
 * @return {Object}                 A promise with the results from the commandline
 *
 * @throws {Ojbect}                 If the given name cannot be found in available cms packages
 */
ExtensionManager.prototype.uninstallPackage = function(extensionName) {

    var instance = this;
    var directory = instance.directory;
    var logger = instance.logger;
    var util = instance.util;
    var _ = instance._;
    var Promise = instance.bluebird;
    var exec = instance.exec;

    var version = version || null;

    logger.info("Uninstalling extension name "+util.inspect(extensionName));

    var extensionInformation = instance.directory[extensionName] || null;

    if (!extensionInformation) {
        throw new Error("No such extension package, name: "+util.inspect(extensionName));
    }

    var fullExtensionName = instance.appFoundation.group+"/"+extensionName;

    return new Promise(function(resolve, reject){
        var uninstall = instance.cmdUninstall+" "+fullExtensionName;
        var options = {
            cwd: instance.appFoundation.root
        };

        logger.debug(uninstall);

        exec(uninstall, options, function(error, stdout, stderr) {
            if (error) {
                logger.error("Could not uninstall package ", util.inspect(extensionName));
                logger.error(error);
                reject(error);
            } else {
                instance.directory[extensionName].installed = false;
                instance.directory[extensionName].packageInfo = null;
                logger.debug(stdout);
            }
            resolve(true);
        });
    });
};

/**
 * Enables an extension for virtual host
 */
ExtensionManager.prototype.enablePackage = function(packageName, vhostName) {

    var instance = this;
    var configurationManager = instance.configurationManager;
    var util = instance.util;
    var logger = instance.logger;

    logger.info("Enabling package "+util.inspect(packageName)+" for vhost "+util.inspect(vhostName));

    var extensionInformation = instance.directory[packageName] || null;
    if (!extensionInformation) {
        throw Error("No such extension!");
    } else if (!extensionInformation.installed) {
        throw Error("Extension is not installed locally");
    }

    var vhostConfiguration = configurationManager.getVhostConfigForDomain(vhostName);
    if (vhostConfiguration) {
        var allExtensions = vhostConfiguration.active.replace(/\\s*,\\s*/g,",").split(",");
        logger.trace(allExtensions);

        // No duplicates
        var index = allExtensions.indexOf(packageName);
        if (index > -1) {
            throw new Error("Extensions is already enabled!");
        }

        allExtensions.push(packageName);

        vhostConfiguration.active = allExtensions.join(",");
        logger.trace(vhostConfiguration);

        instance.configurationManager.writeVhostConfiguration(vhostConfiguration);

        logger.info("Done!");
    } else {
        logger.error("No vhost configuration for domain: "+util.inspect(vhostName));
        throw new Error("No such vhost configuration!");
    }
};

/**
 * Disables an extension within a virtual host context
 */
ExtensionManager.prototype.disablePackage = function(packageName, vhostName) {

    var instance = this;
    var configurationManager = instance.configurationManager;
    var util = instance.util;
    var logger = instance.logger;

    var extensionInformation = instance.directory[packageName] || null;
    if (!extensionInformation) {
        throw Error("No such extension!");
    } else if (!extensionInformation.installed) {
        throw Error("Extension is not installed locally");
    }

    var vhostConfiguration = configurationManager.getVhostConfigForDomain(vhostName);
    if (vhostConfiguration) {
        var allExtensions = vhostConfiguration.active.replace(/\\s*,\\s*/g,",").split(",");
        logger.debug(allExtensions);

        var newExtensions = [];

        allExtensions.forEach(function(extensionName){
            if (extensionName !== packageName) {
                newExtensions.push(extensionName);
            }
        });

        vhostConfiguration.active = newExtensions.join(",");
        logger.debug(vhostConfiguration);

        instance.configurationManager.writeVhostConfiguration(vhostConfiguration);

        logger.info("Done!");
    } else {
        logger.error("No vhost configuration for domain: "+util.inspect(vhostName));
        throw new Error("No such vhost configuration!");
    }

};

/**
 * Get system wide installed extensions
 *
 * @return {Object}             All installed extensions
 */
ExtensionManager.prototype.getInstalled = function() {

    var instance = this;
    var directory = instance.directory;
    var installed = {};

    for (var extensionName in directory){
        if (directory[extensionName].installed) {
            installed[extensionName] = directory[extensionName];
        }
    }

    return installed;
};

/**
 * Gets all extensions in a vhost configuration which are enabled and installed
 *
 * @param {String}             The vhost name to check the exensions
 *
 * @return {Object}            The object with enabled extensions
 */
ExtensionManager.prototype.getActivated = function(vhostName) {

    var instance = this;

    var configurationManager = instance.configurationManager;
    var directory = instance.directory;
    var activated = {};

    var vhostConfiguration = configurationManager.getVhostConfigForDomain(vhostName);
    if (vhostConfiguration) {
        var allExtensions = vhostConfiguration.active.replace(/\\s*,\\s*/g,",").split(",");
        allExtensions.forEach(function(extensionName){
            var extensionInformation = directory[extensionName] || null;
            if (extensionInformation && extensionInformation.installed) {
                activated[extensionName] = extensionInformation;
            }
        });
    }

    return activated;
};

/**
 * Identifies extensions which are installed but not enabled in a given vhost configuration
 *
 * @param {String}             The vhost name to check the exensions
 *
 * @return {Object}            The object with disbled extensions
 */
ExtensionManager.prototype.getDisabled = function(vhostName) {

    var instance = this;

    var configurationManager = instance.configurationManager;
    var directory = instance.directory;
    var disabled = {};

    var vhostConfiguration = configurationManager.getVhostConfigForDomain(vhostName);
    if (vhostConfiguration) {

        var allExtensions = vhostConfiguration.active.replace(/\\s*,\\s*/g,",").split(",");

        for (var extensionName in directory) {
            var extensionInformation = directory[extensionName];
            if (extensionInformation.installed && allExtensions.indexOf(extensionName) === -1) {
                disabled[extensionName] = extensionInformation;
            }
        }
    }

    return disabled;

};

module.exports = exports = ExtensionManager;