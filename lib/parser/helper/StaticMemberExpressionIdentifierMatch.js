'use strict';

class StaticMemberExpressionIdentifierMatch {

    parse(node) {

        var instance = this;
        var result = null;
        var object = node.object;
        var property = node.property;
        var identifiers = [];

        if (object.type === "MemberExpression") {
            identifiers = instance.parse(object);
        } else {
            identifiers.push(object.name);
        }

        identifiers.push(property.name);

        return identifiers;
    }

}

module.exports = exports = StaticMemberExpressionIdentifierMatch;