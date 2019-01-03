'use strict';


var assert = require("chai").assert
    , log4js = require("log4js")
    , path = require("path")
    , Promise = require("bluebird");

/**
 * Created by udogerhards on 20.10.18.
 */

describe("AOP annotation test suite", function(){

    var timeout = 50000;

    var resourcesPath = process.env.PWD + path.sep + path.join("resources", "xmlBasedProjects");
    var loggerConfig = process.env.PWD + path.sep + path.join("config", "log4js.json");
    var moduleDir = process.env.PWD.replace("/test","");

    var bootstrap = require(process.env.PWD.replace("/test","") + path.sep + path.join("lib", "bootstrap", "bootstrap.js"));


    it('Should instantiate a simple project ', function() {

        let FoundationClassPath = path.join(moduleDir, "lib", "foundation", "Foundation.js");
        let Foundation = require(FoundationClassPath);

        // /Users/udogerhards/Documents/Bitbucket/nodejs-annotations/test/resources/xmlBasedProjects/simple/configuration/context.xml

        var simpleProjectPath = path.join(process.env.PWD, "test", "resources", "xmlBasedProjects", "simple");
        let contextConfiguration = path.join("configuration", "context.xml");

        console.log(contextConfiguration);

        /* Inject correct working dir */

        Foundation.init("/lib/configuration/DIAnnotationsContext.xml");

        //Foundation.init(contextConfiguration)

        /*
            Bootstrap the context and run the tests
        */
        this.timeout(timeout);

        var libPromise = Foundation.getFullBaseContext();

        return libPromise.then(function(resolve){

            let XMLParser = resolve["XMLParser"];
            XMLParser.init(simpleProjectPath, contextConfiguration);

            let applicationContext = XMLParser.process();

            return applicationContext;
        });
    });
});