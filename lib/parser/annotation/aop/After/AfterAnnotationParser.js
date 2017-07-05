'use strict';

var BeforeAnnotation = require("../../../../annotation/aop/Before/BeforeAnnotationClass.js")
    , BeanParser = require("../../instance/Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash");


class BeforeAnnotationParser extends BeanParser {

    static get SUPPORTS() {
        return [BeforeAnnotation.name]
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

        // Normal behavior
        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
                instance._finish(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        super.parse(annotationInformation, beanStructure, applicationStructure);

    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _finish(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        var target = annotationInformation.annotationValue;



    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        var targetBean = null;
        var targetFunction = null;

        // Match given params
        var ParamRegex = new RegExp("\(\"(.*?)\"\)", "g");
        var paramMatch = null;
        while(paramMatch  = ParamRegex.exec(annotationInformation.annotationValue)) {

            var value = paramMatch[2];

            if (!targetBean) {
                targetBean = value;
            } else if (!targetFunction) {
                targetFunction = value;
            }
        }

        // Match function name to wire
        var leadingToken = annotationInformation.tokens[0];
        var parser = instance.tokenParser[leadingToken.type];

        var propertyResult = parser.parse(leadingToken);
        var wiredFunction = propertyResult.id;

        annotationInformation.target = targetBean;
        annotationInformation.targetFunction = targetFunction;
        annotationInformation.wiredFunction = wiredFunction;
    }

    /**
     * Inject the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _finish(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        var targetBeanName = annotationInformation.target;
        var targetFunction = annotationInformation.targetFunction;
        var wiredFunction = annotationInformation.wiredFunction;

        if (typeof targetBeanName !== "undefined" && typeof targetFunction !== "undefined") {

            // Get the target instance
            var target = applicationStructure.nameToNamespace[targetBeanName]._instance;
            var targetFunc = target[targetFunction];

            // get upper bean
            var namespace = beanStructure.namespace.split(":");
            var source = instance._getSingleBeanStructureFromApplicationStack(namespace, applicationStructure);

            // Get function to wire
            var wired = source._instance[wiredFunction];

            // Create before proxy
            var proxy = _.wrap(targetFunction, function(targetFunction){
                var handoverArguments = _.tail(arguments);
                handoverArguments = wired.apply(source, handoverArguments);    // Namespace of source (wired)
                return targetFunc.apply(target,handoverArguments);             // Namespace of taget
            });

            target[targetFunction] = proxy;
        }
    }
}

module.exports = exports = BeforeAnnotationParser;