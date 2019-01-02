'use strict';

var htmlparser = require("htmlparser2")
    , fs = require("fs")
    , path = require("path")
    , util = require("util")
    , dotProp = require("dot-prop")
    , wildcard = require("node-wildcard");

/**
 * Created by udogerhards on 27.12.18.
 */
class FoundationXMLParser {

    constructor() {

        var instance = this;

        instance.xmlContextFile = null;
        instance._context = {};
        instance._moduleDir = null;
        instance._parser = null;

    }

    init(moduleDir, xmlContextFile) {

        var instance = this;

        instance._moduleDir = moduleDir;
        instance.xmlContextFile = path.join(moduleDir, xmlContextFile);

    }

    process() {
        var instance =  this;
        var contextFilePath = instance.xmlContextFile;

        return instance._readFile(contextFilePath).then(function(result) {
                try {
                    return instance._parse(result);
                } catch(e){
                    throw e;
                }
            });
    }

    _parse(data) {
        var instance = this;
        var moduleDir = instance._moduleDir;

        var context = {};
        var propertyStack = [];

        /*
         * Function call
         */

        var initFuncs = [];

        var globalObjects = [];

        var newObjectStack = {};

        var currentID = null;
        var currentTag = null;

        var externals = {};

        var contextBean = null;

        var stack = {
            elements: {},
            pushElement: function (indexPath, content) {
                var instance = this;
                instance.elements[indexPath] = content;

                dotProp.set(newObjectStack[currentID], propertyStack.join("."), instance);
            },

            getElement: function (id) {
                var instance = this;
                return instance.elements[id];
            },

            getKeys: function() {
                var instance = this;
                if (instance.elements) {
                    return Object.keys(instance.elements);
                } else {
                    return null;
                }
            },

            deleteElement: function(indexPath) {
                var instance = this;
                instance.elements[indexPath] = null;
                delete instance.elements[indexPath];
            }
        };

        var getStackElement = function(value) {
            var element = {
                type: typeof value,
                object: value
            }
            return element;
        };

        var clearStack = function() {

            var stackKeys = stack.getKeys();

            if (propertyStack.length == 0 && stackKeys) {
                stackKeys.sort();

                var master = wildcard(stackKeys, "*#")[0];

                var keys = stackKeys.filter(function(value){

                    return value == master?false:true;
                });

                if (master) {
                    var newObject = stack.getElement(master).object;

                    stack.deleteElement(master);

                    for (var index = 0; index < keys.length; index++) {

                        if (keys[index] != "") {
                            var instance = stack.getElement(keys[index]).object;
                            var property = keys[index].replace(master, "");
                            dotProp.set(newObject, property, instance);
                            stack.deleteElement(keys[index]);
                        }
                    }

                    var id = master.replace(/#/g,"");
                    context[id] = newObject;
                }
            }
        };

        var checkListandCreateIfnotExists = function(indexPath) {
            var list = stack.getElement(indexPath);

            if (!list) {
                list = {
                    object: [],
                    id: currentID,
                    count: 0
                };
            }

            stack.pushElement(indexPath, list);

            return list;
        };

        var pushElementToList = function(indexPath, entryKey, value) {
            var instance = this;

            if (indexPath != "") {
                var list = stack.getElement(indexPath);

                if (!list) {
                    list = checkListandCreateIfnotExists(indexPath);
                }

                /*
                 * if the list is an array and the key is string transform the list to an object
                 */
                if (entryKey && typeof entryKey == "string" && Array.isArray(list.elements)) {
                    var tmpList = list.elements;
                    list.elements = Object.assign({}, tmpList);
                    stack.pushElement(indexPath, list);
                }

                /*
                 * Save the list value
                 */
                if (Array.isArray(list.elements) && !entryKey) {
                    list.count++;
                };

                stack.pushElement(indexPath, value);
            }
        };

        function getConstructorChain(obj, type) {
            var cs = [], pt = obj;
            do {
                if (pt = Object.getPrototypeOf(pt)) cs.push(pt.constructor || null);
            } while (pt != null);
            return type == 'names' ? cs.map(function(c) {
                return c ? c.toString().split(/\s|\(/)[1] : null;
            }) : cs;
        }

        var parser = new htmlparser.Parser({
            onopentag: function(tagname, attributes){

                var name = tagname.toLowerCase();

                currentTag = {
                    name: name,
                    attributes: attributes
                };

                switch(name) {

                    case "context":

                        var targetSrc = attributes.src || null;
                        var type = attributes.type || "singleton";
                        var init = attributes.init || null;
                        var global = !(/^(false|0)$/i).test(attributes.global) && !!attributes.global;
                        var inherits = attributes.inherits || null;
                        var id = attributes.id;

                        var instance = null;

                        if (inherits) {
                            type = "mutli";
                        }

                        /*
                         * Instantiate
                         */
                        if (targetSrc) {
                            var src = path.join(moduleDir, attributes.src);
                            if (fs.existsSync(src)) {
                                try {
                                    if (type != "multi") {
                                        instance = require(src);
                                    } else {
                                        var beanClass = require(src);

                                        if (inherits) {

                                            var inheritsPath = path.join(moduleDir, inherits);
                                            var parent = null;

                                            if (fs.existsSync(inheritsPath)) {
                                                parent = require(inheritsPath);
                                            } else {

                                                /* Check context first bevore we require an external resource */
                                                parent = externals[inherits];
                                                if (!parent) {
                                                    parent = require(inherits);
                                                }
                                            }

                                            util.inherits(beanClass, parent);
                                        }

                                        instance = new beanClass();
                                    }
                                } catch(e) {
                                    console.log(src);
                                    throw e;
                                }
                            } else
                            {
                                /*
                                 * Resource
                                 */
                                instance = require(targetSrc);
                            }

                        }

                        if (id) {
                            currentID = id;
                            clearStack();
                        }

                        var indexPath = currentID+"#"+propertyStack.join(".");

                        if (instance && fs.existsSync(src)) {

                            var element = getStackElement(instance);
                            stack.pushElement(indexPath, element);

                            if (init) {
                                var initFunc = {
                                    method: init
                                };
                                initFuncs[indexPath] = initFuncs[indexPath] || [];
                                initFuncs[indexPath].push(initFunc);
                            }

                            if (global) {
                                globalObjects.push(id);
                            }

                        } else if (instance) {
                            externals[id] = instance;
                        }

                        if (name == "context" && !contextBean) {
                            contextBean = instance;
                        } else if (name == "context" && contextBean) {
                            throw new Error("Context is already defined ...!");
                        }

                        break;

                    case "bean":

                        var targetSrc = attributes.src || null;
                        var type = attributes.type || "singleton";
                        var init = attributes.init || null;
                        var global = !(/^(false|0)$/i).test(attributes.global) && !!attributes.global;
                        var inherits = attributes.inherits || null;
                        var id = attributes.id;

                        var instance = null;

                        if (inherits) {
                            type = "multi";
                        }

                        /*
                         * Instantiate
                         */
                        if (targetSrc) {
                            var src = path.join(moduleDir, attributes.src);
                            if (fs.existsSync(src)) {
                                try {
                                    if (type != "multi") {
                                        instance = require(src);

                                        if (typeof instance == "function") {
                                            instance = new instance();
                                        }
                                    } else {
                                        var beanClass = require(src);

                                        if (inherits) {

                                            var inheritsPath = path.join(moduleDir, inherits);
                                            var parent = null;

                                            if (fs.existsSync(inheritsPath)) {
                                                parent = require(inheritsPath);
                                            } else {

                                                /* Check context first bevore we require an external resource */
                                                parent = externals[inherits];
                                                if (!parent) {
                                                    parent = require(inherits);
                                                }
                                            }

                                            util.inherits(beanClass, parent);
                                        }

                                        try {
                                            instance = new beanClass();
                                        } catch(e) {

                                            console.log(beanClass);

                                            instance = beanClass;
                                        }
                                    }
                                } catch(e) {
                                    console.log(src);
                                    throw e;
                                }
                            } else
                            {
                                /*
                                 * Resource
                                 */
                                instance = require(targetSrc);
                            }

                        }

                        if (id) {
                            currentID = id;
                            clearStack();
                        }

                        var indexPath = currentID+"#"+propertyStack.join(".");

                        if (instance && fs.existsSync(src)) {

                            var element = getStackElement(instance);
                            stack.pushElement(indexPath, element);

                            if (init) {
                                var initFunc = {
                                    method: init
                                };
                                initFuncs[indexPath] = initFuncs[indexPath] || [];
                                initFuncs[indexPath].push(initFunc);
                            }

                            if (global) {
                                globalObjects.push(id);
                            }

                        } else if (instance) {
                            externals[id] = instance;
                        }

                        break;
                    case "class":
                        var targetSrc = attributes.src || null;
                        var instance = null;

                        /*
                         * Instantiate
                         */
                        var src = path.join(moduleDir, attributes.src);
                        if (fs.existsSync(src)) {
                            try {
                                instance = require(src);
                                //instance = new beanClass();
                            } catch(e) {
                                console.log(src);
                                throw e;
                            }
                        }

                        var id = attributes.id;

                        /* Save in externals */
                        externals[id] = instance;

                        break;
                    case "list":

                        var global = !(/^(false|0)$/i).test(attributes.global) && !!attributes.global;

                        var id = attributes.id;
                        if (id) {
                            currentID = id;
                            clearStack();
                        }

                        var indexPath = currentID+"#"+propertyStack.join(".");
                        checkListandCreateIfnotExists(indexPath);

                        if (global) {
                            globalObjects.push(id);
                        }

                        break;
                    case "reference":

                        var id = attributes.id;
                        var instance = context[id];

                        if (!instance) {
                            instance = externals[id];
                        }

                        var element = getStackElement(instance);

                        var indexPath = currentID+"#"+propertyStack.join(".");

                        stack.pushElement(indexPath, element);

                        break;
                    case "property":

                        var propertyName = attributes.name;
                        var value = attributes.value;

                        propertyStack.push(propertyName);

                        var indexPath = currentID+"#"+propertyStack.join(".");
                        if (value) {
                            var element = getStackElement(value);
                            stack.pushElement(indexPath, element);
                        }

                        break;
                    case "entry":

                        var entryKey = attributes.key || null;
                        var value = attributes.value || null;

                        var indexPath = currentID+"#"+propertyStack.join(".");

                        if (entryKey) {
                            propertyStack.push(entryKey);
                        } else {
                            var pos = stack.getElement(indexPath).count++;
                            propertyStack.push(pos);
                        }

                        if (value) {
                            pushElementToList(indexPath,  entryKey, value);
                        }

                        break;
                    default:
                        break;
                }


            },

            ontext: function(text){

                var value = text.replace(/\r?\n|\r/g, "").trim();

                if (currentTag && value != "") {

                    switch (currentTag.name) {

                        case "property":
                            var indexPath = currentID+"#"+propertyStack.join(".");

                            var element = getStackElement(value);
                            stack.pushElement(indexPath, element);

                            break;
                        case "entry":
                            //var last = propertyStack.slice(propertyStack.length-1,propertyStack.length)[0];

                            var entryKey = currentTag.attributes.id;
                            var indexPath = currentID+"#"+propertyStack.join(".");

                            if (value) {
                                var element = getStackElement(value);
                                pushElementToList(indexPath,  entryKey, element);
                            }
                            break;
                        case "value":
                            var indexPath = currentID+"#"+propertyStack.join(".");
                            if (value) {
                                var element = getStackElement(value);
                                stack.pushElement(indexPath, element);
                            }
                            break;
                        default:
                            break;
                    }
                }
            },
            onclosetag: function(tagname){

                var name = tagname.toLowerCase();

                switch(name) {
                     case "property":
                         var tmpPropertyStack = propertyStack.slice(0, propertyStack.length - 1);
                         propertyStack = tmpPropertyStack;
                         break;
                     case "entry":
                         var tmpPropertyStack = propertyStack.slice(0, propertyStack.length - 1);
                         propertyStack = tmpPropertyStack;
                         break;
                     case "call":
                         break;
                     case "parameter":
                         break;
                     default:
                         break;
                }
            },

        }, {decodeEntities: true, recognizeCDATA: true});

        parser.write(data);

        parser.end();

        clearStack();

        // Concat externals to context

        for (var id in externals) {
            context[id] = externals[id]
        }
        externals = null;

        instance._setGlobalObjects(context, globalObjects);

        instance._callInitFuncs(context, initFuncs);

        return context;
    }

    _setGlobalObjects(context, globalObjects) {
        var instance = this;

        globalObjects.forEach(function(globalID) {

            global[globalID] = context[globalID];

        })
    }

    _callInitFuncs(context, initFuncs) {
        var instance = this;

        var keys = Object.keys(initFuncs)

        keys.forEach(function(key){

            var method = initFuncs[key][0].method;
            var parameters = key.split("#");

            var initializeFunc = null;
            if (parameters[1] == "") {

                // console.log(parameters[0]);
                // console.log(method);
                //
                // console.log(typeof context[parameters[0]]);

                context[parameters[0]][method].call(context[parameters[0]]);
            } else {
                dotProp.get(context[parameters[0]], parameters[1])[method].call(context[parameters[0]]);
            }
        });
    }

    _readFile(contextFilePath) {

        return new Promise(function(resolve, reject) {

            fs.readFile(contextFilePath, (err, data) => {

                if (err) {
                    reject(err);
                }

                resolve(data);
            });
        });
    }
}

module.exports = exports = FoundationXMLParser;