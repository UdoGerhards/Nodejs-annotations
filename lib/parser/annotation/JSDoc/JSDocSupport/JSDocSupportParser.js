'use strict';

var BaseParser = require("../../Base/BaseAnnotationParser");

class JSDocSupportParser extends BaseParser {

    constructor() {
        super();
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

        // Normal behavior
        switch (stage) {
            case global.stages._STASHING_:
                instance._stage(annotationInformation, beanStructure, applicationStructure);
                break;
            default:
                break;
        }

        // Childs can override normal behavior; We execute the according parser after processing 'normal' behavior
        //

        return beanStructure;

    }

    /**
     * Stage the bean
     * @type annotationInformation
     * @type beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;

        var paramText = annotationInformation.annotationValue;
        var parameterMatch = new RegExp("\([\"|\'](.*)[\"|\']\)", "g");;
        var match = parameterMatch.exec(paramText);

        let modeLabel = null;
        if (match && match.length > 2) {
            modeLabel = match[2];
        }

        let mode = null;
        switch(modeLabel) {
            case "Strict":
                mode = instance.annotation.STRICT;
                break
            case "Convert":
                mode = instance.annotation.CONVERT;
                break;
            default:
                mode = instance.annotation.CONVERT;
                break;
        }

        applicationStructure.JSDocSupport = mode;
    }
}

module.exports = exports = JSDocSupportParser;