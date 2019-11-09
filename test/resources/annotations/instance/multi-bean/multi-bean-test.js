"use strict";

/**
 * @Configuration("Coreconfiguration")
 */
function MultiBean(){
    var instance = this;

    /*
     * @Bean("Bean11")
     */
    instance.level11 = function() {
        let instance = this;
        instance.level = 11;
    };

    /*
     * @Bean("Bean21")
     */
    instance.level21 = function() {
        let instance = this;
        instance.level = 21;

        /*
         * @Bean("Bean22")
         */
        instance.level22 = function() {
            let instance = this;
            instance.level = 22;
        };
    };

    /*
     * @Bean("Bean31")
     */
    instance.level31 = function() {
        let instance = this;

        instance.level = 31;

        /*
         * @Bean("Bean32")
         */
        instance.level32 = function() {

            let instance = this;

            instance.level = 32;

            /*
             * @Bean("Bean33")
             */
            instance.level33 = {
                instance: this,
                level:33
            };
        };
    };
};

module.exports = exports = MultiBean;