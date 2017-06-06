'use strict';

var glob = require("glob")
    , estraverse = require("estraverse")
    , esprima = require("esprima")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , dotObject = require("dot-object")
    , Bean = require(process.env.PWD + path.sep + "lib" + path.sep + "annotation" + path.sep + "instance/Bean/BeanAnnotationClass.js")
    , shortId = require("shortid");

const uuidV4 = require('uuid/v4');

class StructureParser {
    constructor() {
        var instance = this;
        instance.expressionParser = null;
        instance.logger = null;
        instance.removeTokens = [];
        instance.lightTokenInformation = true;
        instance.removeLocationInformation = true;
    }


    init() {

        var instance = this;
        var logger = instance.logger;

    }

    /**
     * Parses a given file an builds bean context information
     *
     * @param file
     * @returns
     */
    parse(fileInfo) {
        var instance = this;
        var path = fileInfo[0];
        var data = fileInfo[1];
        var logger = instance.logger;

        /*
         *  Get file as tokens
         */
        var astTree = esprima.parse(data, {sourceType: 'module', comment: true, loc: true, range: false});
        var flat = instance._flatAstTree(astTree);

        /*
         * Extract all comments with annotation
         */
        var comments = {};
        astTree.comments.forEach(function (node) {
            comments[node.loc.start.line] = node;
        });


        var beanStack = instance._getBeanStack(comments, flat);

        /*
         * Clean beans
         */
        beanStack = instance._clean(beanStack, path);

        logger.trace(util.inspect(beanStack, {depth: null}));

        return beanStack;
    }

    _getBeanStack(comments, tokens) {
        var instance = this;
        var beanStack = [];
        var bean = null;
        var lastCommentProcessed = null;

        _.forEach(comments, function (node, key) {

            var parser = instance.expressionParser[node.type];

            if (typeof parser !== "undefined") {

                var commentStructure = parser.parse(node);

                if (commentStructure) {

                    switch (parser.constructor.name) {
                        case "Block":
                        case "Line":

                            // Prepare base information for annotation

                            var annotationTokensRaw = instance._getNearestToken(commentStructure.end, tokens);
                            var codeStart = annotationTokensRaw[0].loc.start.line;
                            var codeEnd = annotationTokensRaw[0].loc.end.line;

                            commentStructure.codeStart = codeStart;
                            commentStructure.codeEnd = codeEnd;
                            commentStructure.tokens = instance._cleanTokens(annotationTokensRaw);

                            commentStructure.annotations.forEach(function (annotationInfo) {

                                annotationInfo.codeStart = codeStart;
                                annotationInfo.codeEnd = codeEnd;

                                // Check if we already have a "main" annotationInfo processed the last time; if so, check if the position of the current annotationInfo is within the last annotationInfo and the start of its source code. if so, we have a subannotationInfo.

                                // 1.) Check if we have a subannotation for the desribtor annotation
                                if (bean && (typeof bean.descriptor !== "undefined") && annotationInfo.start >= bean.descriptor.start && annotationInfo.end <= bean.descriptor.codeStart) {
                                    bean.descriptor.childs = bean.descriptor.childs || [];
                                    annotationInfo.parent = bean.descriptor.annotation;
                                    bean.descriptor.childs.push(annotationInfo);
                                } else if (bean && bean.structure.length > 0 && annotationInfo.start >= bean.structure[bean.structure.length - 1].start && annotationInfo.end <= bean.structure[bean.structure.length - 1].codeStart) {
                                    bean.structure[bean.structure.length - 1].childs = bean.structure[bean.structure.length - 1].childs || [];
                                    annotationInfo.parent = bean.structure[bean.structure.length - 1].annotation;
                                    bean.structure[bean.structure.length - 1].childs.push(annotationInfo);
                                } else {

                                    // Process main bean

                                    if (annotationInfo.annotation.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE) {

                                        annotationInfo.tokens = commentStructure.tokens;
                                        bean = {
                                            stage: global._BUILD_STRUCTURE_,
                                            descriptor: annotationInfo,
                                            end: codeEnd,
                                            structure: []
                                        };
                                        beanStack.push(bean);

                                    } else {
                                        annotationInfo.tokens = commentStructure.tokens;
                                        bean.structure.push(annotationInfo);
                                    }
                                }
                            });
                            break;
                    }
                }
            }
        });

        return beanStack;
    }

    _clean(beanStack, path) {

        if (beanStack.length > 1) {

            var lastBean = beanStack[beanStack.length - 1];          // Get the last bean

            // Now find last position within last bean and get remaining elements
            var lastLineInBean = lastBean.end;
            var remaining = null;
            var index = 0;

            while (!remaining && index < lastBean.structure.length) {
                var next = lastBean.structure[index];

                if (next.end <= lastLineInBean) {
                    index++
                } else {
                    remaining = lastBean.structure.splice(index, lastBean.structure.length - 1);      // Get remaining elements
                }
            }

            if (remaining) {
                remaining.forEach(function (remaining) {
                    var beanStackIndex = beanStack.length - 2;
                    var stored = false;
                    while (!stored && beanStackIndex < beanStack.length) {

                        var end = beanStack[beanStackIndex].end;

                        if (end > remaining.start || beanStackIndex === 0) {
                            beanStack[beanStackIndex].structure.push(remaining);
                            stored = true;
                        } else {
                            beanStackIndex--;
                        }
                    }
                });
            }
        }

        var finishedBeans = {};

       // beanStack.reverse();

        /* Get according tokens
        for (var index = 0; index < beanStack.length; index++) {

            var finishedBean = {
                path: path,
                descriptor: beanStack[index].descriptor,
                structure: beanStack[index].structure,
                beanName: beanStack[index].beanName
            }

            finishedBeans.push(finishedBean);
        }*/

        // Build namespace
        var namespace = "";
        var separator = "";

        for (var index = 0; index < beanStack.length; index++) {

            var identifier = uuidV4();
            namespace += separator + identifier;

            var finishedBean = {
                path: path,
                descriptor: beanStack[index].descriptor,
                structure: beanStack[index].structure,
                beanName: beanStack[index].beanName,
                namespace: namespace
            }

            finishedBeans[identifier] = finishedBean;

            separator = ":";
        }

        return finishedBeans;
    }

    _getNearestToken(line, tokens) {
        var instance = this;
        var next = -1;

        _.keys(tokens).map(function (lineNumberAsString) {
            if (next === -1) {
                var lineNumber = parseInt(lineNumberAsString);
                if (lineNumber > line) {
                    next = lineNumber;
                }
            }
        });


        return tokens[next];
    }

    _flatAstTree(astTree) {

        var flat = {};

        estraverse.traverse(astTree, {
            enter: function (node, parent) {

                if (!flat[node.loc.start.line]) {
                    flat[node.loc.start.line] = [];
                }

                if (node.type !== "Program" && node.type !== "ExpressionStatement") {
                    var information = node;
                    //information.body = null;
                    flat[node.loc.start.line].push(information);
                }
            },
            leave: function (node, parent) {
            }
        });

        return flat;
    }

    _cleanTokens(tokens) {
        var instance = this;

        var cleanedTokens = [];
        tokens.forEach(function (token) {

            var tokenType = token.type;
            if (!instance.removeTokens.includes(tokenType)) {
                token.loc = null;
                delete token.loc;

                /*
                 * Cleanout some unnecessary information carried with the following declaration types
                 */

                if (instance.lightTokenInformation) {
                    if (tokenType == "FunctionDeclaration" || tokenType === "ClassDeclaration") {
                        token.body = null;
                        delete token.body;
                    }

                    if (tokenType === "MethodDefinition") {
                        token.value = null;
                        delete token.value;
                    }
                }

                // Remove location information from tokens
                if (instance.removeLocationInformation) {
                    var tokenStr = dotObject.dot(token);

                    var tokenStrWithoutLoc = {}
                    for (var dotProp in tokenStr) {
                        if (!dotProp.includes(".loc.")) {
                            tokenStrWithoutLoc[dotProp] = tokenStr[dotProp];
                        }
                    }

                    token = dotObject.object(tokenStrWithoutLoc);
                }

                cleanedTokens.push(token);
            }
        });

        return cleanedTokens;

    }
}

module.exports = exports = new StructureParser();
