'use strict';
import Esprima_Base from "../Base/Esprima_Base";

class ExpressionStatement extends Esprima_Base {

    constructor() {
        super();
    }

    init() {
        var instance = this;
    }

    getBeanContextAware(node, annotationInfo) {

        return annotationInfo;
    }

    cleanUp(node, annotationInfo) {
        let instance = this;

        annotationInfo = super.parseEsprimaToken(node, annotationInfo);

        let annotation = annotationInfo.annotation;
        if (!annotation) {
            try {
                // In case of sub bean
                annotation = annotationInfo.descriptor.annotation;
            } catch (e) {
                console.error(annotationInfo);
                throw e;
            }
        }

        /*
         * Class constructor
         */
        try {
            if ((annotation.TYPE & global.TYPE_ANNOTATION_TARGET) || (annotation.TYPE & global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE)) {
                try {

                    let objectStruct = node.expression.left;
                    let propertyStack = [];
                    let prototypeBean = false;
                    do {

                        if (objectStruct.property && objectStruct.property.name != "prototype") {
                            propertyStack.push(objectStruct.property.name);
                        } else if (objectStruct.property && objectStruct.property.name == "prototype") {
                            prototypeBean = true;
                        }

                        // Next object

                        if (objectStruct.object) {
                            objectStruct = objectStruct.object;
                        } else {
                            objectStruct = null;
                        }
                    } while(objectStruct);

                    annotationInfo.property = node.expression.left.property.name;

                    if (prototypeBean) {
                        propertyStack.reverse();
                        annotationInfo.prototypePath = propertyStack;
                    }
                    /*
                        Either FunctionExpression, ClassExpression, NewExpression (Object), ObjectExpression, ArrayExpression
                        FunctionExpression => ... = function() {...}
                        ClassExpression => ... = class () {...}
                        NewExpression => ... = new Object()
                        ObjectExpression => ... = {}
                        ArrayExpression => ... = []
                        Literal => ... property = null;
                      */
                    annotationInfo.type = node.expression.right.type;
                } catch (e) {
                    throw e;
                }
            }
        } catch(e) {
            console.error(annotationInfo);
            throw e;
        }

        return annotationInfo;
    }

    parse(node) {

        var parserResult = null;
        var identifiers = [];
        var matcher = new IdentifierMatcher();
        var result = null;

        var expression = node.expression.left;
        if (expression && expression.type == "MemberExpression") {

            identifiers = matcher.parse(expression);

            result = {
                type: expression.type,
                start: node.loc.start.line,
                end: node.loc.end.line,
                identifiers: identifiers
            }

        } else if(expression && expression.type == "Identifier") {

            result = {
                type: expression.type,
                start: node.loc.start.line,
                end: node.loc.end.line,
                identifiers: [expression.name]
            }

        }

        parserResult = {
            result: result,
            nextStatement: false
        };

        return parserResult
    }

}

export default ExpressionStatement;

/*

new instance variable like "instance.test=null;

                    {
                        "type": "Esprima_ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {
                                    "type": "Identifier",
                                    "name": "instance",
                                    "range": [
                                        111,
                                        119
                                    ]
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "test",
                                    "range": [
                                        120,
                                        124
                                    ]
                                },
                                "range": [
                                    111,
                                    124
                                ]
                            },
                            "right": {
                                "type": "Literal",
                                "value": null,
                                "raw": "null",
                                "range": [
                                    127,
                                    131
                                ]
                            },
                            "range": [
                                111,
                                131
                            ]
                        }

new inner bean declaration with "instance.test=function()
{
                                                                                                                "type": "Esprima_ExpressionStatement",
                                                                                                                "expression": {
                                                                                                                    "type": "AssignmentExpression",
                                                                                                                    "operator": "=",
                                                                                                                    "left": {
                                                                                                                        "type": "MemberExpression",
                                                                                                                        "computed": false,
                                                                                                                        "object": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "instance",
                                                                                                                            "range": [
                                                                                                                                862,
                                                                                                                                870
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        "property": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "test",
                                                                                                                            "range": [
                                                                                                                                871,
                                                                                                                                875
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        "range": [
                                                                                                                            862,
                                                                                                                            875
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    "right": {
                                                                                                                        "type": "FunctionExpression",
                                                                                                                        "id": null,
                                                                                                                        "params": [],
                                                                                                                        "body": {
                                                                                                                            "type": "BlockStatement",
                                                                                                                            "body": [],
                                                                                                                            "range": [
                                                                                                                                889,
                                                                                                                                891
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        "generator": false,
                                                                                                                        "expression": false,
                                                                                                                        "async": false,
                                                                                                                        "range": [
                                                                                                                            878,
                                                                                                                            891
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    "range": [
                                                                                                                        862,
                                                                                                                        891
                                                                                                                    ]
                                                                                                                },
                                                                                                                "range": [
                                                                                                                    862,
                                                                                                                    891
                                                                                                                ]
                                                                                                            }

new inner bean declaration with class

                                                                                                                "type": "Esprima_ExpressionStatement",
                                                                                                                "expression": {
                                                                                                                    "type": "AssignmentExpression",
                                                                                                                    "operator": "=",
                                                                                                                    "left": {
                                                                                                                        "type": "MemberExpression",
                                                                                                                        "computed": false,
                                                                                                                        "object": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "instance",
                                                                                                                            "range": [
                                                                                                                                1019,
                                                                                                                                1027
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        "property": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "innerBean3",
                                                                                                                            "range": [
                                                                                                                                1028,
                                                                                                                                1038
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        "range": [
                                                                                                                            1019,
                                                                                                                            1038
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    "right": {
                                                                                                                        "type": "ClassExpression",
                                                                                                                        "id": null,
                                                                                                                        "superClass": null,
                                                                                                                        "body": {
                                                                                                                            "type": "ClassBody",
                                                                                                                            "body": [
                                                                                                                                {
                                                                                                                                    "type": "MethodDefinition",
                                                                                                                                    "key": {
                                                                                                                                        "type": "Identifier",
                                                                                                                                        "name": "constructor",
                                                                                                                                        "range": [
                                                                                                                                            1082,
                                                                                                                                            1093
                                                                                                                                        ]
                                                                                                                                    },
                                                                                                                                    "computed": false,
                                                                                                                                    "value": {
                                                                                                                                        "type": "FunctionExpression",
                                                                                                                                        "id": null,
                                                                                                                                        "params": [],
                                                                                                                                        "body": {
                                                                                                                                            "type": "BlockStatement",
                                                                                                                                            "body": [
                                                                                                                                                {
                                                                                                                                                    "type": "VariableDeclaration",
                                                                                                                                                    "declarations": [
                                                                                                                                                        {
                                                                                                                                                            "type": "VariableDeclarator",
                                                                                                                                                            "id": {
                                                                                                                                                                "type": "Identifier",
                                                                                                                                                                "name": "instance",
                                                                                                                                                                "range": [
                                                                                                                                                                    1139,
                                                                                                                                                                    1147
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            "init": {
                                                                                                                                                                "type": "ThisExpression",
                                                                                                                                                                "range": [
                                                                                                                                                                    1150,
                                                                                                                                                                    1154
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            "range": [
                                                                                                                                                                1139,
                                                                                                                                                                1154
                                                                                                                                                            ]
                                                                                                                                                        }
                                                                                                                                                    ],
                                                                                                                                                    "kind": "var",
                                                                                                                                                    "range": [
                                                                                                                                                        1135,
                                                                                                                                                        1155
                                                                                                                                                    ]
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    "type": "Esprima_ExpressionStatement",
                                                                                                                                                    "expression": {
                                                                                                                                                        "type": "AssignmentExpression",
                                                                                                                                                        "operator": "=",
                                                                                                                                                        "left": {
                                                                                                                                                            "type": "MemberExpression",
                                                                                                                                                            "computed": false,
                                                                                                                                                            "object": {
                                                                                                                                                                "type": "Identifier",
                                                                                                                                                                "name": "instance",
                                                                                                                                                                "range": [
                                                                                                                                                                    1193,
                                                                                                                                                                    1201
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            "property": {
                                                                                                                                                                "type": "Identifier",
                                                                                                                                                                "name": "innerBean2",
                                                                                                                                                                "range": [
                                                                                                                                                                    1202,
                                                                                                                                                                    1212
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            "range": [
                                                                                                                                                                1193,
                                                                                                                                                                1212
                                                                                                                                                            ]
                                                                                                                                                        },
                                                                                                                                                        "right": {
                                                                                                                                                            "type": "Literal",
                                                                                                                                                            "value": null,
                                                                                                                                                            "raw": "null",
                                                                                                                                                            "range": [
                                                                                                                                                                1215,
                                                                                                                                                                1219
                                                                                                                                                            ]
                                                                                                                                                        },
                                                                                                                                                        "range": [
                                                                                                                                                            1193,
                                                                                                                                                            1219
                                                                                                                                                        ]
                                                                                                                                                    },
                                                                                                                                                    "range": [
                                                                                                                                                        1193,
                                                                                                                                                        1220
                                                                                                                                                    ]
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    "type": "Esprima_ExpressionStatement",
                                                                                                                                                    "expression": {
                                                                                                                                                        "type": "AssignmentExpression",
                                                                                                                                                        "operator": "=",
                                                                                                                                                        "left": {
                                                                                                                                                            "type": "MemberExpression",
                                                                                                                                                            "computed": false,
                                                                                                                                                            "object": {
                                                                                                                                                                "type": "Identifier",
                                                                                                                                                                "name": "instance",
                                                                                                                                                                "range": [
                                                                                                                                                                    1258,
                                                                                                                                                                    1266
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            "property": {
                                                                                                                                                                "type": "Identifier",
                                                                                                                                                                "name": "initFlag",
                                                                                                                                                                "range": [
                                                                                                                                                                    1267,
                                                                                                                                                                    1275
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            "range": [
                                                                                                                                                                1258,
                                                                                                                                                                1275
                                                                                                                                                            ]
                                                                                                                                                        },
                                                                                                                                                        "right": {
                                                                                                                                                            "type": "Literal",
                                                                                                                                                            "value": null,
                                                                                                                                                            "raw": "null",
                                                                                                                                                            "range": [
                                                                                                                                                                1278,
                                                                                                                                                                1282
                                                                                                                                                            ]
                                                                                                                                                        },
                                                                                                                                                        "range": [
                                                                                                                                                            1258,
                                                                                                                                                            1282
                                                                                                                                                        ]
                                                                                                                                                    },
                                                                                                                                                    "range": [
                                                                                                                                                        1258,
                                                                                                                                                        1283
                                                                                                                                                    ]
                                                                                                                                                }
                                                                                                                                            ],
                                                                                                                                            "range": [
                                                                                                                                                1096,
                                                                                                                                                1317
                                                                                                                                            ]
                                                                                                                                        },
                                                                                                                                        "generator": false,
                                                                                                                                        "expression": false,
                                                                                                                                        "async": false,
                                                                                                                                        "range": [
                                                                                                                                            1093,
                                                                                                                                            1317
                                                                                                                                        ]
                                                                                                                                    },
                                                                                                                                    "kind": "constructor",
                                                                                                                                    "static": false,
                                                                                                                                    "range": [
                                                                                                                                        1082,
                                                                                                                                        1317
                                                                                                                                    ]
                                                                                                                                },
                                                                                                                                {
                                                                                                                                    "type": "MethodDefinition",
                                                                                                                                    "key": {
                                                                                                                                        "type": "Identifier",
                                                                                                                                        "name": "init",
                                                                                                                                        "range": [
                                                                                                                                            1465,
                                                                                                                                            1469
                                                                                                                                        ]
                                                                                                                                    },
                                                                                                                                    "computed": false,
                                                                                                                                    "value": {
                                                                                                                                        "type": "FunctionExpression",
                                                                                                                                        "id": null,
                                                                                                                                        "params": [],
                                                                                                                                        "body": {
                                                                                                                                            "type": "BlockStatement",
                                                                                                                                            "body": [
                                                                                                                                                {
                                                                                                                                                    "type": "VariableDeclaration",
                                                                                                                                                    "declarations": [
                                                                                                                                                        {
                                                                                                                                                            "type": "VariableDeclarator",
                                                                                                                                                            "id": {
                                                                                                                                                                "type": "Identifier",
                                                                                                                                                                "name": "instance",
                                                                                                                                                                "range": [
                                                                                                                                                                    1514,
                                                                                                                                                                    1522
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            "init": {
                                                                                                                                                                "type": "ThisExpression",
                                                                                                                                                                "range": [
                                                                                                                                                                    1525,
                                                                                                                                                                    1529
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            "range": [
                                                                                                                                                                1514,
                                                                                                                                                                1529
                                                                                                                                                            ]
                                                                                                                                                        }
                                                                                                                                                    ],
                                                                                                                                                    "kind": "var",
                                                                                                                                                    "range": [
                                                                                                                                                        1510,
                                                                                                                                                        1530
                                                                                                                                                    ]
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    "type": "Esprima_ExpressionStatement",
                                                                                                                                                    "expression": {
                                                                                                                                                        "type": "AssignmentExpression",
                                                                                                                                                        "operator": "=",
                                                                                                                                                        "left": {
                                                                                                                                                            "type": "MemberExpression",
                                                                                                                                                            "computed": false,
                                                                                                                                                            "object": {
                                                                                                                                                                "type": "Identifier",
                                                                                                                                                                "name": "instance",
                                                                                                                                                                "range": [
                                                                                                                                                                    1567,
                                                                                                                                                                    1575
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            "property": {
                                                                                                                                                                "type": "Identifier",
                                                                                                                                                                "name": "initFlag",
                                                                                                                                                                "range": [
                                                                                                                                                                    1576,
                                                                                                                                                                    1584
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            "range": [
                                                                                                                                                                1567,
                                                                                                                                                                1584
                                                                                                                                                            ]
                                                                                                                                                        },
                                                                                                                                                        "right": {
                                                                                                                                                            "type": "Literal",
                                                                                                                                                            "value": true,
                                                                                                                                                            "raw": "true",
                                                                                                                                                            "range": [
                                                                                                                                                                1587,
                                                                                                                                                                1591
                                                                                                                                                            ]
                                                                                                                                                        },
                                                                                                                                                        "range": [
                                                                                                                                                            1567,
                                                                                                                                                            1591
                                                                                                                                                        ]
                                                                                                                                                    },
                                                                                                                                                    "range": [
                                                                                                                                                        1567,
                                                                                                                                                        1592
                                                                                                                                                    ]
                                                                                                                                                }
                                                                                                                                            ],
                                                                                                                                            "range": [
                                                                                                                                                1472,
                                                                                                                                                1626
                                                                                                                                            ]
                                                                                                                                        },
                                                                                                                                        "generator": false,
                                                                                                                                        "expression": false,
                                                                                                                                        "async": false,
                                                                                                                                        "range": [
                                                                                                                                            1469,
                                                                                                                                            1626
                                                                                                                                        ]
                                                                                                                                    },
                                                                                                                                    "kind": "method",
                                                                                                                                    "static": false,
                                                                                                                                    "range": [
                                                                                                                                        1465,
                                                                                                                                        1626
                                                                                                                                    ]
                                                                                                                                }
                                                                                                                            ],
                                                                                                                            "range": [
                                                                                                                                1047,
                                                                                                                                1656
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        "range": [
                                                                                                                            1041,
                                                                                                                            1656
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    "range": [
                                                                                                                        1019,
                                                                                                                        1656
                                                                                                                    ]
                                                                                                                },
                                                                                                                "range": [
                                                                                                                    1019,
                                                                                                                    1657
                                                                                                                ]
                                                                                                            }

 new inner bean definition with new Object()

                                        {
                                        "type": "Esprima_ExpressionStatement",
                                        "expression": {
                                            "type": "AssignmentExpression",
                                            "operator": "=",
                                            "left": {
                                                "type": "MemberExpression",
                                                "computed": false,
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "instance",
                                                    "range": [
                                                        508,
                                                        516
                                                    ]
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "innerBean1",
                                                    "range": [
                                                        517,
                                                        527
                                                    ]
                                                },
                                                "range": [
                                                    508,
                                                    527
                                                ]
                                            },
                                            "right": {
                                                "type": "NewExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "Object",
                                                    "range": [
                                                        534,
                                                        540
                                                    ]
                                                },
                                                "arguments": [],
                                                "range": [
                                                    530,
                                                    542
                                                ]
                                            },
                                            "range": [
                                                508,
                                                542
                                            ]
                                        },
                                        "range": [
                                            508,
                                            543
                                        ]
                                    }
 */
