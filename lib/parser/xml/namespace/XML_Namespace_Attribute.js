'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */

class Namespace {

    parseOpenXMLTag(currentTag, annotation, beanStructure) {

        let attributes = currentTag.attributes;
        let namespace = attributes.namespace || null;

        if (namespace) {

            /* Create annotation information */
            let annotationInformation = {
                annotation: annotation,
                annotationValue: "(\"" + namespace + "\")",
                comment: annotation.name + "(\"" + namespace + "\")",
            };

            if (!beanStructure.descriptor.childs) {
                beanStructure.descriptor.childs = [];
            }

            beanStructure.descriptor.childs.push(annotationInformation);
        }

        return beanStructure;

    }
}

module.exports = exports = new Namespace();