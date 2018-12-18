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
                            relationship: "generalization"
                        }
                        injectionObject.push(injection)
                    }
                }

            });
        }
    }

    return injectionObject;

};

const __createObjectModel = function (applicationStructure, useBeanNames, excludeResources, avoidDefaultMethods) {

    var objectModel = [];

    /*
     * Get default method names for basis object
     */

    var emptyObject = new Object();
    var baseObjProps = [];

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


        if (useBeanNames || !className) {
            className = beanName;
        }

        var objectInformation = {
            key: className,
            name: className,
            properties: properties,
            methods: methods
        };


        objectModel.push(objectInformation);
    }

    return objectModel;

};

async function draw(applicationStructure) {

    var projectLandScape = applicationStructure._parameters.projectLandScape;
    var outputDir = projectLandScape.dir;
    var imageName = projectLandScape.imageName;
    var imageType = projectLandScape.imageType;
    var excludeResources = projectLandScape.excludeResources;
    var useBeanNames = projectLandScape.useBeanNames;
    var avoidDefaultMethods = projectLandScape.avoidDefaultMethods;

    if (!imageName) {

        for (var beanName in applicationStructure[0]["nameToNamespace"]) {
            if (applicationStructure[0]["nameToNamespace"][beanName]._isContext) {
                imageName = applicationStructure[0]["nameToNamespace"][beanName].beanName+"_"+new Date().toISOString();
                break;
            }
        }

    }

    const objectModel = __createObjectModel(applicationStructure, useBeanNames, excludeResources, avoidDefaultMethods);
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
    page.setContent('<div id="myDiagramDiv" style="border: solid 1px black; width:5000px; height:5000px"></div>');
    var data = {
        objectModel: objectModel,
        inheritances: inheritances,
        injections: injections
    };

    // Set up a Diagram, and return the result of makeImageData:
    const imageData = await page.evaluate(data => {

        var $ = go.GraphObject.make;

        myDiagram =
            $(go.Diagram, "myDiagramDiv",
                {
                    initialContentAlignment: go.Spot.LeftCenter,
                    "animationManager.isEnabled": true,
                    "undoManager.isEnabled": true,
                    layout: $(go.TreeLayout,
                        { // this only lays out in trees nodes connected by "generalization" links
                            angle: 90,
                            path: go.TreeLayout.PathSource,  // links go from child to parent
                            setsPortSpot: false,  // keep Spot.AllSides for link connection spot
                            setsChildPortSpot: false,  // keep Spot.AllSides
                            arrangement: go.TreeLayout.ArrangementHorizontal,
                            // nodes not connected by "generalization" links are laid out horizontally
                            //arrangement: go.TreeLayout.ArrangementHorizontal,
                            layerSpacing: 100,
                            nodeSpacing: 100,
                            alternateLayerSpacing: 160,
                            alternateNodeSpacing: 160,
                            //treeStyle: go.TreeLayout.StyleAlternating,
                            //alignment: go.TreeLayout.AlignmentBus,
                            //alternateAlignment: go.TreeLayout.AlignmentCenterSubtrees,
                        })
                });

        // show visibility or access as a single character at the beginning of each property or method
        function convertVisibility(v) {
            switch (v) {
                case "public":
                    return "+";
                case "private":
                    return "-";
                case "protected":
                    return "#";
                case "package":
                    return "~";
                default:
                    return v;
            }
        }

        // the item template for properties
        var propertyTemplate =
            $(go.Panel, "Horizontal",
                // property visibility/access
                $(go.TextBlock,
                    {isMultiline: false, editable: false, width: 12},
                    new go.Binding("text", "visibility", convertVisibility)),
                // property name, underlined if scope=="class" to indicate static property
                $(go.TextBlock,
                    {isMultiline: false, editable: true},
                    new go.Binding("text", "name").makeTwoWay(),
                    new go.Binding("isUnderline", "scope", function (s) {
                        return s[0] === 'c'
                    })),
                // property type, if known
                $(go.TextBlock, "",
                    new go.Binding("text", "type", function (t) {
                        return (t ? ": " : "");
                    })),
                $(go.TextBlock,
                    {isMultiline: false, editable: true},
                    new go.Binding("text", "type").makeTwoWay()),
                // property default value, if any
                $(go.TextBlock,
                    {isMultiline: false, editable: false},
                    new go.Binding("text", "default", function (s) {
                        return s ? " = " + s : "";
                    }))
            );

        // the item template for methods
        var methodTemplate =
            $(go.Panel, "Horizontal",
                // method visibility/access
                $(go.TextBlock,
                    {isMultiline: false, editable: false, width: 12},
                    new go.Binding("text", "visibility", convertVisibility)),
                // method name, underlined if scope=="class" to indicate static method
                $(go.TextBlock,
                    {isMultiline: false, editable: true},
                    new go.Binding("text", "name").makeTwoWay(),
                    new go.Binding("isUnderline", "scope", function (s) {
                        return s[0] === 'c'
                    })),
                // method parameters
                $(go.TextBlock, "()",
                    // this does not permit adding/editing/removing of parameters via inplace edits
                    new go.Binding("text", "parameters", function (parr) {
                        var s = "(";
                        for (var i = 0; i < parr.length; i++) {
                            var param = parr[i];
                            if (i > 0) s += ", ";
                            s += param.name + ": " + param.type;
                        }
                        return s + ")";
                    })),
                // method return type, if any
                $(go.TextBlock, "",
                    new go.Binding("text", "type", function (t) {
                        return (t ? ": " : "");
                    })),
                $(go.TextBlock,
                    {isMultiline: false, editable: true},
                    new go.Binding("text", "type").makeTwoWay())
            );

        // this simple template does not have any buttons to permit adding or
        // removing properties or methods, but it could!
        myDiagram.nodeTemplate =
            $(go.Node, "Auto",
                {
                    locationSpot: go.Spot.Center,
                    fromSpot: go.Spot.AllSides,
                    toSpot: go.Spot.AllSides
                },
                $(go.Shape, {fill: "lightyellow"}),
                $(go.Panel, "Table",
                    {defaultRowSeparatorStroke: "black"},
                    // header
                    $(go.TextBlock,
                        {
                            row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
                            font: "bold 12pt sans-serif",
                            isMultiline: false, editable: true
                        },
                        new go.Binding("text", "name").makeTwoWay()),
                    // properties
                    $(go.TextBlock, "Properties",
                        {row: 1, font: "italic 10pt sans-serif"},
                        new go.Binding("visible", "visible", function (v) {
                            return !v;
                        }).ofObject("PROPERTIES")),
                    $(go.Panel, "Vertical", {name: "PROPERTIES"},
                        new go.Binding("itemArray", "properties"),
                        {
                            row: 1, margin: 3, stretch: go.GraphObject.Fill,
                            defaultAlignment: go.Spot.Left, background: "lightyellow",
                            itemTemplate: propertyTemplate
                        }
                    ),
                    $("PanelExpanderButton", "PROPERTIES",
                        {row: 1, column: 1, alignment: go.Spot.TopRight, visible: false},
                        new go.Binding("visible", "properties", function (arr) {
                            return arr.length > 0;
                        })),
                    // methods
                    $(go.TextBlock, "Methods",
                        {row: 2, font: "italic 10pt sans-serif"},
                        new go.Binding("visible", "visible", function (v) {
                            return !v;
                        }).ofObject("METHODS")),
                    $(go.Panel, "Vertical", {name: "METHODS"},
                        new go.Binding("itemArray", "methods"),
                        {
                            row: 2, margin: 3, stretch: go.GraphObject.Fill,
                            defaultAlignment: go.Spot.Left, background: "lightyellow",
                            itemTemplate: methodTemplate
                        }
                    ),
                    $("PanelExpanderButton", "METHODS",
                        {row: 2, column: 1, alignment: go.Spot.TopRight, visible: false},
                        new go.Binding("visible", "methods", function (arr) {
                            return arr.length > 0;
                        }))
                )
            );

        function convertIsTreeLink(r) {
            return r === "generalization";
        }

        function convertFromArrow(r) {
            switch (r) {
                case "generalization":
                    return "";
                default:
                    return "";
            }
        }

        function convertToArrow(r) {
            switch (r) {
                case "generalization":
                    return "Triangle";
                case "aggregation":
                    return "StretchedDiamond";
                default:
                    return "";
            }
        }


        myDiagram.linkTemplate =
            $(go.Link,
                {routing: go.Link.Orthogonal},
                new go.Binding("isLayoutPositioned", "relationship", convertIsTreeLink),
                $(go.Shape),
                $(go.Shape, {scale: 1.3, fill: "white"},
                    new go.Binding("fromArrow", "relationship", convertFromArrow)),
                $(go.Shape, {scale: 1.3, fill: "white"},
                    new go.Binding("toArrow", "relationship", convertToArrow))
            );

        myDiagram.model = $(go.GraphLinksModel,
            {
                copiesArrays: true,
                copiesArrayObjects: true,
                nodeDataArray: data.objectModel,
                linkDataArray: data.injections
            });

        //return myDiagram.makeImageData();

        // return myDiagram.makeSVG();

        var svg = myDiagram.makeSvg({scale: 1, background: "white"});
        var svgstr = new XMLSerializer().serializeToString(svg);

        return svgstr;

    }, data);

    await browser.close();

    // Output the GoJS makeImageData as a .svg:
    var inagePath = path.join(outputDir, imageName + "." + "svg");
    var browserPagePath = path.join(outputDir, imageName + "." + "html");

    fs.writeFileSync(inagePath, imageData);

    if (imageType != "svg") {

        var inagePath = path.join(outputDir, imageName + "." + imageType);

        svg2img(imageData, {format: imageType}, function (error, buffer) {
            //default jpeg quality is 75
            fs.writeFileSync(inagePath, buffer);
        });

    }
};

module.exports = exports = draw;