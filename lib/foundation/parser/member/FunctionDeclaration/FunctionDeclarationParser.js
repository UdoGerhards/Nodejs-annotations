'use strict';

class FunctionDeclaration {

    init() {
        var instance = this;
    }

    parse(node) {

        var result = {
            type: node.type,
            id: node.id.name,
            loc: node.id.loc
        }

        return result;
    }

}

module.exports = exports = FunctionDeclaration;
