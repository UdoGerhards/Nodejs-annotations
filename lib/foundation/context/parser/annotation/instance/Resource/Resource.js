'use strict';

const BaseParser = require("../../Base/Base");

class Resource extends BaseParser {

    constructor() {
        super();
        var instance = this;
        instance.uuidV4 = null;
    }

    init() {
        let instance = this;

        instance.logger = instance.LogManager.getLogger(instance);
        let logger = instance.logger;
        logger.info(instance.constructor.name + " initialized ...");
    }

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

        return beanStructure;
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
        var uuidV4 = instance.uuidV4;

        var target = annotationInformation.annotationValue;

        var beanName = null;
        var target = null;

        let params = annotationInformation.annotationValue.split(",");

        params.forEach(function(value, index) {

            if (index == 0) {
                target = value.replace(/\"/g, "").replace(/\'/g, "").trim();
            }

            if (index == 1) {
                beanName = target;
                target = value.replace(/\"/g, "").replace(/\'/g, "").trim();
            }
        });

        logger.info("    ... stashing resource "+util.inspect(beanName));

        if (beanStructure && target) {

            let currentPwd = instance.path.dirname(beanStructure.path);

            if (target.startsWith("../")) {
                let propPathSegments = target.split("/");
                let currentPathSegs = currentPwd.split("/");

                let levelUpCount = 0;
                for (let index=0; index < propPathSegments.length; index++) {
                    if (propPathSegments[index].startsWith("..")) {
                        levelUpCount++;
                    } else {
                        break;
                    }
                }

                target = "/"+propPathSegments.splice(levelUpCount, propPathSegments.length).join("/");
                currentPwd = currentPathSegs.splice(0,currentPathSegs.length-levelUpCount).join("/");

                target = currentPwd+target;
            } else if (target.startsWith("./")) {
                target = target.replace(/\.\//g, "\/");
                target = currentPwd+target;
            }

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

    getAnnotationRelatedInformation(expressionStatement, struct, annotationClass) {
        struct.descriptor.start = annotationClass.orig.start;
        struct.descriptor.end = annotationClass.orig.end;
        return struct;
    }
}

module.exports = exports = Resource;