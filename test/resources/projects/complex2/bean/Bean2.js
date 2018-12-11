'use strict';

/**
 * @Bean("Bean2")
 * @constructor
 */
function Bean2() {
    var instance = this;

    instance.initFlag = null;
}


Bean2.prototype.afterFunction = function(param) {

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
Bean2.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
    console.log("Initialization ...");
};

module.exports = exports = Bean2;