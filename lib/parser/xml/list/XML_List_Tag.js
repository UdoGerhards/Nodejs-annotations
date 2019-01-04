'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */
class List {

    constructor() {
        var instance = this;
    }

    parseOpenXMLTag(currentTag, annotation, beanStructure) {

        let attributes = currentTag.attributes;
        let id = attributes.id;
        let src = attributes.src;

        let token = {
            "type": "VariableDeclarator",
            "id": {
                "type": "Identifier",
                "name": "List"
            }
        };

        /* Create annotation information */
        let annotationInformation = {
            annotation: annotation,
            tokens: [token]
        };

        /* Set an external id if defined */
        if (id) {
            annotationInformation.annotationValue = "(\""+id+"\")",
            annotationInformation.comment = annotation.name+"(\""+id+"\")"
        }

        beanStructure = {
            descriptor: annotationInformation,
            path: "synhtetic",
            structure: []
        };

        return beanStructure;

    }

}

module.exports = exports = new List();