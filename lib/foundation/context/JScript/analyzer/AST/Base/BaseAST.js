'use strict';

class BaseAST {

    static expressions = {
        CLASS_DECLARATION: "ClassDeclaration",
        CLASS_EXPRESSION: "ClassExpression",
        FUNCTION_DECLARATION: "FunctionDeclaration",
        EXPRESSION_STATEMENT: "ExpressionStatement",
        ASSIGNMENT_EXPRESSION: "AssignmentExpression",
        METHOD_DEFINITION: "MethodDefinition",
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

        instance.LogManager = null;

    }
}

export default BaseAST;