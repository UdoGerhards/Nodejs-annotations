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

    parse(annotationInformation, beanObject, applicationStructure) {

        var instance = this;

        // Process childs
        var childs = annotationInformation.childs;
        if (childs.length > 0) {
            for (var childIndex = 0; childIndex < childs.length; childIndex++) {
                var child = childs[childIndex];
                // TODO: Check if this is not causing to hang the process; alterntively only hand over parent annotation information;
                //child.parent = annotationInformation.annotation;
                var childAnnotationParser = instance.annotationParser[child.annotation];
                beanObject = childAnnotationParser.stage(child, beanObject, applicationStructure);
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
    /*
    TODO: Remove if not necessary
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
    */
}

module.exports = exports = BaseAnnotationParser;
