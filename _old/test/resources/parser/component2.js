'use strict';

/**
 * @Service("ExtensionManager")
 *
 **/
function ExtensionManager() {
    var instance = this;

    instance.namespace =
        "ExtensionManager";

    /*
     * @Qualifier("ExtensionManagerPackageInfo")
     */
    instance.
        packageInfo
        = null;

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

    /*
     * @Qualifier("FinishingLevel0")
     */
    instance.finishingLevel0 = null;

    instance.directory = null;

    instance.cmdInstall = null;
    instance.cmdUninstall = null;

    /**
     * @Component("InnerBeanLevel1")
     */
    instance.innerBeanLevel1 = function InnerBeanLevel1() {

        var instance = this;

        /*
         * @Qualifier("Property1InnerBeanLevel1"
         */
        instance.Property1InnerBeanLevel1 = null;

        /*
         * @Qualifier("Property2InnerBeanLevel1"
         */
        instance.Property1InnerBeanLevel1 = null;

        /*
         * @Qualifier("Property3InnerBeanLevel1"
         */
        instance.Property1InnerBeanLevel1 = null;

        /*
         * @Qualifier("Property4InnerBeanLevel1"
         */
        instance.Property1InnerBeanLevel1 = null;

        /**
         * @Component("InnerBeanLevel2")
         */
        instance.innerBeanLevel2 = function InnerBeanLevel2() {
            var instance = this;

            /*
             * @Qualifier("Property1InnerBeanLevel2"
             */
            instance.Property1InnerBeanLevel2 = null;

            /*
             * @Qualifier("Property2InnerBeanLevel2"
             */
            instance.Property1InnerBeanLevel2 = null;

            /*
             * @Qualifier("Property3InnerBeanLevel2"
             */
            instance.Property1InnerBeanLevel2 = null;

            /*
             * @Qualifier("Property4InnerBeanLevel2"
             */
            instance.Property1InnerBeanLevel2 = null;

            /**
             * @Component("InnerBeanLevel3")
             */
            instance.innerBeanLevel3 = function InnerBeanLevel3() {
                var instance = this;

                /*
                 * @Qualifier("Property1InnerBeanLevel3"
                 */
                instance.Property1InnerBeanLevel3 = null;

                /*
                 * @Qualifier("Property2InnerBeanLevel3"
                 */
                instance.Property1InnerBeanLevel3 = null;

                /*
                 * @Qualifier("Property3InnerBeanLevel3"
                 */
                instance.Property1InnerBeanLevel3 = null;

                /*
                 * @Qualifier("FinishingLevel3")
                 */
                instance.Property1InnerBeanLevel3 = null;
            }

            /*
             * @Qualifier("FinishingLevel2")
             */
            instance.finishingLevel2 = null;
        }

        /*
         * @Qualifier("FinishingLevel1")
         */
        instance.finishingLevel1 = null;
    }
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

module.exports = exports = ExtensionManager;