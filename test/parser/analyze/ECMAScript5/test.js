'use strict';

const mocha = require('mocha');
const util = require('util');
const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const esprima = require('esprima');

describe("ECMAScript test", function() {

  const logger = log4js.getLogger();
  const timeout = 50000;

  logger.info("ECMAScript testing ...");

  let LIBRARY = path.join(__dirname.substr(0, __dirname.indexOf("test")),
    "lib");
  const FileObjectClass = require(path.join(LIBRARY, "foundation",
    "context", "analyze", "data", "fileObject.js"));

  let analyzer = require(path.join(LIBRARY, "foundation", "context", "analyze", "analyzer.js"));

  let SOURCES = "sources";
  let filePath = path.join(__dirname, SOURCES, "clazz.js");

  it("Detect simple class", function() {
    logger.info("Test: Detect simple class");

    /*
     * Test preparation
     */
    const bootstrap = require(path.join(LIBRARY, "bootstrap", "bootstrap.js"));

    var contextInfo = {
      "scan": [],
    };

    const fileData = fs.readFileSync(filePath, 'utf8');

    this.timeout(timeout);

    return bootstrap(contextInfo, "INFO", null).then(function(context) {

      try {

        let fileObject = new FileObjectClass();
        fileObject.setPath(filePath);
        fileObject.setData(fileData);

        logger.debug(util.inspect(FileObjectClass.types));
        fileObject.setType(FileObjectClass.types.MODULE);

        logger.debug(util.inspect(fileObject));

        analyzer.process(fileObject);

        logger.debug(context);
      } catch (e) {
        logger.error(e);
      }
    });
  });
});
