'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */
class Inherits {

    constructor() {
        var instance = this;
    }

    parseOpenXMLTag(currentTag, annotation, beanStructure) {

        let attributes = currentTag.attributes;
        let parent = attributes.inherits;

        /* Create annotation information */
        let annotationInformation = {
            annotation: annotation,
            annotationValue: "(\"" + parent + "\")",
            comment: "@"+annotation.name + "(\"" + parent + "\")",
        };

        return annotationInformation;
    }
}

module.exports = exports = new Inherits();