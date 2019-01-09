'use strict';

/**
 * @Bean("NestedBean")
 *
 * @constructor
 */
var ObjectBean =  {

    /*
     * @Qualifier("Test")
     */
    testValue: null,

    /*
     * @Init()
     */
    init: function(){}
};

module.exports = exports = ObjectBean;