'use strict';


/**
 * @Context("Application")
 * @JSDocSupport()
 * @Autowire()
 */

class Context {

    constructor() {

        var instance = this;

        instance.typeBean = null;

        instance.typedParamsBean = null;

        instance.testService = null;

    }
}

module.exports = exports = Context;