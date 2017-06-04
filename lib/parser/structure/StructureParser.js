'use strict';

var glob = require("glob")
    , estraverse = require("estraverse")
    , esprima = require("esprima")
    , path = require("path")
    , util = require("util")
    , _ = require("lodash")
    , traverse = require("traverse")
    , Bean = require(process.env.PWD + path.sep + "lib" + path.sep + "annotation" + path.sep + "instance/Bean/BeanAnnotationClass.js");

class StructureParser {
    constructor() {
        var instance = this;
        instance.annotations = null;
        instance.expressionParser = null;
        instance.logger = null;
        instance.regexAnnotation = null;
        instance.removeTokens = [];
    }


    init() {

        var instance = this;
        var logger = instance.logger;

        var annotationString = "";
        var separator = "";

        _.forEach(instance.annotations, function (annotationClass, annotationName) {
            annotationString += separator + annotationName;
            separator = "|";
        });

        logger.trace(annotationString);
        instance.regexAnnotation = new RegExp("@\\b(" + annotationString + ")\\b[\s|\S]*\((.*)\)", "g");
    }

    /**
     * Parses a given file an builds bean context information
     *
     * @param file
     * @returns
     */
    parse(data) {
        var instance = this;

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
        beanStack = instance._clean(beanStack, flat);

        return beanStack;
    }

    _getBeanStack(comments, tokens) {
        var instance = this;
        var beanStack = [];
        var bean = null;

        _.forEach(comments, function (node, key) {

            var parser = instance.expressionParser[node.type];

            if (typeof parser !== "undefined") {

                var parserResult = parser.parse(node);

                if (parserResult.result) {

                    switch (parser.constructor.name) {
                        case "Block":
                        case "Line":
                            if (parserResult.result && parserResult.result.main) {

                                var annotationTokensRaw = instance._getNearestToken(parserResult.result.end, tokens);
                                var codeEnd = annotationTokensRaw[0].loc.end.line;
                                parserResult.result.tokens = instance._cleanTokens(annotationTokensRaw);

                                if (parserResult.result.main.annotation.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE) {

                                    bean = {
                                        descriptor: parserResult.result,
                                        end: codeEnd,
                                        structure: []
                                    };

                                    beanStack.push(bean);

                                } else {
                                    bean.structure.push(parserResult.result)
                                }
                            }
                            break;
                    }
                }
            }
        });

        return beanStack;
    }

    _clean(beanStack, tokens) {
        var instance = this;

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

        var finishedBeans = [];
        var alreadyUsedLines = [];

        beanStack.reverse();

        // Get according tokens
        for (var index = 0; index < beanStack.length; index++) {

            var finishedBean = {
                descriptior: beanStack[index].descriptor,
                structure: beanStack[index].structure
            }

            finishedBeans.push(finishedBean);
        }

        finishedBeans.reverse();
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

                if (tokenType == "FunctionDeclaration" || tokenType === "ClassDeclaration") {
                    token.body = null;
                    delete token.body;
                }

                if (tokenType === "MethodDefinition") {
                    token.value = null;
                    delete token.value;
                }

                cleanedTokens.push(token);
            }
        });

        return cleanedTokens;

    }
}

module.exports = exports = StructureParser;
