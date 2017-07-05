'use strict';

var DummyAnnotation = require("../../../../annotation/instance/Dummy/DummyAnnotationClass.js")
    , BeanParser = require("../Bean/BeanAnnotationParser.js")
    , path = require("path")
    , util = require("util");


class DummyParser extends BeanParser {

    static get SUPPORTS() {
        return [DummyAnnotation.name]
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
            case global.stages._INSTANTIATE_:
                break;
            case global.stages._FINISH_SETUP_:
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
    _stage(annotationInformation, beanStructure, applicationStructure) {
        var instance = this;

        // Get a dedicated bean name if set as parameter in the annotation
        var paramText = annotationInformation.annotationValue;

        var parameterMatch = new RegExp("\([\"|\'](\\w.*\\w)[\"|\']\)", "g");;
        var match = parameterMatch.exec(paramText);

        var beanName = null;
        if (match && match.length > 2) {
            beanName = match[2];
        }

        beanStructure.beanName = beanName;         // Either we have dedicated descriptor or we take the property name as bean name
        applicationStructure.nameToNamespace[beanStructure.beanName] = beanStructure;
    }
}

module.exports = exports = DummyParser;