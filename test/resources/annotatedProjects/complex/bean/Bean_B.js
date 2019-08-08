'use strict';

/**
 * @Bean("Bean_B")
 * @constructor
 */
function Bean() {
    var instance = this;

    instance.initFlag = null;

    /**
     * @Qualifier("Service_B")
     */
    instance.service = null;
}


Bean.prototype.afterFunction = function(param) {

    console.log("-------- TestAOPAfterBean::afterFunction, start --------");

    console.log("TestAOPAfterBean::afterFunction");

    console.log("    param: ", param);

    var transformed = !!param;

    console.log("-------- TestAOPAfterBean::afterFunction, end --------");
    return transformed;
};


/**
 * @Init()
 */
Bean.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = Bean;