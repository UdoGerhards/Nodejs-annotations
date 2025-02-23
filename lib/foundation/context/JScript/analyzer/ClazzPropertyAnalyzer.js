"use strict";

import AbstractBaseAnalyzer from "./base/AbstractBaseAnalyzer";

class ClazzPropertyAnalyzer extends AbstractBaseAnalyzer {

    constructor() {

        super();

        let instance = this;
        instance.LogManager = this;

        instance.annotaton = {};
    }
}

export default new ClazzPropertyAnalyzer();