'use strict';
var AfterAnnotation = require("../../../../annotation/aop/After/AfterAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js");


class AfterAnnotationParser extends BaseAnnotationParser {

    static get SUPPORTS() {
        return [AfterAnnotation.name]
    };

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var propertyResult = parser.parse(leadingToken);
        var property = propertyResult.id;

        annotationInformation.property = property;
    }

    /**
     * Parses the bean structure during the different modes
     *
     * @param annotationInformation
     * @param beanStructure
     */
    parse(annotationInformation, beanStructure, applicationStructure) {


        var instance = this;
        var stage = beanStructure.stage;

        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._AOP_WIRE:
                instance._aop_wire(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        super.parse(annotationInformation, beanStructure);
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;
    }

    _aop_wire(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;
        var logger = instance.logger;

        var pointCuts = beanStructure._pointCuts;
        var property = annotationInformation.property;
        var aspectInstance = beanStructure._instance;

        for (var pointCutMD5 in pointCuts) {

            for(var beanIdentifier in pointCuts[pointCutMD5]._beans) {
                var pointCutBeanTargetNames = pointCuts[pointCutMD5]._beans[beanIdentifier];

                for (var targetFuncName in pointCutBeanTargetNames) {

                    /**
                     * Wire after
                     */
                    if (typeof applicationStructure.classToBean[beanIdentifier]._instance === "object") {

                        var targetFunc = applicationStructure.classToBean[beanIdentifier]._instance[targetFuncName];
                        var afterFunc = aspectInstance[property];

                        var wrapper = function(...args) {
                            targetFunc.call(applicationStructure.classToBean[beanIdentifier]._instance, args);
                            return afterFunc.call(applicationStructure.classToBean[beanIdentifier]._instance, args);
                        }

                        applicationStructure.classToBean[beanIdentifier]._instance[targetFuncName] = wrapper;
                    }
                }

            }
        }

    }
}

module.exports = exports = AfterAnnotationParser;