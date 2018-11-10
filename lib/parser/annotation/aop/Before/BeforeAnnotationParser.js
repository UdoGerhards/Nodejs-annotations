'use strict';
var BeforeAnnotation = require("../../../../annotation/aop/Before/BeforeAnnotationClass")
    , AfterAnnotationParser = require("../After/AfterAnnotationParser");


class BeforeAnnotationParser extends AfterAnnotationParser {

    static get SUPPORTS() {
        return [BeforeAnnotation.name]
    };

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
                     * Wire before
                     */
                    if (typeof applicationStructure.classToBean[beanIdentifier]._instance === "object") {

                        var targetFunc = applicationStructure.classToBean[beanIdentifier]._instance[targetFuncName];
                        var beforeFunc = aspectInstance[property];

                        var wrapper = function(...args) {
                            var beforeResult = beforeFunc.call(applicationStructure.classToBean[beanIdentifier]._instance, args);
                            if (beforeResult) {
                                args = beforeResult;
                            }
                            return targetFunc.call(applicationStructure.classToBean[beanIdentifier]._instance, args);
                        }

                        applicationStructure.classToBean[beanIdentifier]._instance[targetFuncName] = wrapper;
                    }
                }

            }
        }

    }
}

module.exports = exports = BeforeAnnotationParser;