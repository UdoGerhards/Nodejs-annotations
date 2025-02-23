'use strict';
import BeanParser from '../Bean/BeanAnnotationParser';

class Service extends BeanParser {

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

export default Service;