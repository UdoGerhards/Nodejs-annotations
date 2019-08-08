'use strict';

/**
 * Created by udogerhards on 04.11.18.
 *
 * @Aspect("AfterBeforeAspect")
 * @PointCut("afterFunctionC*")
 * @PointCut("afterFunction")
 */
class Aspect {

    constructor() {};

    /**
     * @After()
     */
    afterFunctionAspect(...args) {


        console.log("-------- Aspect::afterFunctionAspect, start --------");

        console.log("    arguments passed:", ...args);

        console.log("-------- Aspect::afterFunctionAspect, end --------");
    }
}
module.exports = exports = Aspect;