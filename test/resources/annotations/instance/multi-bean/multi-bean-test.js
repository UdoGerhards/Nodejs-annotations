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

        instance.printName = function() {
            console.log("Bean11");
        };
    };

    /*
     * @Bean("Bean21")
     */
    instance.level21 = function() {
        let instance = this;
        instance.level = 21;

        instance.printName = function() {
            console.log("Bean21");
        };

        /*
         * @Bean("Bean22")
         */
        instance.level22 = function() {
            let instance = this;
            instance.level = 22;

            instance.printName = function() {
                console.log("Bean22");
            };
        };
    };

    /*
     * @Bean("Bean31")
     */
    instance.level31 = function() {
        let instance = this;

        instance.level = 31;

        instance.printName = function() {
            console.log("Bean31");
        };

        /*
         * @Bean("Bean32")
         */
        instance.level32 = function() {

            let instance = this;

            instance.level = 32;

            instance.printName = function() {
                console.log("Bean32");
            };

            /*
             * @Bean("Bean33")
             */
            instance.level33 = {
                instance: this,
                level:33,
                printName: function() {
                    console.log("Bean33");
                }
            };
        };
    };
};

module.exports = exports = MultiBean;