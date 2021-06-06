"use strict";

const AbstractBaseAnalyzer = require("./base/AbstractBaseAnalyzer");

class ClazzMemberAnalyzer extends AbstractBaseAnalyzer {

    constructor() {

        super();

        let instance = this;
        instance.LogManager = this;
    }
}

module.exports = exports = new ClazzMemberAnalyzer();