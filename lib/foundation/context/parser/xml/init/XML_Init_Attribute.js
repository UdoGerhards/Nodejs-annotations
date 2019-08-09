'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */
class Init {

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
        let init = attributes.init;

        // let token = {
        //     "type": "MethodDefinition",
        //     "key": {
        //         "type": "Identifier",
        //         "name": init
        //     }
        // };

        let annotationInformation = {
            annotation: annotation,
            annotationValue: "()",
            property: init
            //comment: "@" + annotation.name + "()",
            //tokens: [token]
        };

        return annotationInformation;
    }
}

module.exports = exports = new Init();