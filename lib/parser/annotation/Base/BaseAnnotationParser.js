'use strict';

class BaseAnnotationParser {

    static get SUPPORTS() {return null;};

    constructor() {

        var instance = this;
        var annotationParser = {};
        var tokenParser = {};

    }

    init() {

    }

    parse(annotationInformation, beanObject, beanStructure) {

        var instance = this;

        var childs = annotationInformation.childs;
        if (childs.length > 0) {
            beanObject = instance._processSupportiveAnnotations(childs, beanObject, beanStructure);
        }

        return beanObject;

    }

    /**
     * Executs parser for supportive annotations
     *
     * @param supportiveAnnotations
     * @param beanObject
     * @param beanStructure
     * @private
     */
    _processSupportiveAnnotations(supportiveAnnotations, beanObject, beanStructure) {

        var instance = this;

        if (childs.length > 0) {
            for (var childIndex = 0; childIndex < childs.length; childIndex++) {
                var child = childs[childIndex];
                var childAnnotationParser = instance.annotationParser[child.annotation];
                beanObject = childAnnotationParser.stage(child, beanObject, beanStructure);
            }
        }

        return beanObject;
    }

    /**
     * Returns the nearest token for a given line
     *
     * @param line
     * @param tokens
     * @returns {*}
     * @private
     */
    _getNearestToken(line, tokens) {
        var instance = this;
        var next = -1;

        _.keys(tokens).map(function(lineNumberAsString) {
            if (next === -1) {
                var lineNumber = parseInt(lineNumberAsString);
                if (lineNumber > line) {
                    next = lineNumber;
                }
            }
        });


        return tokens[next][0];
    }
}

module.exports = exports = BaseAnnotationParser;
