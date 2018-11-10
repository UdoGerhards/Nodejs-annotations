'use strict';

var IdentifierMatcher = require("../../helper/StaticMemberExpressionIdentifierMatch");

class ExpressionStatement {

    init() {
        var instance = this;
    }

    parse(node) {

        var parserResult = null;
        var identifiers = [];
        var matcher = new IdentifierMatcher();
        var result = null;

        var expression = node.expression.left;
        if (expression && expression.type == "MemberExpression") {

            identifiers = matcher.parse(expression);

            result = {
                type: expression.type,
                start: node.loc.start.line,
                end: node.loc.end.line,
                identifiers: identifiers
            }

        } else if(expression && expression.type == "Identifier") {

            result = {
                type: expression.type,
                start: node.loc.start.line,
                end: node.loc.end.line,
                identifiers: [expression.name]
            }

        }

        parserResult = {
            result: result,
            nextStatement: false
        };

        return parserResult
    }

}

module.exports= exports = ExpressionStatement;
