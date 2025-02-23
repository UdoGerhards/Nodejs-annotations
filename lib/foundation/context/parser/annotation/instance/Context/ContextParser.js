'use strict';
import BeanParser from '../Bean/BeanAnnotationParser';

class ContextParser extends BeanParser {

    constructor() {
        super();
    }

    init() {
        let instance = this;

        instance.logger = instance.LogManager.getLogger(instance);
        let logger = instance.logger;
        logger.info(instance.constructor.name + " initialized ...");
    }

    _stage(annotationInformation, beanStructure, applicationStructure) {
        super._stage(annotationInformation, beanStructure, applicationStructure);
        beanStructure._isContext = true;
    }

    parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure) {

        if (namespaceStack.length >0) {
            throw new EvalError("Context beans cannot be internal beans");

        }

        beanStructure = super.parseOpenXMLTag(moduleDir, currentTag, propertyStack, namespaceStack, applicationStack, beanStructure);

        beanStructure._isContext = true;
        return beanStructure;
    }
}

export default ContextParser;