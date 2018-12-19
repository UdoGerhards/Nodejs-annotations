'use strict';

// This example loads the GoJS library then adds HTML from scratch and evaluates some JavaScript,
// then creates a screenshot of Diagram with makeImageData, plus a screenshot of the page.

const puppeteer = require('puppeteer');
const fs = require('fs')
const path = require("path");
const svg2img = require("svg2img");

const parseDataUrl = (dataUrl) => {
    const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
    if (matches.length !== 3) {
        throw new Error('Could not parse data URL.');
    }
    return {mime: matches[1], buffer: Buffer.from(matches[2], 'base64')};
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

    for (var beanName in applicationStructure[0]["nameToNamespace"]) {

        var annotationInformation = applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotationInformation;

        var className = applicationStructure[0]["nameToNamespace"][beanName]._className;

        if (useBeanNames) {
            className = beanName;
        }

        if (typeof annotationInformation.parentBeanName !== "undefined") {

            className = "\"" + className + "\"";

            var parentClassStructure = applicationStructure[0]["nameToNamespace"][annotationInformation.parentBeanName];
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

    for (var beanName in applicationStructure[0]["nameToNamespace"]) {

        var className = applicationStructure[0]["nameToNamespace"][beanName]._className;


        if (useBeanNames || !className) {
            className = beanName;
        }

        if (!prototypes.includes(beanName) && applicationStructure[0]["nameToNamespace"][beanName].structure) {

            var structure = applicationStructure[0]["nameToNamespace"][beanName].structure;

            structure.forEach(function (annotationInformation) {

                if (annotationInformation.injector) {

                    var injectorClass = null;

                    var injectorClassStructure = applicationStructure[0]["nameToNamespace"][annotationInformation.sourceBean];

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

    for (var beanName in applicationStructure[0]["nameToNamespace"]) {

        var annotation = applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotationInformation.annotation;

        /*
         * Exclude external resources of prototypes if requested
         */

        if (annotation.name == "Prototype" || (annotation.name == "Resource" && excludeResources)) {
            continue;
        }

        var className = applicationStructure[0]["nameToNamespace"][beanName]._className;

        /*
         *  Get all methods
         */
        var methods = [];

        var obj = applicationStructure[0]["nameToNamespace"][beanName]._instance;
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
                if (e != arr[i + 1] && !restricted.includes(e) && !baseObjProps.includes(e) && typeof applicationStructure[0]["nameToNamespace"][beanName]._instance[e] == 'function') {

                    // { name: "deposit", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" },

                    var visibility = "public";
                    if (e.startsWith("_")) {
                        visibility = "private";
                    }


                    var methodEntry = {
                        name: e,
                        visibility: visibility
                    };

                    methods.push(methodEntry);

                    return true;
                }
            });
        }
        catch (err) {
            // Access error on funcs like 'arguments', 'callee', etc.
            console.log(err);
        }

        /*
         * Get all properties
         */

        var properties = [];

        var obProperties = Object.getOwnPropertyNames(applicationStructure[0]["nameToNamespace"][beanName]._instance);
        obProperties.forEach(function (property) {

            var propObject = {
                name: property
            };

            if (property.startsWith("_")) {
                propObject.visibility = "private";
            } else {
                propObject.visibility = "public";
            }

            properties.push(propObject);
        });

        //var type = applicationStructure[0]["nameToNamespace"][beanName]._instance.constructor.name;
        var type = "Class";
        if (showAnnotations) {
            type = applicationStructure[0]["nameToNamespace"][beanName].descriptor.annotationInformation.annotation.name;
        }

        if (useBeanNames || !className) {
            className = beanName;
        }

        var objectInformation = {
            key: className,
            name: className,
            type: type,
            properties: properties,
            methods: methods,
            zOrder: 1000
        };


        objectModel.push(objectInformation);
    }

    return objectModel;

};

async function draw(applicationStructure) {

    var projectLandScape = applicationStructure._parameters.projectLandScape;
    var outputDir = projectLandScape.dir;
    var excludeResources = projectLandScape.excludeResources || true;
    var useBeanNames = projectLandScape.useBeanNames  || false;
    var avoidDefaultMethods = projectLandScape.avoidDefaultMethods  || true;
    var showAnnotations = projectLandScape.showAnnotations  || false;

    var appName = null;

    for (var beanName in applicationStructure[0]["nameToNamespace"]) {
        if (applicationStructure[0]["nameToNamespace"][beanName]._isContext) {
            appName = applicationStructure[0]["nameToNamespace"][beanName].beanName;
            break;
        }
    }

    const objectModel = __createObjectModel(applicationStructure, useBeanNames, excludeResources, avoidDefaultMethods, showAnnotations);
    var inheritances = __createInheritances(applicationStructure, useBeanNames);
    var injections = __createInjectionObject(applicationStructure, inheritances.prototypes, useBeanNames);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //await windowSet(page, 'objectModel', objectModel);

    // Point to a version of go.js, either a local file or one on the web
    await page.addScriptTag({
        // url: 'https://cdnjs.cloudflare.com/ajax/libs/gojs/1.8.7/go.js'
        //path: '../../release/go.js'
        url: 'https://cdnjs.cloudflare.com/ajax/libs/gojs/1.8.35/go.js'
    });

    // Create HTML for the page:
    page.setContent('<div id="myDiagramDiv" style="border: solid 1px black; width:100%; height:100%"></div>');
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
        process.exit();
    });
};

module.exports = exports = draw;