'use strict';

class ContextParser {

    _stage(annotationInformation, beanStructure, applicationStructure) {
        super._stage(annotationInformation, beanStructure, applicationStructure);
        beanStructure._isContext = true;
    }
}

module.exports = exports = ContextParser;