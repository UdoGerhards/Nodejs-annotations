'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */

class Property {

    parseOpenXMLTag(currentTag, annotation, beanStructure) {
        let attributes = currentTag.attributes;
        let target = attributes.name;
        let value  = attributes.value || null;

        // let token = {
        //     "type": "MemberExpression",
        //     "property": {
        //         "type": "Identifier",
        //         "name": target
        //     }
        // };

        let annotationInformation = {
            annotation: annotation,
            annotationValue: target,
            //comment: null,
            //tokens: [token]
        };

        return annotationInformation;
    }
}

export default new Property();