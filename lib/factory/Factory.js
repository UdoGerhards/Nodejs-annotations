/**
 * http://usejsdoc.org/
 */
var util = require("util")
    , glob = require("glob")
    , estraverse = require("estraverse")
    , esprima = require("esprima")
    , _ = require("lodash")
    , structureParser = require("../parser/structure/StructureParser")
    , path = require("path")
    , dependencyBuilder = require("../dependency/DependencyBuilder.js")
    , contextBuilder = require("../context/ContextBuilder")
    , applicationConstants = require("../helper/constants.js")
    , ResourceAnnotation = require("../annotation/instance/Resource/ResourceAnnotationClass")
    , BaseParser = require("../parser/annotation/Base/BaseAnnotationParser.js")
    , EvenEmitter = require('events').EventEmitter
    , plantuml = require('node-plantuml')
    , fs = require("fs");

const os = require('os');

const uuidV4 = require('uuid/v4');

/**
 *  Class Factory
 */
function Factory() {
    var instance = this;

    instance.modulePath = __dirname.replace(/lib\/factory/, "");
    instance.logger = null;

    instance.annotationLibs = [];

    instance.tokenParserLibs = [];

    instance.annotationParserLibs = [];

    instance.stacks = [];

    instance.initialized = false;
};

util.inherits(Factory, EvenEmitter);

/**
 * Initialization
 * @param configuration
 */
Factory.prototype.init = function () {

    var instance = this;
    var logger = instance.logger;
    var modulePath = instance.modulePath;

    /*
     *  In case of multi context
     */
    if (instance.initialized) {
        return;
    } else {
        instance.initialized = true;
    }

    dependencyBuilder.logger = instance.logger;

    /*
     * Base annotation library
     */
    //var coreAnnotationLib = modulePath+"/lib/annotation/";

    if (!instance.annotationLibs.includes(modulePath + "/lib/annotation")) {
        instance.annotationLibs.push(modulePath + "/lib/annotation"); // Core lib
    }

    var annotations = {};
    instance.annotationLibs.forEach(function (annotationLib) {
        var files = glob.sync(annotationLib + "/**/*.js");
        files.forEach(function (file) {
            var annotation = require(file);
            annotations[annotation.name] = annotation;
        });
    });

    logger.trace(annotations);

    /*
     * Token parser
     */
    //var tokenParserPath = modulePath+"/lib/parser/member/";

    if (!instance.tokenParserLibs.includes(modulePath + "/lib/parser/member")) {
        instance.tokenParserLibs.push(modulePath + "/lib/parser/member");
    }

    var tokenParserFiles = [];
    var tokenParserList = {};
    instance.tokenParserLibs.forEach(function (tokenParserLib) {
        var tokenParserLib = glob.sync(tokenParserLib + "/**/*.js");
        tokenParserFiles = tokenParserFiles.concat(tokenParserLib);
    });
    tokenParserList = instance._initializeTokenParser(tokenParserFiles, tokenParserList, annotations);
    logger.trace(tokenParserList);

    /*
     * AnnotationParser
     */
    if (!instance.annotationParserLibs.includes(modulePath + "/lib/parser/annotation")) {
        instance.annotationParserLibs.push(modulePath + "/lib/parser/annotation");
    }

    var files = [];
    //var annotationParserPath = modulePath+"/lib/parser/annotation/";

    instance.annotationParserLibs.forEach(function (annotationParserLib) {
        var libFiles = glob.sync(annotationParserLib + "/**/*.js");
        files = files.concat(libFiles);
    });
    var annotationParserList = instance._initializeAnnotationParser(files, tokenParserList);
    logger.trace(annotationParserList);

    /*
     * Structure parser
     */
    instance._initializeStructureParser(tokenParserList);

    /*
     * Context builder
     */
    instance._initializeContextBuilder(annotationParserList);
};

/**
 * Sub initializitation for token parsers
 * @param files
 * @param tokenParserList
 * @param annotations
 * @returns {{}}
 */
Factory.prototype._initializeTokenParser = function (files, tokenParserList, annotations) {
    var instance = this;
    var logger = instance.logger;
    var tokenParserList = {};

    files.forEach(function (file) {
        var TokenParserClass = require(file);

        var tokenParser = new TokenParserClass();

        tokenParser.annotations = annotations;
        tokenParser.expressionParser = tokenParserList;
        tokenParser.logger = logger;

        tokenParser.init();

        tokenParserList[TokenParserClass.name] = tokenParser;
    });

    return tokenParserList;
};

/**
 * Initialize all annotation parsers
 *
 * @param files
 * @returns {{}}
 */
Factory.prototype._initializeAnnotationParser = function (files, tokenParserList) {
    var instance = this;
    var logger = instance.logger;
    var annotationParserList = {};

    files.forEach(function (file) {
        var AnnotationParser = require(file);
        var supports = AnnotationParser.SUPPORTS;
        if (supports && supports.length > 0) {
            supports.forEach(function (annotationName) {

                var annotationParser = new AnnotationParser();

                annotationParser.annotationParser = annotationParserList;
                annotationParser.tokenParser = tokenParserList;
                annotationParser.logger = logger;

                annotationParserList[annotationName] = annotationParser;
            });
        }
    });

    return annotationParserList;
};

/**
 * Sub initializiation method for structure parser
 */
Factory.prototype._initializeStructureParser = function (tokenParserList) {
    var instance = this;
    var logger = instance.logger;

    structureParser.removeTokens = ['BlockStatement', 'AssignmentExpression', 'Identifier', 'Literal', 'ClassBody', 'ClassExpression']
    structureParser.expressionParser = tokenParserList;
    structureParser.logger = logger;
    structureParser.init();

};

/**
 * Sub initialization method for ContextBuilder
 *
 * @param               Annotation parser list
 */
Factory.prototype._initializeContextBuilder = function (annotationParserList) {
    var instance = this;
    var logger = instance.logger;

    contextBuilder.annotationParser = annotationParserList;
    contextBuilder.logger = logger;

    // Order is important
    contextBuilder.stages = [
        global.stages._STASHING_,
        global.stages._INHERIT_,
        global.stages._INSTANTIATE_,
        global.stages._INJECT_,
        global.stages._AOP_INITIALIZE,
        global.stages._AOP_WIRE,
        global.stages._INITIALIZE_,
        global.stages._RUN_,
        global.stages._FINISH_SETUP_
    ];

    contextBuilder.init();
};

/**
 * Parser context beans are served as external beans
 *
 * @private
 */
Factory.prototype._serveParserContext = function (params) {

    var instance = this;

    var parserContext = {
        AnnotationStructureParser: {
            _instance: structureParser
        },
        AnnotationDependencyBuilder: {
            _instance: dependencyBuilder
        },
        AnnotationContextBuilder: {
            _instance: contextBuilder
        },
        AnnotationFactory: {
            _instance: instance
        },
        AnnotationBaseParser: {
            virtual: function () {
                return BaseParser
            }
        },
        Esprima: {
            _instance: esprima
        },
        Estravers: {
            _instance: estraverse
        },
        Util: {
            _instance: util
        },
        Parameter: {
            _instance: params
        }
    }

    return parserContext;
};

/**
 * Method fakes external objects as ressource beans
 *
 * @param externals
 * @returns {{}}
 * @private
 */
Factory.prototype._fakeExternalResources = function (externals) {

    var externalBeans = {};
    var firstIdentifier = null;

    if (externals) {
        for (var name in externals) {

            // Key namespace
            var identifier = uuidV4();

            // Fake key namespace
            firstIdentifier = firstIdentifier ? firstIdentifier : identifier;

            var externalBean = externals[name]._instance;
            var virtualBean = externals[name].virtual;

            // Add external objects as resources to the later available application context
            var externalResource = {
                namespace: identifier,
                _instance: externalBean,
                virtual: virtualBean,
                descriptor: {
                    annotation: ResourceAnnotation,
                    annotationValue: "(\"" + name + "\")"
                }
            };

            // Prepare own bean structure for externals
            externalBeans[externalResource.namespace] = externalResource;
        }

        // Prepare for merge with application context
        var parserStructur = {};
        parserStructur[firstIdentifier] = externalBeans;

        return parserStructur;
    } else {
        return null;
    }
}

Factory.prototype.bytesToSize = function (memObject, precision) {

    var precision = precision || 4;

    const unit = ['', 'K', 'M', 'G', 'T', 'P'];

    var formated = {}

    for (var name in memObject) {
        var input = memObject[name];

        if (unit >= unit.length) {
            return input + ' B';
        }

        var index = Math.floor(Math.log(input) / Math.log(1024));
        formated[name] = (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B' + ' (' + input + ')';
    }

    return formated;
}

/**
 * Main factory function. Will be called by "bootstrap"
 *
 * @param parameters                    The processing paramteters
 * @returns {Promise.<TResult>}         Parsing promise(s)
 */
Factory.prototype.process = function (parameters) {
    var instance = this;
    var logger = instance.logger;
    var contextBuilder = instance.contextBuilder;

    var additionalPlugins = parameters.additionalPlugins || null;

    logger.info("Scanning for plugins ... ");
    // Scan for plugins
    var pluginCounter = instance._scanForPlugins(additionalPlugins, parameters);
    if (pluginCounter > 0) {
        instance.once(global.phase._BUILD_FINISHED_, function (pluginStack) {

            // Emit plugin stack
            instance.emit(global.phase._FINAL_PLUGIN_CONTEXT_, pluginStack);

            instance._parseFiles(parameters)
            instance.once(global.phase._BUILD_FINISHED_, function (applicationStack) {

                // Emit applicaton stack
                instance.emit(global.phase._FINAL_APPLICATION_CONTEXT_, applicationStack);

            });
        })
    } else {
        instance._parseFiles(parameters)
        instance.once(global.phase._BUILD_FINISHED_, function (applicationStack) {

            // Clean up application stack
            instance.cleanApplicationStructure(applicationStack);
            applicationStack._parameters = parameters;

            // Emit applicaton stack
            instance.emit(global.phase._FINAL_APPLICATION_CONTEXT_, applicationStack);

        });
    }
};

/**
 * Scans for parser plugins. This method takes an array of additional paths which will be scanned for additional plugins.
 *
 * @param additionalPlugins         The array with additional plugin paths
 * @private                         Parsing promise(s)
 */
Factory.prototype._scanForPlugins = function (additionalPlugins, params) {
    var instance = this;

    if (params.skipPlugins) {
        return null;
    }

    var pluginPath = [process.env.PWD + path.sep + "node_modules" + path.sep + "@annotations" + path.sep];

    var parserContext = instance._serveParserContext(params); // Get all parsers, factory and context builder as resource beans

    // Add external plugin directories
    var searchInPath = _.isArray(additionalPlugins) ? pluginPath.concat(additionalPlugins) : pluginPath;

    // Scan for annotation plugins
    var parameters = {
        "scan": searchInPath,
        "externalContext": parserContext
    }

    return instance._parseFiles(parameters);
};

/**
 * Parser files and creates application context(s). Paths to search for files is defined in the given path array.
 *
 * @param {Array} searchInPath                  The defined paths to search in
 * @param {Array} additionalExcludes            Defined paths to be excluded
 * @param {Array} externals                     External objects served
 * @returns {Array}                             Array of parsing promises
 */
Factory.prototype._parseFiles = function (parameters) {

    var instance = this;
    var logger = instance.logger;

    var searchInPath = parameters.scan;
    var excludes = parameters.excludes || [];
    var externalBeans = parameters.externalContext || null;

    if (!_.isArray(searchInPath)) {
        searchInPath = [searchInPath];
    }

    searchInPath.forEach(function (searchPath) {
        if (!searchPath.includes("/node_modules")) {
            excludes.push(searchPath + "**/node_modules/**/*.js");
            excludes.push(searchPath + "**/test/**/*.js");
        }
    });


    logger.info("... building dependencies ...");
    var scanGlobs = dependencyBuilder.buildStandardScanGlobs(searchInPath);


    // Process external beans
    var packageCounter = 0;
    var externalContext = instance._fakeExternalResources(externalBeans) || null;
    var parsingPromises = [];

    /*
     * Listening to the parsing process
     */
    function buildListener(beans) {
        instance.stacks.push(beans);
        packageCounter--;

        if (packageCounter === 0) {
            instance.emit(global.phase._BUILD_FINISHED_, instance.stacks);
            instance.stacks = [];
        }
    };

    var listener = contextBuilder.listeners(global.phase._BUILD_FINISHED_);
    listener.forEach(function (func) {
        if (func.name === buildListener.name) {
            contextBuilder.removeListener(global.phase._BUILD_FINISHED_, func);
        }
    })

    contextBuilder.on(global.phase._BUILD_FINISHED_, buildListener);

    for (var scanIndex = 0; scanIndex < scanGlobs.length; scanIndex++) {
        /*
         * Prepare scan
         */
        var scan = scanGlobs[scanIndex].searchIn;
        var scanExcludes = excludes;

        /*
         * Load dependencies
         */
        var dependencyPackages = dependencyBuilder.loadDependencies(scan, scanExcludes);

        if (!_.isEmpty(dependencyPackages)) {

            packageCounter++;

            /*
             * Parse results
             */
            contextBuilder.parseFileInformation(dependencyPackages).then(function (applicationStack) {

                // If externals are given
                if (externalContext) {
                    applicationStack = _.merge(applicationStack, externalContext);
                }

                var processStack = [
                    applicationStack,
                    0
                ];

                contextBuilder.processApplicationStack(processStack);
            });
        }
    }

    return packageCounter;
};


Factory.prototype.cleanApplicationStructure = function (applicationStructure) {

    var instance = this;

    //console.log("==========================================");
    //console.log("CLEANUP");
    //console.log("==========================================");

    applicationStructure[0].classToBean = null;
    delete applicationStructure[0].classToBean;


    for (var beanName in applicationStructure[0]["nameToNamespace"]) {

        if (applicationStructure[0]["nameToNamespace"][beanName].descriptor) {
            var annotationInformation = {

                "annotationValue": applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotationValue,
                "annotation": applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotation,
                "parentBeanName": applicationStructure[0]["nameToNamespace"][beanName].descriptor.parentBeanName
            };
        }

        applicationStructure[0]["nameToNamespace"][beanName].descriptor = {};
        applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotationInformation = annotationInformation;
        //delete applicationStructure[0]["nameToNamespace"][beanName].descriptor;

        applicationStructure[0]["nameToNamespace"][beanName].resolve = null;
        delete applicationStructure[0]["nameToNamespace"][beanName].resolve;

        applicationStructure[0]["nameToNamespace"][beanName].reject = null;
        delete applicationStructure[0]["nameToNamespace"][beanName].reject;

        applicationStructure[0]["nameToNamespace"][beanName].annotationPromises = null;
        delete applicationStructure[0]["nameToNamespace"][beanName].annotationPromises;

        applicationStructure[0]["nameToNamespace"][beanName].loader = null;
        delete applicationStructure[0]["nameToNamespace"][beanName].loader;

        if (applicationStructure[0]["nameToNamespace"][beanName].structure) {
            applicationStructure[0]["nameToNamespace"][beanName].structure.forEach(function (struct) {

                struct.start = null;
                delete struct.start;
                struct.codeStart = null;
                delete struct.codeStart;

                struct.end = null;
                delete struct.end;
                struct.codeEnd = null;
                delete struct.codeEnd;
            });
        }

        //var properties = Object.getOwnPropertyNames(applicationStructure[0]["nameToNamespace"][beanName]._instance)

        //console.log(beanName);
        //console.log(properties);

    }

    //instance._generateClassDiagramm(applicationStructure);

};

/**
 * Generates a class diagramm from the given application context
 * @private
 */
Factory.prototype._generateClassDiagramm = function (applicationStructure) {

    var nameToNamespace = applicationStructure[0]["nameToNamespace"];

    var objectFunctions = [];
    var obj = new Object();
    var emptyObject = new Object();

    var props = [];

    do {
        props = props.concat(Object.getOwnPropertyNames(emptyObject));
    } while (emptyObject = Object.getPrototypeOf(emptyObject));

    objectFunctions = props.sort().filter(function (e, i, arr) {
        if (e != arr[i + 1] && typeof obj[e] == 'function') return true;
    });

    var annotationMarks = {};
    annotationMarks.Prototype = " << (P,9fa8f2) >>";
    annotationMarks.Aspect = " << (A,#01c67b) >>";
    annotationMarks.Configuration = " << (C,#e3e4ea) >>";
    annotationMarks.Properties = " << (P,#678abf) >>";

    var information = {};


    var outputDir = null;
    var imageTitle = null;

    var projectLandScape = applicationStructure._parameters.projectLandScape || undefined;

    //console.log(util.inspect(applicationStructure, {depth:25}));

    if (projectLandScape) {

        var projectLandscapeDir = projectLandScape.dir;
        var canvas = projectLandScape.canvas + "\n";
        if (canvas) {
            canvas = "";
        }
        var imageType = projectLandScape.mapType || "svg";
        var showBeanNames = projectLandScape.showBeanNames || false;
        var useBeanNames = projectLandScape.useBeanNames || false;
        var showObjectMethods = projectLandScape.showObjectMethods || false;
        var style = projectLandScape.monochrome || false;


        var fileContents = "@startuml\n";

        fileContents += "skinparam defaultFontSize 11\n";
        fileContents += "skinparam legendBackgroundColor GhostWhite\n";
        fileContents += "skinparam legendFontSize 9\n";

        // Templating

        if (style) {
        fileContents += `
skinparam monochrome true
skinparam classAttributeIconSize 0
hide circles
hide empty members
skinparam packageStyle frame
skinparam shadowing false

`;
        }

        fileContents += canvas;

        if (showBeanNames) {
            showClasses = true;
        }

        // Classes
        for (var beanName in applicationStructure[0]["nameToNamespace"]) {


            if (applicationStructure[0]["nameToNamespace"][beanName]._isContext) {
                outputDir = path.dirname(applicationStructure[0]["nameToNamespace"][beanName].path);
                imageTitle = applicationStructure[0]["nameToNamespace"][beanName].beanName;
            }

            //console.log(applicationStructure[0]["nameToNamespace"][beanName]);

            var className = applicationStructure[0]["nameToNamespace"][beanName]._className;

            if (!className) {
                className = beanName;
            }

            var type = applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotationInformation.annotation.name;

            // Count elements in sheet by type
            information[type] = information[type] || 1;

            // Singleton dot or something else

            var singleton = "";

            if (useBeanNames) {
                className = beanName;

                singleton = " << (S,#FF7700) >>";
                singleton = annotationMarks[type] || " << (S,#FF7700) >>";

                /*
                console.log(beanName);
                console.log(type);
                console.log(applicationStructure[0]["nameToNamespace"][beanName].descriptor);
                console.log("\n");
                */
            }

            // Add object to UML
            fileContents += "class " + className + singleton + " {\n";

            if (showBeanNames) {
                fileContents += "  Bean: " + className + "\n..\n";
            }

            if (!applicationStructure[0]["nameToNamespace"][beanName]._isAspect) {

                // Writing attributes
                var private = [];
                var properties = Object.getOwnPropertyNames(applicationStructure[0]["nameToNamespace"][beanName]._instance);
                properties.forEach(function (property) {

                    var visibility = "+";

                    if (property.startsWith("_")) {

                        visibility = "-";
                        private.push(" " + visibility + property + "\n");

                    } else {

                        fileContents += " " + visibility + property + "\n";
                    }

                });

                fileContents += private.join("");

                var methods = applicationStructure[0]["nameToNamespace"][beanName]._methods;

                if (!showObjectMethods && methods) {
                    methods = methods.filter(function (element) {

                        return !objectFunctions.includes(element);

                    });
                }


                if (methods) {

                    var private = [];
                    methods.forEach(function (method) {

                        var visibility = "+";

                        if (method.startsWith("_")) {
                            visibility = "-";
                            private.push(" " + visibility + method + "()\n");
                        } else {
                            fileContents += " " + visibility + method + "()\n";
                        }
                    });

                    fileContents += private.join("");
                }
            } else {

                var pointCuts = applicationStructure[0]["nameToNamespace"][beanName]._pointCuts;

                for (var pointCutName in pointCuts) {

                    var pointCutObj = pointCuts[pointCutName]._pointCut + "\n";

                    fileContents += "  PointCut: " + pointCutObj;

                }

                var methods = applicationStructure[0]["nameToNamespace"][beanName]._methods;

                methods = methods.filter(function (element) {

                    return !objectFunctions.includes(element);

                });

                if (methods) {

                    var private = [];
                    methods.forEach(function (method) {

                        var visibility = "+";

                        if (method.startsWith("_")) {
                            visibility = "-";
                            private.push(" " + visibility + method + "()\n");
                        } else {
                            fileContents += " " + visibility + method + "()\n";
                        }
                    });

                    fileContents += private.join("");
                }

            }

            fileContents += "}\n";
        }


        var inheritances = [];
        var prototypes = [];

        for (var beanName in applicationStructure[0]["nameToNamespace"]) {

            var annotationInformation = applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotationInformation;

            var className = applicationStructure[0]["nameToNamespace"][beanName]._className;

            if (useBeanNames) {
                className = beanName;
            }

            if (typeof annotationInformation.parentBeanName !== "undefined") {

                var parentClassStructure = applicationStructure[0]["nameToNamespace"][annotationInformation.parentBeanName];
                var parentClass = parentClassStructure._className;

                if (useBeanNames) {
                    parentClass = annotationInformation.parentBeanName;
                }

                inheritances.push(parentClass + " *.. " + className + " : inherits\n");
                prototypes.push(annotationInformation.parentBeanName);

            }
        }

        // Usage
        for (var beanName in applicationStructure[0]["nameToNamespace"]) {

            var className = applicationStructure[0]["nameToNamespace"][beanName]._className;


            if (useBeanNames || !className) {
                className = beanName;
            }

            if (!prototypes.includes(beanName) && applicationStructure[0]["nameToNamespace"][beanName].structure) {
                var structure = applicationStructure[0]["nameToNamespace"][beanName].structure;

                structure.forEach(function (annotationInformation) {

                    if (annotationInformation.injector) {

                        //console.log(annotationInformation);

                        var injectorClassStructure = applicationStructure[0]["nameToNamespace"][annotationInformation.sourceBean];
                        var injectorClass = annotationInformation.sourceBean;

                        console.log(annotationInformation.sourceBean);
                        console.log(annotationInformation._className);
                        console.log("\n");

                        if (injectorClassStructure) {
                            injectorClass = injectorClassStructure._className;
                        }

                        if (useBeanNames) {
                            injectorClass = annotationInformation.sourceBean;
                        }

                        if (injectorClassStructure) {
                            fileContents += injectorClass + " <-- " + className + "\n";
                        }
                    }

                });
            }
        }

        fileContents += inheritances.join("");


        // Copyright

        fileContents += "\n\nlegend left\n";

        fileContents += "== Project information:\n\n";

        var scan = applicationStructure._parameters.scan;
        fileContents += "Scan dirs:\n\n";
        scan.forEach(function(dir) {
           fileContents += "    * //"+dir +"//\n";
        });

        fileContents += "\nObjects:\n\n";
        var total = 0;
        for (type in information) {
            fileContents += "    " + type + ":" + information[type] + "\n";
            total += information[type];
        }

        fileContents += "\n    **__Total objects: " + total + "__**\n";

        fileContents += "\n"

        fileContents += "endlegend\n";

        fileContents += "@enduml\n";

        var tmpDir = os.tmpdir();

        var tmpFileName = uuidV4() + ".txt"

        var tmpFile = path.join("/tmp", tmpFileName);

        var savePath = path.join(projectLandscapeDir, imageTitle);

        fs.writeFile(tmpFile, fileContents, function (err) {
            if (err)
                return console.log(err);

            var gen = plantuml.generate(tmpFile, {format: imageType});
            gen.out.pipe(fs.createWriteStream(savePath + "_" + uuidV4() + "." + imageType));
        });

        //console.log(fileContents);
    }

};

module.exports = exports = new Factory();