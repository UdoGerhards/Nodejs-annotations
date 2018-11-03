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

        console.log("TestAOPBeforeBean::beforeFunction")
        console.log(param);

        var transformed = !!param;

        return transformed;

    }

}
module.exports = exports = Bean;