'use strict';

class CallExpression {

    init() {
        var instance = this;
    }

    parse(node) {

        var result = {
            type: node.type,
            id: node.arguments[0].value,
        }

        return result;
    }

}

module.exports = exports = CallExpression;