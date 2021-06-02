var data={
    "appName": "Application",
    "objectModel": [
        {
            "key": "Application",
            "name": "Application",
            "type": "Class",
            "properties": [
                {
                    "name": "inheritor",
                    "visibility": "public"
                },
                {
                    "name": "initFlag",
                    "visibility": "public"
                },
                {
                    "name": "service",
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
                    "name": "run",
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
            "file": "Context.js"
        },
        {
            "key": "Inheritor",
            "name": "Inheritor",
            "type": "Class",
            "properties": [
                {
                    "name": "childProperty1",
                    "visibility": "public"
                },
                {
                    "name": "childProperty2",
                    "visibility": "public"
                },
                {
                    "name": "childProperty3",
                    "visibility": "public"
                },
                {
                    "name": "childProperty4",
                    "visibility": "public"
                },
                {
                    "name": "childProperty5",
                    "visibility": "public"
                },
                {
                    "name": "parentPropertyOverwritten1",
                    "visibility": "public"
                },
                {
                    "name": "parentPropertyOverwritten2",
                    "visibility": "public"
                },
                {
                    "name": "parentPropertyOverwritten3",
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
            "file": "ChildBean.js"
        },
        {
            "key": "Service",
            "name": "Service",
            "type": "Class",
            "properties": [],
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
        }
    ],
    "inheritances": {
        "inheritance": [
            {
                "from": "\"Inheritor\"",
                "to": "Parent"
            },
            {
                "from": "\"Parent\"",
                "to": "GrantParent"
            }
        ],
        "prototypes": [
            "Parent",
            "GrantParent"
        ]
    },
    "injections": [
        {
            "from": "Application",
            "to": "Inheritor",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Application",
            "to": "Service",
            "relationship": "generalization",
            "zOrder": 100
        }
    ]
}