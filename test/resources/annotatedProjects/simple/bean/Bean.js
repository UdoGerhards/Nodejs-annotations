'use strict';

/**
 * @Bean("Bean")
 *
 * @Namespace()
 * @Inherits()
 *
 * @constructor
 */
class Bean {

    constructor() {

        var instance = this;

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
        instance.innerBean1 = class {

            constructor() {

                var instance = this;

                /*
                 * @Bean("InnerBean2")
                 */
                instance.innerBean2 = class {

                    constructor() {

                        var instance = this;

                        /*
                         * @Bean("InnerBean3")
                         */
                        instance.innerBean3 = class {

                                constructor() {

                                    var instance = this;

                                    /*
                                     * @Bean("InnerBean4")
                                     */
                                    instance.innerBean4  = function() {};

                                    /*
                                     * @Qualifier("initFlag3")
                                     */
                                    instance.initFlag3 = null;
                                }

                                /*
                                 * @Init()
                                 */
                                init3() {
                                    var instance = this;
                                    instance.initFlag3 = true;
                                }
                            };

                        /*
                         * @Qualifier("initFlag2")
                         */
                        instance.initFlag2 = null;
                    }

                    /*
                     * @Init()
                     */
                    init2() {
                        var instance = this;
                        instance.initFlag2 = true;
                    }
                };

                /*
                 * @Qualifier("initFlag2")
                 */
                instance.initFlag = null;
            }

            /*
             * @Init()
             */
            init() {
                var instance = this;
                instance.initFlag = true;
            }
        };

        instance.initFlag = null;
    }


    /**
     * @Init()
     */
    init() {
        var instance = this;
        instance.initFlag = true;
    }
}

module.exports = exports = Bean;