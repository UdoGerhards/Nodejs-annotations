'use strict';

const Esprima_Base = require("../Base/Esprima_Base")

class Esprima_FunctionDeclaration extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    /*
     * Class declaration

            "type": "Esprima_FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": "NestedBean",
                "range": [
                    74,
                    84
                ]
            }
     */

    cleanUp(node, annotationInfo) {
        let instance = this;

        let annotation = annotationInfo.descriptor.annotation;

        /*
         * Class constructor
         */
        if (annotation.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE) {
            annotationInfo.descriptor.className = node.id.name;
            /*
              FunctionExpression => ... = function() {...}
             */
            annotationInfo.descriptor.classType = node.type
        }

        return annotationInfo;
    }

    parse(node) {

        var result = {
            type: node.type,
            id: node.id.name,
            loc: node.id.loc
        };

        return result;
    }

}

module.exports = exports = Esprima_FunctionDeclaration;
