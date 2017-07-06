'use strict';

var ResourceAnnotation = require("../../../../annotation/instance/Resource/ResourceAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util");

const uuidV4 = require('uuid/v4');

class ResourceParser extends BeanParser {

    static get SUPPORTS() {
        return [ResourceAnnotation.name]
    };

    /**
     * Parses the bean structure during the different modes
     *
     * @param annotationInformation
     * @param beanStructure
     */
    parse(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;

        // Only process if there is not already an instance
        if (!beanStructure || !beanStructure.beanName) {
            instance._stage(annotationInformation, beanStructure, applicationStructure);
        }
    }


    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        var target = annotationInformation.annotationValue;

        var beanName = null;
        var target = null;

        // Match given params
        var ParamRegex = new RegExp("\(\"(.*?)\"\)", "g");
        var paramMatch = null;
        while(paramMatch  = ParamRegex.exec(annotationInformation.annotationValue)) {

            var value = paramMatch[2];

            if (!beanName) {
                beanName = value;
            } else if (!target) {
                target = value;
            }
        }

        if (!beanStructure && target) {

            var resource = require(target);

            var identifier = uuidV4();
            var beanStructure = {
                structure: null,
                namespace: identifier,
                _instance: resource,
                beanName : beanName,
                descriptor: {
                    annotation: annotationInformation.annotation,
                    annotationValue: beanName
                }
            };

        } else if (beanStructure) {

            var identifier = uuidV4();
            var beanStructure = {
                structure: null,
                namespace: identifier,
                beanName : beanName,
                descriptor: {
                    annotation: annotationInformation.annotation,
                    annotationValue: beanName
                }
            };
        }

        applicationStructure.nameToNamespace[beanStructure.beanName] = beanStructure;
    }
}

module.exports = exports = ResourceParser;