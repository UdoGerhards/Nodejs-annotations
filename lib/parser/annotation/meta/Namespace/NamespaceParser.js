'use strict';

var NamespaceAnnotation = require("../../../../annotation/meta/Namespace/NamespaceAnnotationClass.js")
    , BeanParser = require("../../instance/Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util");


class NamespaceParser extends BeanParser {

    static get SUPPORTS() {
        return [NamespaceAnnotation.name]
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
                break;
            case global.stages._INSTANTIATE_:
                instance._instantiate(annotationInformation, beanStructure, applicationStructure);
                break;
            case global.stages._FINISH_SETUP_:
                break;
            default:
                break;
        }

    }

    /**
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _instantiate(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        // Match given params
        var ParamRegex = new RegExp("\\((.*?)\\)", "g");
        var paramMatch  = ParamRegex.exec(annotationInformation.annotationValue);

        var namespace = null;
        var canonicalName = null;

        if (paramMatch && paramMatch.length > 0) {
            var SingleParamRegex = new RegExp("(.+?)(?:,|$)", "g");

            var singleParamMatch = null;
            while(singleParamMatch = SingleParamRegex.exec(paramMatch[1])) {

                var param = singleParamMatch[1].split("=");

                var parameter = param[0].replace(/\"/g, "").replace(/\'/g).trim();
                var value = param[1].replace(/\"/g, "").replace(/\'/g).trim();

                switch(parameter) {
                    case "namespace":
                        namespace = value;
                        break;
                    case "canonical":
                        canonicalName = value;
                        break;
                }
            }
        }

        // Get the descriptior for current structure
        annotationInformation = beanStructure.descriptor;

        /*
         * Namespace
         */
        if (!namespace) {

            // Get a dedicated bean name if set as parameter in the annotation
            var paramText = annotationInformation.annotationValue;

            var parameterMatch = new RegExp("\([\"|\'](\\w.*\\w)[\"|\']\)", "g");

            var match = parameterMatch.exec(paramText);
            if (match && match.length > 2) {
                namespace = match[2];
            }
        }

        /*
         * Canonical name
         */
        if (!canonicalName) {

            var annotationInformation = beanStructure.descriptor;

            // Get the name of the class or property definition
            var leadingToken = annotationInformation.tokens[0];
            var parser = instance.tokenParser[leadingToken.type];

            var result = parser.parse(leadingToken);
            canonicalName = result.id;
        }

        beanStructure._instance._namespace = namespace;
        beanStructure._instance._canonicalName = canonicalName;
    }
}

module.exports = exports = NamespaceParser;