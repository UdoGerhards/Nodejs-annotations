'use strict';

/**
 * Simple bean
 *
 * Created by udogerhards on 20.10.18.
 *
 * @Bean("Child")
 * @Inherits("Parent")
 */
class Child {

    constructor(){
        let instance = this;

        /*
         * @Qualifier("Bean")
         */
        instance.bean = null;
    }

}
module.exports = exports = Child;