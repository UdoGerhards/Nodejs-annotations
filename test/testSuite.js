'use strict';

/**
 * Created by udogerhards on 20.10.18.
 */
'use strict';
//const fs = require('fs');

const glob = require('glob');

var testDirectories = [
    "annotations",
    "projects"
];

var testSuites = glob.sync(__dirname+"/{"+testDirectories.join(",")+"}/*.js");

testSuites.forEach(function(testSuite) {
    require(testSuite);
})