'use strict';
const BeanParser = require("../Bean/BeanAnnotationParser");

class ContextParser extends BeanParser {

    _stage(annotationInformation, beanStructure, applicationStructure) {
        super._stage(annotationInformation, beanStructure, applicationStructure);
        beanStructure._isContext = true;
    }
}

module.exports = exports = ContextParser;