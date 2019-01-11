'use strict';
const Esprima_Base = require("../Base/Esprima_Base");

class Esprima_BlockStatement extends Esprima_Base {

    constructor() {

        super();
        var instance = this;

        instance.regexAnnotation = null;
        instance.annotations = null;
        instance.LogManager = null;
        instance.logger = null;

    }

    init() {
        var instance = this;

        instance.logger = instance.LogManager.getLogger(instance);
        var logger = instance.logger;

        let annotationKeys = Object.keys(instance.annotations);
        let annotationString = annotationKeys.join("|");

        logger.trace(annotationString);
        instance.regexAnnotation = new RegExp("@\\b("+annotationString+")\\b[\s|\S]*\\(\"?(\\b.*\\b)?\"?\\)", "g");
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
                    //console.log(instance.regexAnnotation);

                    var annotationInfo = null;
                    if (match && match[0]) {

                        annotationInfo = {
                            "annotationValue": match[2] || null,
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

module.exports = exports = Esprima_BlockStatement;
