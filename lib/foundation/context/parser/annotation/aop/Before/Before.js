'use strict';
import After from "../After/After";

class Before extends After {

    constructor() {
        super();

        let instance = this;
    }

    _aop_wire(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;
        var logger = instance.logger;

        var namespace = beanStructure.namespace.split(String.fromCharCode(12));

        var parent = instance._getSingleBeanStructureFromApplicationStack(namespace, applicationStructure);
        var property = annotationInformation.property;

        let methodName = annotationInformation.method;

        var pointCuts = parent._pointCuts;
        var parentInstance = parent._instance;

        for (var pointCutMD5 in pointCuts) {

            for(var beanIdentifier in pointCuts[pointCutMD5]._beans) {
                var pointCutBeanTargetNames = pointCuts[pointCutMD5]._beans[beanIdentifier];

                for (var targetFuncName in pointCutBeanTargetNames) {

                    pointCutBeanTargetNames[targetFuncName].forEach(function(targetFnName){

                        /**
                         * Wire before
                         */
                        if (typeof applicationStructure.nameToNamespace[beanIdentifier]._instance === "object") {

                            var targetFunc = applicationStructure.nameToNamespace[beanIdentifier]._instance[targetFnName];
                            var beforeFunc = parent._instance[methodName];


                            var wrapper = function() {
                                var beforeResult = beforeFunc.apply(applicationStructure.nameToNamespace[beanIdentifier]._instance, arguments);
                                if (typeof beforeResult != "undefined") {
                                    arguments[0] = beforeResult;
                                }

                                return targetFunc.apply(applicationStructure.nameToNamespace[beanIdentifier]._instance, arguments);
                            };

                            applicationStructure.nameToNamespace[beanIdentifier]._instance[targetFnName] = wrapper;
                        }
                    });
                }

            }
        }

    }
}

export default Before;