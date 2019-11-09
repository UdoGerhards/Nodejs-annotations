'use strict';

/**
 * Created by udogerhards on 20.10.18.
 */
'use strict';
const fs = require('fs');

// Get all test specification files from directory
var testFiles = fs.readdirSync(__dirname + "/spec");

// Setup-code - Do this one time before any test suite started
var randomNumber = Math.random();

// Require all the tests and supply with the same random number
testFiles.forEach(function (file) {
    if (!file.startsWith("_")) {
        require('./spec/' + file);
    }
});

// Mocha command to run tests (since Mocha doesn't access them directly)
//run();