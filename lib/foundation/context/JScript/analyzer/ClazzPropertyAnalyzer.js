"use strict";

const AbstractBaseAnalyzer = require("./base/AbstractBaseAnalyzer");

class ClazzPropertyAnalyzer extends AbstractBaseAnalyzer {

    constructor() {

        super();

        let instance = this;
        instance.LogManager = this;

        instance.annotaton = {};
    }
}

module.exports = exports = new ClazzPropertyAnalyzer();