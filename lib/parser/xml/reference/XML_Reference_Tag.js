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
    parseOpenXMLTag(currentTag, annotation, beanStructure) {
        let instance = this;

        let attributes = currentTag.attributes;
        let id = attributes.id;
        let property = attributes.property || null;

            let token = {
                "type": "MemberExpression",
                "property": {
                    "type": "Identifier",
                    "name": property
                }
            };

            let annotationInformation = {
                annotation: annotation,
                annotationValue: "(\"" + id + "\")",
                comment: "@" + annotation.name + "(\"" + id + "\")",
                tokens: [token]
            };

            return annotationInformation;
    }
}

module.exports = exports = new Reference();