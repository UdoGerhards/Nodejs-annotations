'use strict';

/**
 * @Bean()
 */
function BeanB() {
    var instance = this;

    instance.bean = null;

    instance.initFlag = null;
}


/**
 * @Init()
 */
BeanB.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = BeanB;