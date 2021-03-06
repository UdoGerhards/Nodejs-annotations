'use strict';

/**
 * Simple bean
 *
 * Created by udogerhards on 20.10.18.
 *
 * @Bean("TestAOPBeforeBean")
 */
class Bean {

    constructor() {}

    beforeFunction(param) {

        console.log("-------- TestAOPAfterBean::beforeFunction, start --------");

        console.log("TestAOPAfterBean::afterFunction");

        console.log("    param: ", param);

        var transformed = !!param;

        console.log("-------- TestAOPAfterBean::beforeFunction, end --------");
        return transformed;

    }

}
module.exports = exports = Bean;