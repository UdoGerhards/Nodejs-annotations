'use strict';

class VariableDecorationStaticMemberExpressionIdentifierMatch {

    parse(node) {
        var instance = this;
        var init = node.init;

        if (init.type === "MemberExpression") {

            var initParams = [];

            if (node.init.object.name) {
                initParams.push(node.init.object.name);
            }

            if (node.init.property.name) {
                initParams.push(node.init.property.name);
            }

            return {
                init: node.init.type,
                property: initParams
            }

        } else if (init.type = "ObjectExpression") {

            var initParams = [];

            return {
                init: node.init.type,
                property: [node.id.name]
            }
        } else {
            return {
                init: node.init.type,
                property: [node.id.name]
            }
        }
    }
}

module.exports = exports = VariableDecorationStaticMemberExpressionIdentifierMatch;
