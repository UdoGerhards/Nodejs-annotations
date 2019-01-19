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

        instance.beautify = null;

        /* External resources */
        // TODO: Maybe remove util
        instance.util = null;
        instance.esprima = null;
        instance.uuidV4 = null;

        instance.objectTypes = {};
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
        let flat = {};

        //console.log(path);

        data = data.replace(/(^#!.*)/,"");
        data = beautify(data, { indent_size: 2 });

        /*
         *  Get file as tokens
         */
        var astTree = null;
        try {
            astTree = esprima.parse(data, {sourceType: 'module', comment: true, tokens:true, loc: true, range: false}, function(node){

                let parser = instance.expressionParser[node.type];

                if (!node.directive && parser && parser.isValid(node)) {
                    let parserAvailable = Object.keys(instance.expressionParser);
                    //if (node.type !== "Program" && node.type !== "ExpressionStatement") {
                    if (parserAvailable.includes(node.type)) {
                        var information = node;
                        //information.body = null;

                        if (!flat[node.loc.start.line]) {
                            flat[node.loc.start.line] = [];
                        }
                        flat[node.loc.start.line].push(information);
                    }
                }
            });
        } catch (e) {
            logger.error(path);
            throw e;
        }
        //var flat = instance._flatAstTree(astTree);

        /*
         * Extract all comments with annotation
         */
        var comments = {};
        astTree.comments.forEach(function (node) {
            comments[node.loc.start.line] = node;
        });

        var funcBrackets = astTree.tokens.filter(function(token){


            let keywords = ["function", "class"];
            let punctuator = ["{", "}"];

            if (token.type=="Keyword" && keywords.includes(token.value)) {
                    return true;
            } else if (token.type=="Punctuator" && punctuator.includes(token.value)) {
                    return true;
            }
        });

        let structure = instance._getBeanStack(comments, flat);

        structure.forEach(function(object, index){
            structure[index].path = path;
        });

        /*
         * Clean beans
         */
        logger.trace(util.inspect(structure, {depth: null}));

        return structure;
    }

    _getBeanStack(comments, tokens) {
        var instance = this;
        let structure = [];

        for (let key in comments) {

            let node = comments[key];

            var parser = instance.expressionParser[node.type];

            if (typeof parser !== "undefined") {

                var commentStructure = parser.parse(node);

                if (commentStructure) {

                    switch (parser.constructor.name) {
                        case "Esprima_BlockStatement":
                        case "Esprima_LineStatement":

                            // Prepare base information for annotation
                            var annotationTokensRaw = instance._getNearestToken(commentStructure.end, tokens);
                            structure = instance._analyzeStructure(commentStructure, annotationTokensRaw, structure, tokens);
                            break;
                    }
                }
            }
        }

        structure = instance._cleanUp(structure);

        return structure;
    }

    _cleanUp(structure) {
        let instance = this;
        let logger = instance.logger;
        let namespaceArr = [];

        let propertyStack = [];
        for (let cleanIndex = 0; cleanIndex < structure.length; cleanIndex++) {

            // Namespace
            namespaceArr.push(structure[cleanIndex].namespace);

            structure[cleanIndex].namespace = namespaceArr.join(String.fromCharCode(12));

            // Remove location information

            structure[cleanIndex].codeFromTo = null;
            delete structure[cleanIndex].codeFromTo;

            structure[cleanIndex].descriptor.start = null;
            delete structure[cleanIndex].descriptor.start;

            structure[cleanIndex].descriptor.end = null;
            delete structure[cleanIndex].descriptor.end;

            // Correct class type
            if (structure[cleanIndex].descriptor.classType) {
                let definition = structure[cleanIndex].descriptor.classType;
                let newDefinition = instance.objectTypes[definition];
                if (newDefinition) {
                    structure[cleanIndex].descriptor.classType = newDefinition;
                } else {
                    logger.warn("Missing object type for '"+definition+"' parsing type ...");
                }
            }

            // Build up property path
            if (structure[cleanIndex].descriptor.property) {
                propertyStack.push(structure[cleanIndex].descriptor.property);

                if (!structure[cleanIndex].descriptor.prototypePath) {
                    structure[cleanIndex].descriptor.prototypePath = propertyStack.slice(0, propertyStack.length);

                    if (cleanIndex > 0) {
                        let beanId = propertyStack[0]+ "#"+propertyStack.slice(1, propertyStack.length).join(":");
                        structure[cleanIndex].descriptor.annotationValue = beanId;
                    }

                    for (let structCleanIndex = 0; structCleanIndex < structure[cleanIndex].structure.length;structCleanIndex++) {
                        let structPropStack = [];
                        structPropStack = structPropStack.concat(propertyStack);
                        structPropStack.push(structure[cleanIndex].structure[structCleanIndex].property);
                        structure[cleanIndex].structure[structCleanIndex].prototypePath = structPropStack.slice(0, structPropStack.length);

                        //console.log(structPropStack.slice(0, structPropStack.length));

                    }
                }
            }
        }

        return structure;
    }

    _getNearestToken(line, tokens) {
        var instance = this;
        var next = -1;

        Object.keys(tokens).map(function (lineNumberAsString) {
            if (next === -1) {
                var lineNumber = parseInt(lineNumberAsString);
                if (lineNumber > line) {
                    next = lineNumber;
                }
            }
        });

        return tokens[next];
    }

    _analyzeStructure(comment, tokens, structure, tokenStruct) {

        let instance = this;
        let span = tokens[0];
        let struct =  {};
        let newBean = false;
        let uuidV4 = instance.uuidV4;

        /*
         * If we have a main bean entry, add it as maser
         */
        for (let annoIndex = 0; annoIndex < comment.annotations.length; annoIndex++) {
            let annotation = comment.annotations[annoIndex].annotation;
            if (annotation.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE) {

                struct.descriptor = comment.annotations[annoIndex];
                struct.codeFromTo = {
                    start: span.loc.start.line,
                    end: span.loc.end.line
                    };
                struct.namespace = uuidV4();
                struct.structure = [];

                for (let expressionIndex = 0; expressionIndex < tokens.length; expressionIndex++) {
                    let expressionObject = tokens[expressionIndex];

                        let tokenParser = instance.expressionParser[expressionObject.type];
                        if (tokenParser) {
                            if (structure.length > 1) {
                                // Mark bean as sub

                            }

                            //console.log(tokenParser.constructor.name);
                            struct = tokenParser.getBeanContextAwareInformation(expressionObject, struct);
                        }
                        break;
                }
                structure.push(struct);
                newBean = true;
            } else if (annotation.TYPE & global.TYPE_ANNOTATION_SUPPORT) {
                if (!struct.childs) {
                    struct.childs = [];
                }
                struct.childs.push(comment.annotations[annoIndex]);
            }
        }

        /*
         * Add "Qualifier" etc.
         */
        if (!newBean) {
            let searchArr = structure;
            searchArr.reverse();
            for (let index=0; index<comment.annotations.length; index++) {
                let annotation = comment.annotations[index];

                let added = false;
                for (let searchIndex = 0; searchIndex < searchArr.length; searchIndex++) {
                    let beanInfo = searchArr[searchIndex];

                    let start = annotation.start;
                    let end = annotation.end;

                    let beanStart = beanInfo.codeFromTo.start;
                    let beanEnd = beanInfo.codeFromTo.end;

                    if (start >= beanStart && end <= beanEnd) {
                        for (let expressionIndex = 0; expressionIndex < tokens.length; expressionIndex++) {
                            let expressionObject = tokens[expressionIndex];

                            let tokenParser = instance.expressionParser[expressionObject.type];
                            if (tokenParser) {
                                annotation = tokenParser.getBeanInformation(expressionObject, annotation);

                                if (!annotation.prototypePath) {
                                    structure[searchIndex].structure.push(annotation);
                                } else {
                                    annotation.property = annotation.prototypePath[annotation.prototypePath.length-1];
                                    structure[annotation.prototypePath.length-1].structure.push(annotation);
                                }
                                added = true;
                            }
                        }
                        break;
                    }
                }

                if (!added) {
                    for (let expressionIndex = 0; expressionIndex < tokens.length; expressionIndex++) {
                        let expressionObject = tokens[expressionIndex];
                        let tokenParser = instance.expressionParser[expressionObject.type];
                        if (tokenParser) {
                            annotation = tokenParser.getBeanInformation(expressionObject, annotation);
                            if (!annotation.prototypePath) {
                                structure[structure.length-1].structure.push(annotation);
                            } else {
                                annotation.property = annotation.prototypePath[annotation.prototypePath.length-1];
                                let index = (structure.length-annotation.prototypePath.length);
                                structure[index].structure.push(annotation);
                            }
                        }
                    }

                }
            }
            searchArr.reverse();
        }

        return structure;
    }
}

module.exports = exports = new StructureParser();