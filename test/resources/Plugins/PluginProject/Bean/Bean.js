'use strict';

/**
 * @Bean()
 * @Inherits("Prototype")
 */
function Bean() {
    var instance = this;

    /*
     * @Qualifier("Controller")
     */
    instance.controller= null;

    /*
     * @Qualifier("ServiceBean")
     */
    instance.service = null;

    /*
     * @Qualifier("ComponentBean")
     */
    instance.component = null;

    /**
     * @Component("InnerBeanLevel1")
     */
    instance.innerBeanLevel1 = function InnerBeanLevel1() {

        var instance = this;

        /*
         * @Qualifier("InnerBeanLevel3"
         */
        instance.innerBeanLevel3 = null;

        /**
         * @Component("InnerBeanLevel2")
         */
        instance.innerBeanLevel2 = function InnerBeanLevel2() {
            var instance = this;

            /*
             * @Qualifier("InnerBeanLevel1"
             */
            instance.innerBeanLevel1 = null;

            /**
             * @Component("InnerBeanLevel3")
             */
            instance.innerBeanLevel3 = function InnerBeanLevel3() {
                var instance = this;

                /*
                 * @Qualifier("InnerBeanLevel2")
                 */
                instance.innerBeanLevel2 = null;

                /*
                 * @Qualifier("InnerBeanLevel3")
                 */
                instance.innerBeanLevel3 = null;

            }

            /*
             * @Qualifier("InnerBeanLevel2")
             */
            instance.innerBeanLevel2 = null;
        }
    }

    instance.initFlag = null;
}

/**
 * @Init()
 */
Bean.prototype.init = function() {
    var instance = this;
    instance.initFlag = true;
}

module.exports = exports = Bean;