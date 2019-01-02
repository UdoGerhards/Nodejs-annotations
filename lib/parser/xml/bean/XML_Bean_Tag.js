'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */
class Bean {

    constructor() {
        var instance = this;
    }

    parseXML(currentTag, annotation, beanStructure) {

        let attributes = currentTag.attributes;
        let id = attributes.id;
        let src = attributes.src;

        /* Create annotation information */
        let annotationInformation = {
            annotation: annotation,
            annotationValue: "(\""+id+"\")",
            comment: annotation.name+"(\""+id+"\")",
        };

        beanStructure = {
            descriptor: annotationInformation,
            path: src,
            structure: []
        };

        return beanStructure;

    }

}

module.exports = exports = new Bean();