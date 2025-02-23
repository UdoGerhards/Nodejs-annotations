'use strict';
import Esprima_Base from "../Base/Esprima_Base";

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

        // @\\b(type)\\b[\\s|\\S]*(\\(|\\{)\\\"?(\\b.*\\b)?\\\"?(\\)|\\})
        instance.regexAnnotation = new RegExp("@\\b("+annotationString+")\\b[\\s|\\S]*?(\\(|\\{)\\\"?(\\b.*\\b\\*?)?\\\"?(\\)|\\})*", "g");
    }

    parse(node) {
        var instance = this;
        var comment = node.value;
        var annotationList = null;

        if (comment.indexOf("@") > -1) {

            // Found annotaitons prepare to give them back
            annotationList = {
                start: -1,
                end: -1,
                annotations: []
            };

            let singleLine = comment.split("\n");

            singleLine.forEach(function (singleComment) {

                var match = null;
                do {
                    try {
                        match = instance.regexAnnotation.exec(singleComment);
                    } catch(e) {

                        throw e;
                    }

                    var annotationInfo = null;
                    if (match && match[0]) {

                        let commentObject = singleComment.replace(/[\r\n]/g, "").trim();
                        let annotationValue = match[3];

                        // Alternativ annotattion value due to regex sometimes failing
                        let valMatch = singleComment.split("(");

                        if (valMatch[1]) {
                            let alternativeValue = valMatch[1].replace(")", "").trim();

                            if (!annotationValue && alternativeValue) {
                                annotationValue = alternativeValue;
                            }
                        }

                        annotationInfo = {
                            "annotationValue": annotationValue,
                            "start": node.loc.start.line,
                            "end": node.loc.end.line,
                            "comment": commentObject
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
                } while (match);
            });

            return annotationList;

        } else {
            return annotationList;
        }
    }
}

export default Esprima_BlockStatement;
