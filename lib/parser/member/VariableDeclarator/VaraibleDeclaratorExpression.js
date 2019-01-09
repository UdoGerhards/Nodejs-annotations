'use strict';

class VaraibleDeclaratorExpression {

    init() {
        var instance = this;
    }

    parse(node) {
        var result = {
            type: node.type,
            id: node.id.name
        }

        return result;
    }

}

module.exports = exports = VaraibleDeclaratorExpression;
