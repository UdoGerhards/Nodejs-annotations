'use strict';

/**
 * Simple bean
 *
 * Created by udogerhards on 20.10.18.
 *
 * @Prototype("GrantParent")
 */
class Grandparent {

    constructor(){
        let instance = this;
        instance.initFlag = false;
    }

}
module.exports = exports = Grandparent;