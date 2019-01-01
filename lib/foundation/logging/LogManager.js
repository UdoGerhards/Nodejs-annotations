'use strict';

var log4js = require("log4js")
    , log4js_extend = require("log4js-extend");;

/**
 * Created by udogerhards on 27.12.18.
 */

class LogManager {

    constructor() {

        var instance = this;
        instance.configFile = null;
        instance.categories = null;
        instance.logger = log4js.getLogger("default");
    }

    /**
     * Initializes the logging system
     *
     * @param configFile
     * @returns {string}
     * @private
     */
    init(configFile) {
        var instance = this;
        var logger = instance.logger;

        logger.info("Initializing LogManager ...")

        if (configFile) {
            instance.configFile = configFile;
        }

        instance.categories = require(instance.configFile)["categories"] || null;

        log4js.configure(instance.configFile);

        log4js_extend(log4js, {
            format: "@name(@file:@line:@column)"
        });

        logger.trace("LogManager initialized ...");
    }

    getLogger(category) {
        var instance = this;
        var logger = instance.logger;

        if (!instance.categories) {
            instance.init();
        }

        if (!instance.categories[category]) {
            logger.trace("Requested logging category is not availables ... using category 'default' ...");
            category = "default";
        }

        logger.info("Returning logger for category '"+category+"' ... ");

        return log4js.getLogger(category);
    }
}

module.exports = exports = new LogManager();