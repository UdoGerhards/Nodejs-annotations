'use strict';

class ContextParser {

    static get SUPPORTS() {
        return [ContextAnnotation.name]
    };

    _stage(annotationInformation, beanStructure, applicationStructure) {
        super._stage(annotationInformation, beanStructure, applicationStructure);
        beanStructure._isContext = true;
    }
}

module.exports = exports = ContextParser;