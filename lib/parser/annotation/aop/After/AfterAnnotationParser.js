'use strict';
var AfterAnnotation = require("../../../../annotation/aop/After/AfterAnnotationClass")
    , BaseAnnotationParser = require("../../Base/BaseAnnotationParser.js");


class AfterAnnotationParser extends BaseAnnotationParser {

    static get SUPPORTS() {
        return [AfterAnnotation.name]
    };

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

        var namespace = beanStructure.namespace.split(":");

        var parent = instance._getSingleBeanStructureFromApplicationStack(namespace, applicationStructure);


        var methodToken = beanStructure.descriptor.tokens[0];
        var methodName = methodToken.key.name;

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