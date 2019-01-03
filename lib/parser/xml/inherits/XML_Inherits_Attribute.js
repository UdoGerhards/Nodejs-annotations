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
        let inherits = attributes.inherits;

        if (inherits) {

            /* Create annotation information */
            let annotationInformation = {
                annotation: annotation,
                annotationValue: "(\"" + inherits + "\")",
                comment: annotation.name + "(\"" + inherits + "\")",
            };

            if (!beanStructure.descriptor.childs) {
                beanStructure.descriptor.childs = [];
            }

            beanStructure.descriptor.childs.push(annotationInformation);
        }

        return beanStructure;

    }

}

module.exports = exports = new Inherits();