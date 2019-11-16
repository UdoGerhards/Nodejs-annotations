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
        instance.initFlag = false;
    }

}
module.exports = exports = Child;