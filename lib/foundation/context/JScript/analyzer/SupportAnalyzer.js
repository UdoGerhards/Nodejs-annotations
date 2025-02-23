"use strict";

import AbstractBaseAnalyzer from "./base/AbstractBaseAnalyzer";

class SupportAnalyzer extends AbstractBaseAnalyzer {

    constructor() {

        super();

        let instance = this;
        instance.LogManager = this;
    }
}

export default new SupportAnalyzer();