'use strict';

/**
 * Created by udogerhards on 02.06.17.
 */
class MethodDefinition {

    init() {
        var instance = this;
    }

    parse(node) {

        console.log(node);

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

module.exports = exports = MethodDefinition;