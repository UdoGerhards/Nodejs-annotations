'use strict';

class ClassDeclaration {

    constructor() {

    }

    init() {
        var instance = this;
    }

    parse(node) {

        var result = {
            type: node.type,
            id: node.id.name
        };

        if (node.loc) {
            result.start= node.loc.start.line;
            result.end = node.loc.end.line
        }

        var parserResult = {
            result: result,
            nextStatement: false
        }

        return result;
    }

}

module.exports = exports = ClassDeclaration;
