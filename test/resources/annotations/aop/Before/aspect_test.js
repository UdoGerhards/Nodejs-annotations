'use strict';

/**
 * Created by udogerhards on 04.11.18.
 *
 * @Aspect("TestBeforeAspect")
 * @PointCut("beforeFunction")
 */
class Aspect {

    constructor() {};

    /**
     * @Before()
     */
    beforeFunctionAspect(...args) {
        console.log("-------- Aspect::beforeFunctionAspect, start --------");

        console.log("    arguments passed:", ...args);

        console.log("-------- Aspect::beforeFunctionAspect, start --------");
    }
}
module.exports = exports = Aspect;