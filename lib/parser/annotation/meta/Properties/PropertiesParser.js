'use strict';

class PropertiesParser {
    static get SUPPORTS() {
        return [PropertiesAnnotation.name]
    };

    constructor() {

        var instance = this;
        instance.processors = {};
        instance.glob = null;
        instance.path = null;
        instance.fs =  null;
        instance.Promise = null;
        instance.camelcase = null;
    }

    init() {
        var instance = this;
        var processors = instance.processors;

        super.init();
        var logger = instance.logger;

        logger.info("Intializing PropertiesParser ... ");

         instance.processors = {};

         logger.trace("    Setting up property file processors ... ");
         for (var index=0; index < processors.length; index++) {
             var procInstance = processors[index];
        
             var fileEndings = procInstance.SUPPORTS();

             logger.trace("     using "+procInstance.constructor.name+" ...")
             for(var indexEndings=0; indexEndings < fileEndings.length; indexEndings++) {
                 logger.trace("     => "+fileEndings[indexEndings]);
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
        var glob = instance.glob;
        var fs = instance.fs;

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
                    if (!Array.isArray(beanStructure._properties) ) {
                        beanStructure._properties = [];
                    }
                    // beanStructure.path
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
        var path = instance.path;
        var Promise = instance.Promise;
        var camelcase = instance.camelcase;

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

                name = name.replace(/^\w/, c => c.toUpperCase()); //First letter to upper

                var className = name+"_VClass";

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

                applicationStructure.nameToNamespace[name]._className = className;
                applicationStructure.nameToNamespace[name].path = result.__PATH__;

                applicationStructure.nameToNamespace[name]._instance.__PATH__ = null;
                delete applicationStructure.nameToNamespace[name]._instance.__PATH__;

                //console.log(applicationStructure.nameToNamespace[name]);
            }
        });
    }
}

module.exports = exports = PropertiesParser;