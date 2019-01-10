'use strict';

const BaseExpression = require("../Base/BaseExpression");

class ClassDeclaration extends BaseExpression {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    /*
     * Class declaration
            {
            "type": "ClassDeclaration",
            "id": {
                "type": "Identifier",
                "name": "Bean",
                "range": [
                    62,
                    66
                ]
            },
            "superClass": {
                "type": "Identifier",
                "name": "test",
                "range": [
                    75,
                    79
                ]
            },
     */

    cleanUp(node, annotationInfo) {
        let instance = this;

        annotationInfo = super.parseEsprimaToken(node, annotationInfo);

        let annotation = annotationInfo.descriptor.annotation;

        /*
         * Class constructor
         */
        if (annotation.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE) {
            annotationInfo.descriptor.className = node.id.name;
            /*
            ClassExpression => ... = class () {...}
            */
            annotationInfo.descriptor.classType = node.type;
        }

        return annotationInfo;
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
