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
            id: node.id.name,
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

module.exports = exports = ClassDeclaration;
