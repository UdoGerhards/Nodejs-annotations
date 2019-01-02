'use strict';

/**
 * Created by udogerhards on 02.06.17.
 */
class MethodDefinition {

    init() {
        var instance = this;
    }

    parse(node) {

        var result = {
            type: node.type,
            id: node.key.name,
            kind: node.kind
        }

        if (node.loc){
            result.start = node.loc.start.line;
            result.end = node.loc.end.line;
        }

        return result;
    }

}

module.exports = exports = MethodDefinition;