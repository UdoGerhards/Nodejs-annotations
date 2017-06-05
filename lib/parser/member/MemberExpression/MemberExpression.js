'use strict';

class MemberExpression {

    init() {
        var instance = this;
    }

    parse(node) {

        var result = {
            type: node.type,
            id: node.property.name
        }

        return result;
    }

}

module.exports = exports = MemberExpression;
