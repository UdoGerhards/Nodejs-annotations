'use strict';
const BeanParser = require("../Bean/BeanAnnotationParser");

class Configuration extends BeanParser {

    constructor() {
        super();
    }

    init() {
        let instance = this;

        instance.logger = instance.LogManager.getLogger(instance);
        let logger = instance.logger;
        logger.info(instance.constructor.name + " initialized ...");
    }
}

module.exports = exports = Configuration;