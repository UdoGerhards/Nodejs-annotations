/**
 * Created by udogerhards on 20.10.18.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const log4js = require('log4js');

// Get all test specification files from directory
let files = fs.readdirSync(__dirname);
log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: "file", filename: "test.log" }
  },
  categories: { default: { appenders: ["out", "app"], level: "debug" } }
});

let getFolders = function(name) {
  let tstname = name.toLowerCase(name);
  return !tstname.includes("test") && !tstname.endsWith(".js")?true:false;
}

let getTest = function(name) {
  let tstname = name.toLowerCase(name);
  return tstname.includes("test") && tstname.endsWith(".js")?true:false;
}

let folders = files.filter(getFolders);
const logger = log4js.getLogger();

// Require all the tests and supply with the same random number
folders.forEach(function (folder) {

  let testPath = path.join(__dirname, folder);
  let testDirContents = fs.readdirSync(testPath);
  let testFiles = testDirContents.filter(getTest);

  testFiles.forEach(function(test) {

    let testFile = path.join(testPath, test);
    logger.info(testFile);
    require(testFile);
  });
});

// Mocha command to run tests (since Mocha doesn't access them directly)
//run();
