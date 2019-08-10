'use strict';

/**
 * @Bean()
 */
function BeanA() {
    var instance = this;

    instance.service = null;

    instance.component = null;

    instance.initFlag = null;
}

/**
 * @Init()
 */
BeanA.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = BeanA;