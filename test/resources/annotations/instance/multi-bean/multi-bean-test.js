"use strict";

/**
 * @Configuration("Coreconfiguration")
 */
function MultiBean() {
    var instance = this;

    /*
     * @Bean("Logger")
     */
    instance.level11 = function() {
        return logger;
    };

    instance.level21 = function() {
        let instance = this;

        instance.level22 = function() {

        }
    };

    instance.level31 = function() {
        let instance = this;

        instance.level32 = function() {

            let instance = this;

            instance.level33 = {

                let instance = this;

                instance.property34 = "Propberty34";
            }
        }
    }
}

module.exports = exports = MultiBean;