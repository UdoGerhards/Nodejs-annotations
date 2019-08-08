'use strict';
const BaseParser = require("../../Base/BaseAnnotationParser");

class AfterAnnotationParser extends BaseParser {

    constructor() {
        super()
        let instance = this;
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
        //super.parse(annotationInformation, beanStructure);
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        var property = annotationInformation.property;

        annotationInformation.property = property;
    }

    _aop_wire(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;
        var logger = instance.logger;

        var namespace = beanStructure.namespace.split(String.fromCharCode(12));

        var parent = instance._getSingleBeanStructureFromApplicationStack(namespace, applicationStructure);

        var methodName = annotationInformation.property;

        var pointCuts = parent._pointCuts;

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
                            var afterFunc = parent._instance[methodName];


                            var wrapper = function() {
                                var afterResult = targetFunc.apply(applicationStructure.nameToNamespace[beanIdentifier]._instance, arguments);
                                if (typeof afterResult != "undefined") {
                                    arguments[0] = afterResult;
                                }

                                return afterFunc.apply(applicationStructure.nameToNamespace[beanIdentifier]._instance, arguments);
                            };

                            applicationStructure.nameToNamespace[beanIdentifier]._instance[targetFnName] = wrapper;
                        }
                    });
                }

            }
        }

    }
}

module.exports = exports = AfterAnnotationParser;