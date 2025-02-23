"use strict";

import AbstractBaseAnalyzer from "./base/AbstractBaseAnalyzer";

class ClazzMemberAnalyzer extends AbstractBaseAnalyzer {

    constructor() {

        super();

        let instance = this;
        instance.LogManager = this;
    }
}

export default new ClazzMemberAnalyzer();