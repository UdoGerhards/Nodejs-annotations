'use strict';

/**
 * Created by udogerhards on 2019-01-02.
 */
class Run {

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
        let run = attributes.run;

        // let token = {
        //     "type": "MethodDefinition",
        //     "key": {
        //         "type": "Identifier",
        //         "name": run
        //     }
        // };

        let annotationInformation = {
            annotation: annotation,
            annotationValue: "()",
            property: run
            //comment: "@" + annotation.name + "()",
            //tokens: [token]
        };

        return annotationInformation;
    }
}

module.exports = exports = new Run();