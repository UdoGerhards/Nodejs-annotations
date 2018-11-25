'use strict';

var ScanAnnotation = require("../../../../annotation/meta/Scan/ScanAnnotationClass.js")
    , BeanParser = require("../../instance/Bean/BeanAnnotationParser.js")
    , glob = require("glob")
    , path = require("path")
    , fs = require("fs");

class ScanParser extends BeanParser {
    static get SUPPORTS() {
        return [ScanAnnotation.name]
    };

    constructor() {
        super();

        var instance = this;
        instance.processor = [];
    }

    /**
     * Stage the bean
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _stage(annotationInformation, beanStructure, applicationStructure) {

        var instance = this;

        var annotationValue = annotationInformation.annotationValue.replace("(","").replace(")", "").replace(/'/g, "").replace(/"/g, "").replace(/ /g, "").trim().split(";");
        annotationInformation.property = annotationValue;

        for (var index=0; index < annotationValue.length; index++) {
            var scanPath = annotationValue[index];
            if (scanPath.startsWith("/")) {
                scanPath = process.env.PWD+scanPath;
            }

            console.log("\n");
            console.log(scanPath);
            var files = glob.sync(scanPath);
            for (var index = 0; index < files.length; index++){
                var path = files[index];
                console.log(path);
                fs.lstat(path, (err, stats) => {
                    if(err)
                        return console.log(err); //Handle error

                    if (stats.isFile()) {
                        console.log("IsFile");
                        console.log(path);
                    }
                });

            }
        }
    }

    /**
     * Instantiate the bean
     *
     * @param annotationInformation
     * @param beanStructure
     * @private
     */
    _instantiate(annotationInformation, beanStructure, applicationStructure) {

    }
}

module.exports = exports = ScanParser;