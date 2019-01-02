'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */
class Reference {

    /**
     * Parse xml tag "reference"
     *
     * @param currentTag
     * @param propertyStack
     * @param context
     * @param stack
     * @param beanStructure
     * @returns {*}
     */
    parseXML(currentTag, annotation, beanStructure) {
        let instance = this;

        let attributes = currentTag.attributes;
        let id = attributes.id;

        var targetStructurePosition = beanStructure.structure.length-1;

        beanStructure.structure[targetStructurePosition] = {
            annotation: annotation,
            annotationValue: "(\""+src+"\")",
            comment: annotation.name+"(\""+src+"\")"
        }

        return beanStructure;
    }
}

module.exports = exports = new Reference();