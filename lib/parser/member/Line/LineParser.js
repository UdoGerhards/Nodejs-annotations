'use strict';

var path = require("path")
    , util = require("util")
    , BlockParser = require("../../../../lib/parser/member/Block/BlockParser");

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