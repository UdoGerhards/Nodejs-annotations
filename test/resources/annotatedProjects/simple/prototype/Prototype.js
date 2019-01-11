'use strict';

/**
 * @Bean("PrototypeFunction")
 *
 * @Namespace()
 * @Inherits()
 *
 * @constructor
 */
var FunctionBean = function() {

    let instance = this;

    /*
     * @Qualifier("Controller")
     */
    instance.controller = null;

    /*
     * @Qualifier("ServiceBean")
     */
    instance.service = null;

    /*
     * @Qualifier("ComponentBean")
     */
    instance.component = null;

    /*
     * @Bean("InnerBean1")
     */
    instance.innerBean1 = function() {

            var instance = this;

            /*
             * @Bean("InnerBean2")
             */
            instance.innerBean2 = function() {

                    var instance = this;

                    /*
                     * @Bean("InnerBean3")
                     */
                    instance.innerBean3 = function() {

                            var instance = this;

                            /*
                             * @Bean("InnerBean4")
                             */
                            instance.innerBean4  = function() {
                                let instance = this;

                                /*
                                 * @Qualifier("initFlag3")
                                 */
                                instance.initFlag3 = null;

                                /*
                                 * @Init()
                                 */
                                instance.init4 = function() {
                                    var instance = this;
                                    instance.initFlag3 = true;
                                }
                            };

                            /*
                             * @Qualifier("initFlag3")
                             */
                            instance.initFlag3 = null;
                        };

                        /*
                         * @Init()
                         */
                        instance.init3 = function() {
                            var instance = this;
                            instance.initFlag3 = true;
                        }
                    };

                    /*
                     * @Qualifier("initFlag2")
                     */
                    instance.initFlag2 = null;
                };

                /*
                 * @Init()
                 */
                instance.init2 = function(){
                    var instance = this;
                    instance.initFlag2 = true;
                }

        /*
         * @Qualifier("initFlag2")
         */
        instance.initFlag = null;

        /*
         * @Init()
         */
        instance.init = function() {
            var instance = this;
            instance.initFlag = true;
        }
};

module.exports = exports = FunctionBean;