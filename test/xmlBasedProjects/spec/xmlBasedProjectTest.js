'use strict';


var assert = require("chai").assert
    , log4js = require("log4js")
    , path = require("path")
    , Promise = require("bluebird");

/**
 * Created by udogerhards on 20.10.18.
 */

describe("XML based context annotation test suite", function(){

    let timeout = 50000;
    let moduleDir = path.normalize(process.env.PWD.replace("/test","").replace("resources",""). replace("xmlBasedProjects", ""));

    let resourcesPath = process.env.PWD ;

    let FoundationClassPath = path.join(moduleDir, "lib", "foundation", "Foundation.js");
    let Foundation = require(FoundationClassPath);

    let bootstrap = require(path.join(moduleDir, "lib", "bootstrap", "bootstrap.js"));

    it('Should prepare the application context for parsing for a simple project ', function() {

        // /Users/udogerhards/Documents/Bitbucket/nodejs-annotations/test/resources/xmlBasedProjects/simple/configuration/context.xml

        var simpleProjectPath = path.join(moduleDir, "test", "resources", "xmlBasedProjects", "simple");
        let contextConfiguration = path.join("configuration", "context.xml");

        /* Inject correct working dir */

        Foundation.init("/lib/configuration/DIAnnotationsContext.xml");

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        var libPromise = Foundation.getFullBaseContext();

        return libPromise.then(function(resolve){

            let XMLParser = resolve["XMLParser"];
            let fulPath = path.join(simpleProjectPath, contextConfiguration);

            XMLParser.init(fulPath);

            let parseResult = XMLParser.process();

            return parseResult.then(function(applicationStack){

                //console.log(applicationStack);

                return applicationStack;
            });
        });
    });


    it('Should instantiate a simple project ', function() {

        let contextConfiguration = path.join(resourcesPath, "simple", "configuration", "context.xml");
        console.error(contextConfiguration)

        var contextInfo = {
            "file": contextConfiguration,
            "projectLandScape": {
                "dir": resourcesPath,
                "useBeanNames": true,
                "showAnnotations": false,
                "avoidDefaultMethods": false,
                "excludeResources": true,
            }
        };

        let test = [1,2,3,4].join(String.fromCharCode(12));


        this.timeout(timeout);
        return bootstrap(contextInfo, "INFO", null).then(function(factory){
            return new Promise(function(resolve, reject){
                factory.on(0xFF, function(applicationStack) {

                    try {

                        console.log(applicationStack);


                        //var context = getContextBean(applicationStack);

                        factory.removeAllListeners();
                    } catch(e) {

                        reject(e);

                    } finally {
                        resolve();
                    }
                });
            });
        })
    });
});