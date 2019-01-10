'use strict';
const BaseExpression = require("../Base/BaseExpression")

class VariableDeclaration extends BaseExpression {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    /*
    * Class declaration

        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "ObjectBean",
                        "range": [
                            4,
                            14
                        ]
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [],
                        "range": [
                            18,
                            20
                        ]
                    },
                    "range": [
                        4,
                        20
                    ]
                }
            ],
            "kind": "var",
            "range": [
                0,
                21
            ]
        }

            gültig für

            var object = new Object();
            var object = {};
            var object = [];
     */

    cleanUp(node, annotationInfo) {
        let instance = this;

        annotationInfo = super.parseEsprimaToken(node, annotationInfo);

        let annotation = annotationInfo.annotation;
        if (!annotation) {
            try {
                // In case of bean constructor
                annotation = annotationInfo.descriptor.annotation;
            } catch (e) {
                console.log(annotationInfo);
            }
        }

        /*
        try {
            // VariableDeclarator is normaly used for properties
            annotation = annotationInfo.descriptor.annotation;
        } catch (e) {
            annotation = annotationInfo.annotation;
        }
        */

        /*
         * Class constructor
         */
         if (annotation.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE) {
                 /* In case of property */
                if (annotationInfo.descriptor ) {
                    try {
                        annotationInfo.descriptor.property = node.property.name;

                        annotationInfo.descriptor.className = node.declarations[0].id.name;
                        /* Either "NewExpression", ObjectExpression (for ...= {}), ArrayExpression
                            NewExpression => ... = new Object()
                            ObjectExpression => ... = {}
                            ArrayExpression => ... = []
                         */
                        annotationInfo.descriptor.classType = node.declarations[0].init.type;
                    } catch(e) {
                        console.log(node);
                    }
                } else if (annotationInfo.annotation) {
                    annotationInfo.property = node.property.name;
                    annotationInfo.className = node.declarations[0].id.name;
                    /* Either "NewExpression", ObjectExpression (for ...= {}), ArrayExpression
                        NewExpression => ... = new Object()
                        ObjectExpression => ... = {}
                        ArrayExpression => ... = []
                     */
                    annotationInfo.descriptor.classType = node.declarations[0].init.type;
                }
        }

        return annotationInfo;
    }

    parse(node) {

        var matcher = new VariableDecorationStaticMemberExpressionIdentifierMatch();
        var initializer = node.declarations[0];

        var info = matcher.parse(initializer);

        var result = {
            type: node.type,
            init: info.init,
            id: info.property[0]
        }

        return result;
    }
}

module.exports = exports = VariableDeclaration;