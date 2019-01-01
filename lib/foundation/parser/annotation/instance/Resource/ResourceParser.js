'use strict';

const uuidV4 = require('uuid/v4');

class ResourceParser {

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
        if (beanStructure.stage == global.stages._STASHING_) {
            beanStructure = instance._stage(annotationInformation, beanStructure, applicationStructure);
        }

        annotationInformation.done = true;
    }


    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
        var logger = instance.logger;
        var util = instance.util;

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

        logger.info("    ... stashing resource "+util.inspect(beanName));

        if (beanStructure && target) {

            var resource = require(target);

            var identifier = uuidV4();
            var beanStructure = {
                namespace: identifier,
                _instance: resource,
                beanName : beanName,
                descriptor: {
                    annotation: annotationInformation.annotation,
                    annotationValue: beanName
                }
            };

        } else if (beanStructure) {

            beanStructure.beanName = beanName,
            beanStructure.descriptor = {
                annotation: annotationInformation.annotation,
                annotationValue: beanName
            }
        }

        applicationStructure.nameToNamespace[beanStructure.beanName] = beanStructure;

        return beanStructure;
    }
}

module.exports = exports = ResourceParser;