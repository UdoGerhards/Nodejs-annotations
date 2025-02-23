'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */
class Value {

    /**
     * Parse a xml tag which has an attribute "value" added
     *
     * @param currentTag
     * @param propertyStack
     * @param context
     * @param stack
     * @param beanStructure
     * @returns {*}
     */
    parseOpenXMLTag(currentTag, annotation, beanStructure) {

        let attributes = currentTag.attributes;
        let property = attributes.property;
        let value = attributes.value;

        let annotationInformation = null;

        let token = {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": property
                    },
                    "init": {
                        "type": "Literal",
                        "value": value,
                        "raw": "\""+value+"\""
                    }
                }
            ]
        };

        annotationInformation = {
            // TODO: Adapt QualificationParser to work also with simple values
            annotation: annotation,
            annotationValue: value,
            comment: "@Value(\""+value+"\"",
            tokens: [token]
        };

        return annotationInformation;
    }

    /**
     * Adde text only value
     *
     * @param value
     * @param propertyStack
     * @param context
     * @param stack
     * @param beanStructure
     * @returns {*}
     */
    parseText(value, annotation, beanStructure) {
        let instance = this;

        var targetStructurePosition = beanStructure.structure.length-1;

        beanStructure.structure[targetStructurePosition] = {
            // TODO: Adapt QualificationParser to work also with simple values
            annotation: null,
            annotationValue: value,
            comment: null
        }

        return beanStructure;
    }
}

export default new Value();