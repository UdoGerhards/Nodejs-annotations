"use strict";

class AbstractBaseAnalyzer {

    static expressions = {
        CLASS_DECLARATION: "ClassDeclaration",
        CLASS_EXPRESSION: "ClassExpression",
        FUNCTION_DECLARATION: "FunctionDeclaration",
        ASSIGNMENT_EXPRESSION: "AssignmentExpression",
        FUNCTION_EXPRESSION: "FunctionExpression",
        IDENTIFIER: "Identifier",
        LITERAL: "Literal",
        MEMBER_EXPRESSION: "MemberExpression",
        THIS_EXPRESSION: "ThisExpression",
        VARIABLE_DECLARATOR: "VariableDeclarator",
        TRAILING_COMMENTS: "TrailingComments"
    }

    constructor() {

        let instance = this;

        instance.util = null;

        instance.annotation = {};
        instance.regExp = null;

        // Reference to ClassMetaInformation class
        instance.ClassMetaInformation = null;
    }

    getAnnotation() {
        let instance = this;
        return instance.annotation
    }

    init() {

        let instance = this;

        let annotationString = Object.keys(instance.annotation);
        instance.regExp = new RegExp("@\\b(" + annotationString +
            ")\\b[\\s|\\S]*?(\\(|\\{)\\\"?(\\b.*\\b\\*?)?\\\"?(\\)|\\})*", "g");

    }

    analyze(parentNode, annotation) {

        throw new Error("Function is not implemented!");

    }
}
module.exports = exports = AbstractBaseAnalyzer;