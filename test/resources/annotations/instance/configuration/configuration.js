'use strict';

/**
 * Created by udogerhards on 08.12.18.
 *
 * @Configuration("TestConfiguration")
 */

class Configuration {

    constructor() {
        var instance = this;

        /*
         * @Bean("ConfigItemA")
         *
         * function
         */
        instance.citema = function() {
            return require("./package.json");
        };

        /**
         * @Bean("ConfigItemB")
         *
         * Object approach item
         */
        instance.citemb = {
            name: "Configuration Item B",
            printName: function() {
                console.log(this.name);
            },

            printType: function() {
                console.log(typeof this);
            }
        };


        /*
         * @Bean("ConfigItemC")
         *
         * Protoype approach item
         */
        instance.citemc = function() {

            var ConfigItemC = function() {
                var instance = this;

                instance.name = "Configuration Item C"

            };

            ConfigItemC.prototype.printName = function() {
                var instance = this;
                console.log(this.name);
            };

            ConfigItemC.prototype.printType = function() {
                var instance = this;
                console.log(typeof instance);
            };

            return new ConfigItemC();
        };

        /**
         * @Bean("ConfigItemD")
         */
        instance.citemd = function() {

            var name = "Configuration Item D";

            return function() {
                console.log(name);
            }
        }
    }
}

module.exports = exports = Configuration;