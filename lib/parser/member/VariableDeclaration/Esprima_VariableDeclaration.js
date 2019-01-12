'use strict';
const Esprima_Base = require("../Base/Esprima_Base");
const util = require("util");

class Esprima_VariableDeclaration extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }


    /*
    {
  "type": "VariableDeclaration",
  "declarations": [
    {
      "type": "VariableDeclarator",
      "id": {
        "type": "Identifier",
        "name": "instance",
        "loc": {
          "start": {
            "line": 13,
            "column": 6
          },
          "end": {
            "line": 13,
            "column": 14
          }
        }
      },
      "init": {
        "type": "ThisExpression",
        "loc": {
          "start": {
            "line": 13,
            "column": 17
          },
          "end": {
            "line": 13,
            "column": 21
          }
        }
      },
      "loc": {
        "start": {
          "line": 13,
          "column": 6
        },
        "end": {
          "line": 13,
          "column": 21
        }
      }
    }
  ],
  "kind": "let",
  "loc": {
    "start": {
      "line": 13,
      "column": 2
    },
    "end": {
      "line": 13,
      "column": 22
    }
  }
}
     */
    isValid(node) {
        return !(node.declarations[0].init.type == "ThisExpression");
    }

    getBeanContextAwareInformation(node, annotationInfo) {

        annotationInfo = super.getBeanContextAwareInformation(node, annotationInfo);

        if (node.property) {
            annotationInfo.descriptor.property = node.property.name;
        }

        annotationInfo.descriptor.property = node.declarations[0].id.name;
        annotationInfo.descriptor.className = node.declarations[0].id.name;
        annotationInfo.descriptor.classType = node.declarations[0].init.type;

        return annotationInfo;
    }

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
                        if (node.property) {
                            annotationInfo.descriptor.property = node.property.name;
                        }

                        annotationInfo.descriptor.className = node.declarations[0].id.name;
                        /* Either "NewExpression", ObjectExpression (for ...= {}), ArrayExpression
                            NewExpression => ... = new Object()
                            ObjectExpression => ... = {}
                            ArrayExpression => ... = []
                         */
                        annotationInfo.descriptor.classType = node.declarations[0].init.type;
                    } catch(e) {
                        console.log(util.inspect(node, {depth:25}));
                        console.log(e);
                    }
                } else if (annotationInfo.annotation) {
                    annotationInfo.descriptor.property = node.property.name;
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
}

module.exports = exports = Esprima_VariableDeclaration;