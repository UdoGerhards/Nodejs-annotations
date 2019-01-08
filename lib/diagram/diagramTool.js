'use strict';

// This example loads the GoJS library then adds HTML from scratch and evaluates some JavaScript,
// then creates a screenshot of Diagram with makeImageData, plus a screenshot of the page.

const fs = require('fs')
const path = require("path");

const __sortLexical = function(objectA, objectB) {
    var property = "name";
    var propertyA = objectA[property];
    var propertyB = objectB[property];

    return !propertyA.localeCompare(propertyB);
    //return propertyA > propertyB;
};

/**
 * Creates the inheritance model
 *
 * @param applicationStructure
 * @param useBeanNames
 * @returns {{inheritance: Array, prototypes: Array}}
 * @private
 */
const __createInheritances = function (applicationStructure, useBeanNames) {

    var inheritanceObject = [];
    var prototypes = [];

    for (var beanName in applicationStructure) {

        var annotationInformation = applicationStructure[beanName].descriptor.annotationInformation;

        var className = applicationStructure[beanName]._className;

        if (useBeanNames) {
            className = beanName;
        }

        if (typeof annotationInformation.parentBeanName !== "undefined") {

            className = "\"" + className + "\"";

            var parentClassStructure = applicationStructure[annotationInformation.parentBeanName];
            var parentClass = parentClassStructure._className;

            if (useBeanNames) {
                parentClass = annotationInformation.parentBeanName;
            }

            //inheritances.push(parentClass + " *.. " + className + " : inherits\n");
            var inherits = {
                from: className,
                to: parentClass
            };

            inheritanceObject.push(inherits);
            prototypes.push(parentClass);
        }
    }

    return {
        inheritance: inheritanceObject,
        prototypes: prototypes
    };

};


/**
 * Creates injection model
 *
 * @param applicationStructure
 * @param prototypes
 * @param useBeanNames
 * @returns {Array}
 * @private
 */
const __createInjectionObject = function (applicationStructure, prototypes, useBeanNames) {

    var injectionObject = [];

    for (var beanName in applicationStructure) {

        var className = applicationStructure[beanName]._className;


        if (useBeanNames || !className) {
            className = beanName;
        }

        if (!prototypes.includes(beanName) && applicationStructure[beanName].structure) {

            var structure = applicationStructure[beanName].structure;

            structure.forEach(function (annotationInformation) {

                if (annotationInformation.injector) {

                    var injectorClass = null;

                    var injectorClassStructure = applicationStructure[annotationInformation.sourceBean];

                    if (injectorClassStructure) {
                        injectorClass = injectorClassStructure._className || injectorClassStructure.beanName;
                    }

                    if (useBeanNames) {
                        injectorClass = annotationInformation.sourceBean;
                    }

                    // injectorClass = "\"" + injectorClass + "\"";

                    if (injectorClassStructure) {
                        //fileContents += injectorClass + " <|-- " + className + "\n";
                        var injection = {
                            from: className,
                            to: injectorClass,
                            relationship: "generalization",
                            zOrder: 100
                        }
                        injectionObject.push(injection)
                    }
                }

            });
        }
    }

    return injectionObject;

};

const __createObjectModel = function (applicationStructure, useBeanNames, excludeResources, avoidDefaultMethods, showAnnotations) {

    var objectModel = [];

    /*
     * Get default method names for basis object
     */

    var emptyObject = new Object();
    var baseObjProps = ["_"];

    if (avoidDefaultMethods) {

        do {
            baseObjProps = baseObjProps.concat(Object.getOwnPropertyNames(emptyObject));
        } while (emptyObject = Object.getPrototypeOf(emptyObject));

    }

    for (var beanName in applicationStructure) {

        var annotation = applicationStructure[beanName].descriptor.annotationInformation.annotation;

        /*
         * Exclude external resources of prototypes if requested
         */

        if (annotation.name == "Prototype" || (annotation.name == "Resource" && excludeResources) || (!applicationStructure[beanName].path && excludeResources)) {
            continue;
        }

        var className = applicationStructure[beanName]._className;

        /*
         *  Get all methods
         */
        var privateMethods = [];
        var publicMethods = [];

        var obj = applicationStructure[beanName]._instance;
        var objMethods = [];

        do {
            objMethods = objMethods.concat(Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));


        var func = null;
        try {

            var restricted = [
                "caller",
                "callee",
                "arguments"
            ];

            objMethods = objMethods.sort().filter(function (e, i, arr) {
                func = e;
                if (e != arr[i + 1] && !restricted.includes(e) && !baseObjProps.includes(e) && typeof applicationStructure[beanName]._instance[e] == 'function') {

                    // { name: "deposit", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" },

                    var visibility = "public";
                    if (e.startsWith("_")) {
                        visibility = "private";
                    }


                    var methodEntry = {
                        name: e,
                        visibility: visibility
                    };

                    if (applicationStructure[beanName].jsDoc && applicationStructure[beanName].jsDoc.param) {

                        var params = applicationStructure[beanName].jsDoc.param;

                        for (var index = 0;  index < params.length; index++){
                            var funcParams = params[index];

                            if (funcParams.name == e ) {

                                var parameters  = [];
                                var paramObject = {};
                                funcParams.parameters.forEach(function(paramEntry){

                                    if (Array.isArray(paramEntry.types)) {
                                        paramObject = {
                                            name: paramEntry.name,
                                            type: "[ "+paramEntry.types.join(" | ")+" ]"
                                        }
                                    } else {
                                        paramObject = {
                                            name: paramEntry.name,
                                            type: paramEntry.types
                                        }
                                    }

                                    parameters.push(paramObject);

                                });

                                methodEntry.parameters = parameters;

                                break;
                            }

                        }

                    }

                    if (visibility == "public") {
                        publicMethods.push(methodEntry);
                    } else {
                        privateMethods.push(methodEntry);
                    }

                    //methods.push(methodEntry);

                    return true;
                }
            });
        }
        catch (err) {
            // Access error on funcs like 'arguments', 'callee', etc.
            console.log(err);
        }

        privateMethods.sort(__sortLexical);
        publicMethods.sort(__sortLexical);

        var methods = publicMethods.concat(privateMethods);

        /*
         * Get all properties
         */

        var privateProperties = [];
        var publicProperties = [];

        var obProperties = Object.getOwnPropertyNames(applicationStructure[beanName]._instance);
        obProperties.forEach(function (property) {

            var propObject = {
                name: property
            };

            if (applicationStructure[beanName].jsDoc && applicationStructure[beanName].jsDoc.type) {

                var types = applicationStructure[beanName].jsDoc.type;

                for (var index = 0; index < types.length; index++) {
                    if (types[index].name == property) {

                        var entry = types[index].types.join(" | ");
                        if (types[index].types.length > 1) {
                            propObject.type = "[ " + entry + " ]";
                        } else {
                            propObject.type = entry;
                        }

                        break;
                    }
                }

               // console.log(applicationStructure[beanName].jsDoc);

            }

            if (property.startsWith("_")) {
                propObject.visibility = "private";
                privateProperties.push(propObject);
            } else {
                propObject.visibility = "public";
                publicProperties.push(propObject);
            }

           // properties.push(propObject);
        });

        privateProperties.sort(__sortLexical);
        publicProperties.sort(__sortLexical);

        var properties = publicProperties.concat(privateProperties);

        //var type = applicationStructure[beanName]._instance.constructor.name;
        var type = "Class";
        if (showAnnotations) {
            type = applicationStructure[beanName].descriptor.annotationInformation.annotation.name;
        }

        if (useBeanNames || !className) {
            className = beanName;
        }

        var file = null;
        if (applicationStructure[beanName].path) {
            file = path.basename(applicationStructure[beanName].path);
        }

        try {
            var objectInformation = {
                key: className,
                name: className,
                type: type,
                properties: properties,
                methods: methods,
                zOrder: 1000,
                file: file
            };
        } catch(e) {
            console.log(e);
        }


        objectModel.push(objectInformation);
    }

    return objectModel;

};

async function draw(applicationStructure) {

    try {
    var projectLandScape = applicationStructure._parameters.projectLandScape;
    var outputDir = projectLandScape.dir;
    var excludeResources = projectLandScape.excludeResources === false?false:true;
    var useBeanNames = projectLandScape.useBeanNames  === true?true:false;
    var avoidDefaultMethods = projectLandScape.avoidDefaultMethods  === false?false:true;
    var showAnnotations = projectLandScape.showAnnotations  === true?true:false;

    applicationStructure._parameters = null;
    delete applicationStructure._parameters;

    var appName = null;

    for (var beanName in applicationStructure) {
        if (applicationStructure[beanName]._isContext) {
            appName = applicationStructure[beanName].beanName;
            break;
        }
    }

    const objectModel = __createObjectModel(applicationStructure, useBeanNames, excludeResources, avoidDefaultMethods, showAnnotations);
    var inheritances = __createInheritances(applicationStructure, useBeanNames);
    var injections = __createInjectionObject(applicationStructure, inheritances.prototypes, useBeanNames);

    var data = {
        appName: appName,
        objectModel: objectModel,
        inheritances: inheritances,
        injections: injections
    };

    var dataFile = path.join(outputDir, "data.js");
    var browserPagePath = path.join(outputDir, "index.html");
    var sourceFilePath = path.join(__dirname, "src", "index.html");

    var jsonData = JSON.stringify(data, null, 4);
    var jsonOut = "var data="+jsonData;
    fs.copyFile(sourceFilePath, browserPagePath, (err) => {
        if (err) throw err;
    });

    //fs.writeFileSync(dataFile, jsonOut);

    fs.writeFile(dataFile, jsonOut, (err) => {
        if (err) throw err;
        //process.exit();
    });
    } catch(e) {
        console.log(e);
    }
};

module.exports = exports = draw;