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
            id: info.property[0]
        }

        return result;
    }
}

module.exports = exports = VariableDeclaration;