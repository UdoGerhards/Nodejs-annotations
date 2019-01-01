var data={
    "appName": "Application",
    "objectModel": [
        {
            "key": "Application",
            "name": "Application",
            "type": "Class",
            "properties": [
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "number",
                    "type": "[ Number | Boolean | Integer | String ]",
                    "visibility": "public"
                },
                {
                    "name": "testObject",
                    "type": "Object",
                    "visibility": "public"
                },
                {
                    "name": "testArray",
                    "type": "Array",
                    "visibility": "public"
                },
                {
                    "name": "testInteger",
                    "type": "Integer",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "testString",
                    "type": "String",
                    "visibility": "public"
                },
                {
                    "name": "bean",
                    "visibility": "public"
                },
                {
                    "name": "otherBean",
                    "visibility": "public"
                },
                {
                    "name": "component",
                    "visibility": "public"
                },
                {
                    "name": "configuration",
                    "visibility": "public"
                },
                {
                    "name": "initFlag",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "constructor",
                    "visibility": "public"
                },
                {
                    "name": "hasOwnProperty",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "isPrototypeOf",
                    "visibility": "public"
                },
                {
                    "name": "propertyIsEnumerable",
                    "visibility": "public"
                },
                {
                    "name": "testEmployeeMatch",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "id",
                            "type": "String"
                        },
                        {
                            "name": "employee",
                            "type": "[ String | Object ]"
                        }
                    ]
                },
                {
                    "name": "testEmployees",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "employees",
                            "type": "Object"
                        }
                    ]
                },
                {
                    "name": "toLocaleString",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "valueOf",
                    "visibility": "public"
                },
                {
                    "name": "__defineGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__defineSetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupSetter__",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "Context.js"
        },
        {
            "key": "Bean",
            "name": "Bean",
            "type": "Class",
            "properties": [
                {
                    "name": "serviceBean",
                    "visibility": "public"
                },
                {
                    "name": "componentBean",
                    "visibility": "public"
                },
                {
                    "name": "initFlag",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "constructor",
                    "visibility": "public"
                },
                {
                    "name": "hasOwnProperty",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "isPrototypeOf",
                    "visibility": "public"
                },
                {
                    "name": "propertyIsEnumerable",
                    "visibility": "public"
                },
                {
                    "name": "toLocaleString",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "valueOf",
                    "visibility": "public"
                },
                {
                    "name": "__defineGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__defineSetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupSetter__",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "Bean.js"
        },
        {
            "key": "OtherBean",
            "name": "OtherBean",
            "type": "Class",
            "properties": [
                {
                    "name": "bean",
                    "visibility": "public"
                },
                {
                    "name": "initFlag",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "constructor",
                    "visibility": "public"
                },
                {
                    "name": "hasOwnProperty",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "isPrototypeOf",
                    "visibility": "public"
                },
                {
                    "name": "propertyIsEnumerable",
                    "visibility": "public"
                },
                {
                    "name": "toLocaleString",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "valueOf",
                    "visibility": "public"
                },
                {
                    "name": "__defineGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__defineSetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupSetter__",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "OtherBean.js"
        },
        {
            "key": "Service",
            "name": "Service",
            "type": "Class",
            "properties": [
                {
                    "name": "bean",
                    "visibility": "public"
                },
                {
                    "name": "component",
                    "visibility": "public"
                },
                {
                    "name": "initFlag",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "constructor",
                    "visibility": "public"
                },
                {
                    "name": "hasOwnProperty",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "isPrototypeOf",
                    "visibility": "public"
                },
                {
                    "name": "propertyIsEnumerable",
                    "visibility": "public"
                },
                {
                    "name": "toLocaleString",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "valueOf",
                    "visibility": "public"
                },
                {
                    "name": "__defineGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__defineSetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupSetter__",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "Service.js"
        },
        {
            "key": "Component",
            "name": "Component",
            "type": "Class",
            "properties": [
                {
                    "name": "bean",
                    "visibility": "public"
                },
                {
                    "name": "initFlag",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "constructor",
                    "visibility": "public"
                },
                {
                    "name": "hasOwnProperty",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "isPrototypeOf",
                    "visibility": "public"
                },
                {
                    "name": "propertyIsEnumerable",
                    "visibility": "public"
                },
                {
                    "name": "toLocaleString",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "valueOf",
                    "visibility": "public"
                },
                {
                    "name": "__defineGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__defineSetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupSetter__",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "Component.js"
        },
        {
            "key": "Configuration",
            "name": "Configuration",
            "type": "Class",
            "properties": [
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "camelCase",
                    "visibility": "public"
                },
                {
                    "name": "wildcard",
                    "visibility": "public"
                },
                {
                    "name": "xmlPropertiesBean",
                    "visibility": "public"
                },
                {
                    "name": "jsonPropertiesBean",
                    "visibility": "public"
                },
                {
                    "name": "javaPropertiesBean",
                    "visibility": "public"
                },
                {
                    "name": "initFlag",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "camelCase",
                    "visibility": "public"
                },
                {
                    "name": "constructor",
                    "visibility": "public"
                },
                {
                    "name": "hasOwnProperty",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "isPrototypeOf",
                    "visibility": "public"
                },
                {
                    "name": "propertyIsEnumerable",
                    "visibility": "public"
                },
                {
                    "name": "toLocaleString",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "valueOf",
                    "visibility": "public"
                },
                {
                    "name": "wildcard",
                    "visibility": "public"
                },
                {
                    "name": "__defineGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__defineSetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupSetter__",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "Configuration.js"
        },
        {
            "key": "JsonPropertiesBean",
            "name": "JsonPropertiesBean",
            "type": "Class",
            "properties": [
                {
                    "name": "propertyA",
                    "visibility": "public"
                },
                {
                    "name": "propertyB",
                    "visibility": "public"
                },
                {
                    "name": "propertyC",
                    "visibility": "public"
                },
                {
                    "name": "propertyD",
                    "visibility": "public"
                },
                {
                    "name": "__name__",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "constructor",
                    "visibility": "public"
                },
                {
                    "name": "hasOwnProperty",
                    "visibility": "public"
                },
                {
                    "name": "isPrototypeOf",
                    "visibility": "public"
                },
                {
                    "name": "propertyIsEnumerable",
                    "visibility": "public"
                },
                {
                    "name": "toLocaleString",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "valueOf",
                    "visibility": "public"
                },
                {
                    "name": "__defineGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__defineSetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupSetter__",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "config.json"
        },
        {
            "key": "XmlPropertiesBean",
            "name": "XmlPropertiesBean",
            "type": "Class",
            "properties": [
                {
                    "name": "propertyA",
                    "visibility": "public"
                },
                {
                    "name": "propertyB",
                    "visibility": "public"
                },
                {
                    "name": "propertyC",
                    "visibility": "public"
                },
                {
                    "name": "propertyD",
                    "visibility": "public"
                },
                {
                    "name": "__name__",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "constructor",
                    "visibility": "public"
                },
                {
                    "name": "hasOwnProperty",
                    "visibility": "public"
                },
                {
                    "name": "isPrototypeOf",
                    "visibility": "public"
                },
                {
                    "name": "propertyIsEnumerable",
                    "visibility": "public"
                },
                {
                    "name": "toLocaleString",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "valueOf",
                    "visibility": "public"
                },
                {
                    "name": "__defineGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__defineSetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupSetter__",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "config.xml"
        },
        {
            "key": "JavaPropertiesBean",
            "name": "JavaPropertiesBean",
            "type": "Class",
            "properties": [
                {
                    "name": "propertyA",
                    "visibility": "public"
                },
                {
                    "name": "propertyB",
                    "visibility": "public"
                },
                {
                    "name": "propertyC",
                    "visibility": "public"
                },
                {
                    "name": "__name__",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "constructor",
                    "visibility": "public"
                },
                {
                    "name": "hasOwnProperty",
                    "visibility": "public"
                },
                {
                    "name": "isPrototypeOf",
                    "visibility": "public"
                },
                {
                    "name": "propertyIsEnumerable",
                    "visibility": "public"
                },
                {
                    "name": "toLocaleString",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "valueOf",
                    "visibility": "public"
                },
                {
                    "name": "__defineGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__defineSetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupGetter__",
                    "visibility": "private"
                },
                {
                    "name": "__lookupSetter__",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "config.properties"
        }
    ],
    "inheritances": {
        "inheritance": [
            {
                "from": "\"Service\"",
                "to": "AncestorService"
            },
            {
                "from": "\"Component\"",
                "to": "AncestorComponent"
            },
            {
                "from": "\"AncestorComponent\"",
                "to": "BaseAncestorComponent"
            }
        ],
        "prototypes": [
            "AncestorService",
            "AncestorComponent",
            "BaseAncestorComponent"
        ]
    },
    "injections": [
        {
            "from": "Application",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Application",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Application",
            "to": "Bean",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Application",
            "to": "OtherBean",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Application",
            "to": "Component",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Application",
            "to": "Configuration",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "OtherBean",
            "to": "Bean",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Service",
            "to": "Bean",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Service",
            "to": "Component",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Component",
            "to": "Bean",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Configuration",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Configuration",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Configuration",
            "to": "CamelCase",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Configuration",
            "to": "Wildcard",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Configuration",
            "to": "XmlPropertiesBean",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Configuration",
            "to": "JsonPropertiesBean",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Configuration",
            "to": "JavaPropertiesBean",
            "relationship": "generalization",
            "zOrder": 100
        }
    ]
}