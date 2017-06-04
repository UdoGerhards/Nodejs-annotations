'use strict';

var path = require("path")
    , util = require("util")
    , Bean = require(process.env.PWD+path.sep+"lib"+path.sep+"annotation"+path.sep+"instance/Bean/BeanAnnotationClass.js")
    , _ = require("lodash");

class Block {

    constructor() {
        var instance = this;

        instance.regexAnnotation = null;
        instance.annotations = null;

    }

    init() {
        var instance = this;

        var logger = instance.logger;

        var annotationString = "";
        var separator = "";

        _.forEach(instance.annotations, function(annotationClass, annotationName) {
            annotationString += separator+annotationName;
            separator = "|";
        });

        logger.trace(annotationString);
        instance.regexAnnotation = new RegExp("@\\b("+annotationString+")\\b[\s|\S]*\((.*)\)", "g");
    }

    parse(node) {
        var instance = this;
        var comment = node.value;

        var mainAnnotation = null;
        var childAnnotations = [];
        var start = -1;
        var end = 0;

        if (comment.indexOf("@") > -1) {
            var match = null;
            do{
                match = instance.regexAnnotation.exec(comment);

                var annotationInfo = null;
                if (match && match[1]) {

                    annotationInfo = {
                        "annotationValue": match[2],
                        "start": node.loc.start.line,
                        "end": node.loc.end.line
                    };

                    // Save positions
                    if (start == -1) {
                        start = annotationInfo.start;
                    }

                    if (end < annotationInfo.end) {
                        end = annotationInfo.end;
                    }

                    var annotationObject = instance.annotations[match[1]];
                    annotationInfo.annotation = annotationObject;

                    if ((annotationObject.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE) || (annotationObject.TYPE & global.TYPE_ANNOTATION_TARGET)) {
                        mainAnnotation = annotationInfo;
                    } else {
                        childAnnotations.push(annotationInfo);
                    }
                }
            } while(match);

            var result = null;
            if (mainAnnotation) {

                result =  {
                    "main": mainAnnotation,
                    "childs": childAnnotations,
                    "start": start,
                    "end": end
                }
            }

            parserResult = {
                result: result
            }

            return parserResult;

        } else {

            var parserResult = {
                result: null
            }

            return parserResult
        }
    }
}

module.exports = exports = Block;
