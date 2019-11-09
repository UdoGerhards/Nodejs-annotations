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

        let logger = "This is the logger";
    };

    /*
     * @Bean("Bean21")
     */
    instance.level21 = function() {
        let instance = this;

        /*
         * @Bean("Bean22")
         */
        instance.level22 = function() {

        };
    };


    /*
     * @Bean("Bean31")
     */
    instance.level31 = function() {
        let instance = this;

        /*
         * @Bean("Bean32")
         */
        instance.level32 = function() {

            let instance = this;

            /*
             * @Bean("Bean33")
             */
            instance.level33 = {
                instance: this,
                property34: "Propberty34"
            };
        };
    };
};

module.exports = exports = MultiBean;