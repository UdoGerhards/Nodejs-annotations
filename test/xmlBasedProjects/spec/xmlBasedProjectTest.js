'use strict';


var assert = require("chai").assert
    , log4js = require("log4js")
    , path = require("path")
    , Promise = require("bluebird");

/**
 * Created by udogerhards on 20.10.18.
 */

describe("XML based context annotation test suite", function(){

    var timeout = 50000;
    var moduleDir = process.env.PWD.replace("/test","").replace("resources",""). replace("xmlBasedProjects", "");

    let FoundationClassPath = path.join(moduleDir, "lib", "foundation", "Foundation.js");
    let Foundation = require(FoundationClassPath);

    it('Should instantiate a simple project ', function() {

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

            XMLParser.init(simpleProjectPath, contextConfiguration);

            let applicationContext = XMLParser.process();

            return applicationContext.then(function(res){
                console.log(res);

                return res;
            });
        });
    });
});