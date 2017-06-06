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
        var annotationList = null;

        if (comment.indexOf("@") > -1) {

            // Found annotaitons prepare to give them back
            annotationList = {
                start: -1,
                end:-1,
                annotations:[]
            };

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
                    if (annotationList.start == -1) {
                        annotationList.start = annotationInfo.start;
                    }

                    if (annotationList.end < annotationInfo.end) {
                        annotationList.end = annotationInfo.end;
                    }

                    var annotationObject = instance.annotations[match[1]];

                    annotationInfo.annotation = annotationObject;
                    annotationList.annotations.push(annotationInfo);

                }
            } while(match);

            return annotationList;

        } else {
            return annotationList;
        }
    }
}

module.exports = exports = Block;
