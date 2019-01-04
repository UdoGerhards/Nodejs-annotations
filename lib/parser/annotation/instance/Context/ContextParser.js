'use strict';
const BeanParser = require("../Bean/BeanAnnotationParser");

class ContextParser extends BeanParser {

    constructor() {
        super();
    }

    init() {
        var instance = this;
        var processors = instance.processors;

        super.init();
        var logger = instance.logger;
        logger.info(instance.constructor.name + " initialized ...");
    }

    _stage(annotationInformation, beanStructure, applicationStructure) {
        super._stage(annotationInformation, beanStructure, applicationStructure);
        beanStructure._isContext = true;
    }
}

module.exports = exports = ContextParser;