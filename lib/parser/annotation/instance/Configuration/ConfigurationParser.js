'use strict';

var ConfigurationAnnotation = require("../../../../annotation/instance/Configuration/ConfigurationAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js");


class ConfigurationParser extends BeanParser {

    static get SUPPORTS() {
        return [ConfigurationAnnotation.name]
    };

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private

    _stage(annotationInformation, beanStructure, applicationStructure) {
        super._stage(annotationInformation, beanStructure, applicationStructure)

        annotationInformation.annotation = ConfigurationAnnotation;

    }

     */
}

module.exports = exports = ConfigurationParser;