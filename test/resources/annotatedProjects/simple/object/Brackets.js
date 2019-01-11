'use strict';

/**
 * @Bean("Brackets")
 * @Namespace()
 * @Inherits()
 */
var brackets =  {

    /*
     * @Bean("InnerBean")
     */
    innerBean: function() {

        let instance = this;

        /*
         * @Qualifier("InnerBeanProperty")
         */
        instance.innerBeanProperty = null;

    },

    /*
     * @Qualifier("InstanceProperty")
     */
    instanceProperty: null,

    /*
     * @Init()
     */
    init: function() {}

};

module.exports = exports = brackets;
