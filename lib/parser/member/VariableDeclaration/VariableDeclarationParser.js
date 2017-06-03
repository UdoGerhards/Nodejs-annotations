'use strict';

var VariableDecorationStaticMemberExpressionIdentifierMatch = require("../../helper/VariableDecorationStaticMemberExpressionIdentifierMatch");

class VariableDeclaration {

    init() {
        var instance = this;
    }

    parse(node) {

        var matcher = new VariableDecorationStaticMemberExpressionIdentifierMatch();
        var initializer = node.declarations[0];

        var info = matcher.parse(initializer);

        var result = {
            type: node.type,
            init: info.init,
            name: info.property,
            start: node.loc.start.line,
            end: node.loc.end.line
        }



        var parserResult = {
            result: result,
            nextStatement: false
        }

        return parserResult
    }
}

module.exports = exports = VariableDeclaration;