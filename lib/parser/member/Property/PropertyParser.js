'use strict';

class Property {

    init() {
        var instance = this;
    }

    parse(node) {

        var result = {
            type: node.type,
            id: node.key.name,
            start: node.loc.start.line,
            end: node.loc.end.line,
            kind: node.kind
        }

        var parserResult = {
            result: result,
            nextStatement: false
        }

        return parserResult
    }

}

module.exports = exports = Property;