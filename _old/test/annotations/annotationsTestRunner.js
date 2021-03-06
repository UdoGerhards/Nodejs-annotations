'use strict';

/**
 * Created by udogerhards on 20.10.18.
 */
'use strict';
const fs = require('fs');
const glob = require('glob-fs')({
  gitignore: true
});

// Get all test specification files from directory
var testFiles = fs.readdirSync(__dirname + "/spec");

// Setup-code - Do this one time before any test suite started
var randomNumber = Math.random();

//var testFiles = glob.readdirSync('./spec/**/*.js');

// Require all the tests and supply with the same random number

/*
testFiles.forEach(function(file) {

  let execute = true;
  let nonExec = [
    "_",
    "Aop",
    "Init",
    "Inject",
    "Instance",
    "Meta",
    "Run"
  ];

  for (let index = 0; index < nonExec.length; index++) {
    execute = !file.includes(nonExec[index]) & execute;
  }

  if (execute) {
    require("./" + file);
  }
});
*/
// Mocha command to run tests (since Mocha doesn't access them directly)
//run();
