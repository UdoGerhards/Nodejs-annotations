'use strict';

/**
 * @Bean("OtherBean")
 * @Autowire()
 * @constructor
 */
function OtherBean() {
    var instance = this;

    instance.bean = null;

    instance.initFlag = null;
}



/**
 * @Init()
 */
OtherBean.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = OtherBean;