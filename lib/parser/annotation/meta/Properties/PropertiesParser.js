'use strict';

var PropertiesAnnotation = require("../../../../annotation/meta/Properties/PropertiesAnnotationClass.js")
    , BeanParser = require("../../instance/Bean/BeanAnnotationParser.js")
    , glob = require("glob")
    , path = require("path")
    , fs = require("fs")
    , util = require("util")
    , _ = require("lodash")
    , Promise = require("bluebird")
    , camelcase = require("camelcase");

class PropertiesParser extends BeanParser {
    static get SUPPORTS() {
        return [PropertiesAnnotation.name]
    };

    constructor() {
        super();

        var instance = this;
        instance.processors = {};

        var processors = glob.sync(__dirname+"/Processor/**.js");

        for (var index=0; index < processors.length; index++) {

            var ProcClass = require(processors[index]);
            var procInstance = new ProcClass();

            var fileEndings = ProcClass.SUPPORTS();

            for(var indexEndings=0; indexEndings < fileEndings.length; indexEndings++) {
                instance.processors[fileEndings[indexEndings]] = procInstance;
            }
        }
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

            var files = glob.sync(scanPath);
            for (var index = 0; index < files.length; index++){
                var path = files[index];
                var lstat = fs.lstatSync(path);

                if (lstat.isFile()) {
                    if (!_.isArray(beanStructure._properties) ) {
                        beanStructure._properties = [];
                    }
                    beanStructure._properties.push(path);
                };
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

        var instance = this;
        var promises = [];

        for (var index = 0; index < beanStructure._properties.length; index++) {

            var filePath = beanStructure._properties[index];

            var extension = path.extname(filePath);

            var processor = instance.processors[extension];

            var fPromise = processor.process(filePath);

            promises.push(fPromise);
        }

        beanStructure._beanPromises = promises;

        Promise.all(promises).then(function(results){

            for (var index=0; index < results.length; index++) {

                var result = results[index];

                var fileName = path.basename(filePath);

                var name = camelcase(fileName.replace(extension, ""));
                if (result.__name__ ) {
                    name = camelcase(result.__name__);
                }

                //var className = camelcase('Foo-Bar', {pascalCase: true})+"Class";

                // var className = name.toUpperCase()+"Class";

                var className = name.replace(/^\w/, c => c.toUpperCase())+"_VClass";

                if (!applicationStructure.classToBean) {
                    applicationStructure.classToBean = {};
                }

                if (!applicationStructure.classToBean[className]) {
                    applicationStructure.classToBean[className] = [];
                }

                applicationStructure.classToBean[className].push(result);

                applicationStructure.nameToNamespace[name] = {}
                applicationStructure.nameToNamespace[name]._instance = result;
                applicationStructure.nameToNamespace[name].descriptor = {
                    "annotationValue": "(\""+name+"\")",
                    "annotation": PropertiesAnnotation
                };

                //console.log(applicationStructure.nameToNamespace[name]);
            }
        });
    }
}

module.exports = exports = PropertiesParser;