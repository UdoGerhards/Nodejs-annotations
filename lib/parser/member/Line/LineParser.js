'use strict';

var path = require("path")
    , util = require("util")
    , BlockParser = require(process.env.PWD+path.sep+"lib"+path.sep+"parser"+path.sep+"member"+path.sep+"Block"+path.sep+"BlockParser.js");

class Line extends BlockParser {
    constructor() {
        super();
        var instance = this;
    }

    init() {
        super.init();
        var instance = this;
    }
}

module.exports = exports = Line;