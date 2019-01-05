'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */

class Namespace {

    parseOpenXMLTag(currentTag, annotation, beanStructure) {

        let attributes = currentTag.attributes;
        let namespace = attributes.namespace || null;
        let canonical = attributes.canonical || null;
        let sep = "";

        let annotationValue = "(";
        if (namespace) {
            annotationValue += ("namsepace="+namespace);
            sep = ",  "
        }

        if (canonical) {
            annotationValue += sep+("canonical="+canonical);
        }

        annotationValue += ")";

        /* Create annotation information */
        let annotationInformation = {
            annotation: annotation,
            annotationValue: annotationValue,
            comment: "@"+annotation.name + annotationValue
        };

        return annotationInformation;

    }
}

module.exports = exports = new Namespace();