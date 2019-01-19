'use strict';

/**
 * @Bean("Brackets")
 * @Namespace()
 * @Inherits()
 */
var brackets =  {

    /*
     * @Bean("BracketsInnerBean")
     */
    innerBean: function() {

        let instance = this;

        /*
         * @Qualifier("InnerBeanProperty")
         */
        instance.innerBeanProperty = null,

        /*
         * @Bean("InnerBeanInnerBean")
         */
        instance.innerBeanInnerBean = class {

            constructor() {

                let instance = this;

                /*
                 * @Qualifier("InnerBeanInnerBeanProperty)
                 */
                instance.innerBeanInnerBeanProperty = null;


            }

            /*
             * @Init()
             */
            init() {


            }

        },

        /*
         * @Init()
         */
        instance.init = function() {

        }

    },

    /*
     * @Qualifier("InstanceProperty")
     */
    instanceProperty: null,

    /*
     * @Init()
     */
    init: function() {},


    test: null

};

module.exports = exports = brackets;
