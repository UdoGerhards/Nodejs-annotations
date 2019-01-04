'use strict';

/**
 * Class StructurParser
 *
 * OK!!! If you think you can deal with this class do it. But it is fucking complex and fucking complex
 *
 */
class StructureParser {
    constructor() {
        var instance = this;

        /* Logging */
        instance.LogManager = null;
        instance.logger = null;

        /* Internal utils */
        instance.annotationParser = {};
        instance.expressionParser = null;
        instance.removeTokens = [];
        instance.lightTokenInformation = true;
        instance.removeLocationInformation = true;

        instance.beautify = null;
        instance._ = null;

        /* External resources */
        // TODO: Maybe remove util
        instance.util = null;
        instance.esprima = null;
        instance.estraverse = null;
        instance.uuidV4 = null;
    }


    init() {

        var instance = this;
        instance.logger = instance.LogManager.getLogger(instance);

        var logger = instance.logger;

        logger.trace("Initializing ContextBuilder");

        instance.beautify = instance.beautify.js_beautify;

        logger.info("StructureParser initialized");
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
        var beautify = instance.beautify;
        var util = instance.util;
        var esprima = instance.esprima;

        data = data.replace(/(^#!.*)/,"");
        data = beautify(data, { indent_size: 2 });

        /*
         *  Get file as tokens
         */
        var astTree = null;
        try {
            astTree = esprima.parse(data, {sourceType: 'module', comment: true, loc: true, range: false});
        } catch (e) {
            logger.error(path);
            throw e;
        }
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
        var _ = instance._;

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
                            var codeStart = null;

                            try {
                                codeStart = annotationTokensRaw[0].loc.start.line;
                            } catch(error) {
                                logger.error(error);
                            }
                            var codeEnd = annotationTokensRaw[0].loc.end.line;

                            commentStructure.codeStart = codeStart;
                            commentStructure.codeEnd = codeEnd;
                            commentStructure.tokens = instance._cleanTokens(annotationTokensRaw);

                            // console.log(commentStructure);

                            commentStructure.annotations.forEach(function (annotationInfo) {

                                annotationInfo.codeStart = codeStart;
                                annotationInfo.codeEnd = codeEnd;
                                annotationInfo.comment = node.value;

                                if (typeof instance.annotationParser[annotationInfo.annotation.name].getAnnotation === "function") {
                                    instance.annotationParser[annotationInfo.annotation.name].getAnnotation(annotationInfo, bean, beanStack);
                                }

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
                                            stage: global.phase._BUILD_STRUCTURE_,
                                            descriptor: annotationInfo,
                                            end: codeEnd,
                                            structure: []
                                        };
                                        beanStack.push(bean);

                                    } else {
                                        annotationInfo.tokens = commentStructure.tokens;

                                        // This was returning an exception if the bean is not set
                                        if (bean) {
                                            bean.structure.push(annotationInfo);
                                        }
                                    }
                                }

                                //annotationInfo.codeStart = null;
                                //annotationInfo.codeEnd = null;
                            });
                            break;
                    }
                }
            }
        });

        return beanStack;
    }

    _clean(beanStack, path) {
        var instance = this;

        if (beanStack && beanStack.length > 1) {

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

        if (beanStack.length > 0) {

            beanStack = instance._buildLevels(beanStack);

            var finishedBeans = {};

            for (var index = 0; index < beanStack.length; index++) {

                var finishedBean = {
                    path: path,
                    descriptor: beanStack[index].descriptor,
                    structure: beanStack[index].structure,
                    namespace: beanStack[index].namespace
                }

                finishedBeans[beanStack[index].namespace] = finishedBean;
            }

            return finishedBeans;
        } else {
            return [];
        }
    }

    _getNearestToken(line, tokens) {
        var instance = this;
        var next = -1;
        var _ = instance._;

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
        var instance = this;
        var estraverse = instance.estraverse;

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

        //console.log(tokens);

        var instance = this;

        var cleanedTokens = [];
        tokens.forEach(function (token) {

            var tokenType = token.type;
            if (!instance.removeTokens.includes(tokenType)) {
                //token.loc = null;
                // delete token.loc;

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
                /*
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
                */

                cleanedTokens.push(token);
            }
        });

        // Only on token should be enough

        cleanedTokens = [cleanedTokens[0]];

        return cleanedTokens;
    }

    _buildLevels(beanStack) {
        var instance = this;
        var uuidV4 = instance.uuidV4;

        var endLineLastBean = beanStack[0].end;
        var beanBeforeEnd = endLineLastBean;
        var level = 0;

        var identifier = uuidV4();
        var namespace = identifier;
        var subBeanNameSpace = [];
        var separator = ":";

        var outBeanEnd = endLineLastBean;

        var processedBeans = [];

        // Main bean
        beanStack[0].level = level;
        beanStack[0].namespace = namespace;

        if (beanStack.length > 1) {

            subBeanNameSpace.push(namespace);

            for (var index = 1; index < beanStack.length; index++) {

                var innerBeanEnd = beanStack[index].end;
                var levelIncDecrementer = instance._innerBean(outBeanEnd,innerBeanEnd);

                if (levelIncDecrementer) {
                    level += 1;
                    processedBeans.push(beanStack[index]);
                    outBeanEnd = innerBeanEnd;

                    // Namespace fragment
                    var identifier = uuidV4();
                    subBeanNameSpace.push(identifier);

                    // Write namespace to bean
                    var subBeanSpace = subBeanNameSpace.join(separator);
                    beanStack[index].namespace = subBeanSpace;

                    // Write level to bean
                    beanStack[index].level = level;

                } else {
                    if (processedBeans.length > 0) {
                        level = instance._getNextLevel(beanStack[index], processedBeans);
                    }

                    var tmpProcessed = [];
                    for (var processedBeanIndex = 0; processedBeanIndex < level-1; processedBeanIndex++) {
                        tmpProcessed.push(processedBeans[processedBeanIndex]);
                    }

                    processedBeans = tmpProcessed;

                    // Namespace fragment

                    var tmpSubBeanNameSpace = [];
                    for (var subBeanNameSpaceIndex = 0; subBeanNameSpaceIndex < level+1; subBeanNameSpaceIndex++) {
                        tmpSubBeanNameSpace.push(subBeanNameSpace[subBeanNameSpaceIndex]);
                    }
                    subBeanNameSpace = tmpSubBeanNameSpace;

                    // Namespace fragment
                    var identifier = uuidV4();
                    subBeanNameSpace[level]=identifier;

                    // Write namespace to bean
                    var subBeanSpace = subBeanNameSpace.join(separator);
                    beanStack[index].namespace = subBeanSpace;

                    // Write level to bean
                    beanStack[index].level = level;

                    outBeanEnd = innerBeanEnd;
                }
            }

        }
        return beanStack;
    }

    _innerBean(outerBeanEnd, innerBeanEnd) {
        if (outerBeanEnd > innerBeanEnd) {
            return true;           // Next level
        } else {
            return false;
        }
    }

    _getNextLevel(bean, processedBeans) {
        for (var index=processedBeans.length-1;index>-1; index--) {
            var processedBean = processedBeans[index];
            if (bean.end < processedBean.end) {
                return processedBeans[index+1].level;
            }
        }
        return 1;
    }
}

module.exports = exports = new StructureParser();