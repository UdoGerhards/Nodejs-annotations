'use strict';

/**
 * Simple bean
 *
 * Created by udogerhards on 20.10.18.
 *
 * @Prototype("Parent")
 * @Inherits("GrantParent")
 *
 */
class Parent {

    constructor(){
        let instance = this;

        /*
         * @Qualifier("Component")
         */
        instance.component = false;
    }

}
module.exports = exports = Parent;