'use strict';

/**
 * Created by udogerhards on 04.11.18.
 *
 * @Aspect()
 * @PointCut("beforeFunction")
 */
class Aspect {

    constructor() {};

    /**
     * @Before()
     */
    beforeFunction(param) {
        console.log("Before function");
        return param;
    }
}
module.exports = exports = Aspect;