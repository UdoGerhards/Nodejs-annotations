'use strict';

/**
 * Simple bean
 *
 * Created by udogerhards on 20.10.18.
 *
 * @Bean("TestAOPAfterBean")
 */
class Bean {

    constructor() {}

    afterFunction(param) {

        console.log("-------- TestAOPAfterBean::afterFunction, start --------");

        console.log("TestAOPAfterBean::afterFunction");

        console.log("    param: ", param);

        var transformed = !!param;

        console.log("-------- TestAOPAfterBean::afterFunction, end --------");
        return transformed;
    }

}
module.exports = exports = Bean;