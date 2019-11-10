'use strict';

/**
 * Simple bean
 *
 * Created by udogerhards on 20.10.18.
 *
 * @Bean("TestBean")
 */
class Bean {

    constructor(){
        let instance = this;
        instance.initFlag = false;
    }

    /**
     * @Init()
     */
    init() {

        let instance = this;
        instance.initFlag = true;
    }

}
module.exports = exports = Bean;