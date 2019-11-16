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

        instance.contextAware = null;
        instance.supportAware = null;
        instance.moduleAware = null;
        instance.memberAware = null;

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
            astTree = esprima.parse(data, {sourceType: 'module', comment: true, tokens:true, loc: true, range: false}, function(node) {

                let parser = instance.expressionParser[node.type];

                try {

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
                } catch(e) {
                    //console.log(node.type);
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

        if (structure.length > 1) {
            structure = instance._getMultiBeanLevel(structure);
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

    _analyzeStructure(comment, tokens, structure) {

        let instance = this;

        if (!structure){
            structure = [];
        }

        for (let index=0; index < comment.annotations.length; index++) {

            let annotationInformation = comment.annotations[index];

            let AnnotationClass = annotationInformation.annotation;
            let annotationObject = new AnnotationClass;

            if (annotationObject instanceof(instance.contextAware)) {

                structure = instance._addModuleAware(annotationInformation, tokens, structure);

            } else if (annotationObject instanceof(instance.moduleAware)) {

                structure = instance._addModuleAware(annotationInformation, tokens, structure);

            } else if (annotationObject instanceof(instance.supportAware)) {

                structure = instance._addSupport(annotationInformation, tokens, structure)

            } else if (annotationObject instanceof(instance.memberAware)) {

                structure = instance._addMemberAware(annotationInformation, tokens, structure)
            }

        }

        return structure;
    }

    _addModuleAware(annotation,tokens, structure) {

        let instance = this;
        let struct = {};

        annotation.orig = {
            start: annotation.start,
            end: annotation.end
        };

        struct.descriptor = annotation;
        struct.namespace = instance.uuidV4();
        struct.structure = [];

        for (let expressionIndex = 0; expressionIndex < tokens.length; expressionIndex++) {
            let expressionObject = tokens[expressionIndex];

            let tokenParser = instance.expressionParser[expressionObject.type];
            let annotationParser = instance.annotationParser[struct.descriptor.annotation.name];

            if (tokenParser) {
                if (structure.length > 1) {
                    // Mark bean as sub
                }

                struct = tokenParser.getBeanContextAwareInformation(expressionObject, struct);
                struct = annotationParser.getAnnotationRelatedInformation(expressionObject, struct, annotation);
            }
            break;
        }

        /*
         * Build a structure when not already done
         */
        if (!structure) {

            structure = [];
            structure.push(annotation);

        } else if (structure.length == 0) {

            structure.push(struct);

        } else{
            /*
            let iIndex = 0;
                for (let structIndex = 0; structIndex < structure.length; structIndex++) {
                    if ((structure[structIndex].descriptor.end < annotation.end)) {
                        iIndex = structIndex+1;
                    } else {
                        break;
                    }
                }

            structure.splice(iIndex,0, struct);
            */
            structure.push(struct);
            }

        return structure;
    }

    _addSupport(annotation, tokens, structure) {

        let instance = this;
        let child = {};

        annotation.orig = {
            start: annotation.start,
            end: annotation.end
        };

        child = annotation;

        let iIndex = 0;
        for (let structIndex = 0; structIndex < structure.length; structIndex++) {
            if ((structure[structIndex].descriptor.end > annotation.end)) {
                iIndex = structIndex;
            }
        }

        for (let expressionIndex = 0; expressionIndex < tokens.length; expressionIndex++) {
            let expressionObject = tokens[expressionIndex];

            let tokenParser = instance.expressionParser[expressionObject.type];
            let annotationParser = instance.annotationParser[child.annotation.name];

            if (tokenParser) {
                if (structure.length > 1) {
                    // Mark bean as sub
                }
                //child = tokenParser.getBeanContextAwareInformation(expressionObject, child);
                child = annotationParser.getAnnotationRelatedInformation(expressionObject, child, annotation);
            }
            break;
        }

        if (!Array.isArray(structure[iIndex].childs)) {
            structure[iIndex].childs = [];
        }

        structure[iIndex].childs.push(child);

        return structure;
    }

    _addMemberAware(annotation, tokens, structure) {

        let instance = this;
        let struct = {};

        annotation.orig = {
            start: annotation.start,
            end: annotation.end
        };
        struct.descriptor = annotation;

            let iIndex = 0;
            for (let structIndex = 0; structIndex < structure.length; structIndex++) {
                if ((structure[structIndex].descriptor.end > annotation.end)) {
                    iIndex = structIndex;
                }
            }

            for (let expressionIndex = 0; expressionIndex < tokens.length; expressionIndex++) {
                let expressionObject = tokens[expressionIndex];

                let tokenParser = instance.expressionParser[expressionObject.type];
                let annotationParser = instance.annotationParser[struct.descriptor.annotation.name];

                if (tokenParser) {
                    if (structure.length > 1) {
                        // Mark bean as sub
                    }
                    struct = tokenParser.getBeanContextAwareInformation(expressionObject, struct);
                    struct = annotationParser.getAnnotationRelatedInformation(expressionObject, struct, annotation);
                }
                break;
            }

            structure[iIndex].structure.push(struct.descriptor);

        return structure;
    }


    _getMultiBeanLevel(aStructure) {

        let refStructure = aStructure;
        let bStructure = aStructure;
        let nameSpcArr = [];
        let beanNamespaceArr = {};
        let propArr = {};

        for (let bIndex=1; bIndex < bStructure.length; bIndex++) {

            let bBean = bStructure[bIndex];

            for(let aIndex = 0; aIndex < aStructure.length; aIndex++){

                if (aIndex != bIndex) {

                    let aBean = aStructure[aIndex];

                    if (
                        (aBean.descriptor.start <= bBean.descriptor.start) &&
                        (aBean.descriptor.end >= bBean.descriptor.end)
                    ) {
                        let beanNameSpace = refStructure[aIndex].namespace;
                        nameSpcArr.push(beanNameSpace);
                    }
                }
            }

            propArr[refStructure[bIndex].namespace]=refStructure[bIndex].descriptor.property;
            nameSpcArr.push(refStructure[bIndex].namespace);

            beanNamespaceArr[bIndex]= nameSpcArr;
            nameSpcArr = [];
        }

        for (let index = 1; index < aStructure.length; index++) {
            let beanNameSpace = beanNamespaceArr[index];
            if (beanNameSpace) {
                let nameSpaceString = beanNameSpace.join(String.fromCharCode(12));
                let propertyPath = "";
                let sep = "";
                for (let nmspcIndex=0; nmspcIndex < beanNameSpace.length; nmspcIndex++){

                    let propertyNmspc = beanNameSpace[nmspcIndex];
                    let property = propArr[propertyNmspc];

                    if (property) {
                        propertyPath += sep + property;
                        sep = "#";
                    }
                }
                aStructure[index].descriptor.property = propertyPath;
                aStructure[index].namespace = nameSpaceString;
            }
        }

        return bStructure;
    }
}

module.exports = exports = new StructureParser();