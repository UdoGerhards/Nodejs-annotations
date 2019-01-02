'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */

class Property {

    parseXML(currentTag, annotation, beanStructure) {
        let attributes = currentTag.attributes;
        let target = attributes.name;
        let value  = attributes.value;

        let token = {
            "type": "MemberExpression",
            "property": {
                "type": "Identifier",
                "name": target
            }
        };

        /* Create annotation information */
        let annotationInformation = {
            tokens: [token]
        };

        if (!beanStructure.structure) {
            beanStructure.structure = [];
        }

        beanStructure.structure.push(annotationInformation);

        /* If a value attribute is given */
        if (value) {

            let targetStructurePosition = beanStructure.structure.length-1;

            beanStructure.structure[targetStructurePosition] = {
                // TODO: Adapt QualificationParser to work also with simple values
                annotation: null,
                annotationValue: value,
                comment: null
            }
        }

        return beanStructure;
    }
}

module.exports = exports = new Property();