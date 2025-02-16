"use strict";

/**
 * @Configuration("ModuleBeans")
 */
function NodeCMSFoundationDependency() {

    var instance = this;

    /**
     * @Component("InnerBeanLevel1")
     */
    instance.innerBeanLevel1 = function InnerBeanLevel1() {

        var instance = this;

        /*
         * @Qualifier("Property1InnerBeanLevel1"
         */
        instance.Property1InnerBeanLevel1 = null;

        /*
         * @Qualifier("Property2InnerBeanLevel1"
         */
        instance.Property1InnerBeanLevel1 = null;

        /*
         * @Qualifier("Property3InnerBeanLevel1"
         */
        instance.Property1InnerBeanLevel1 = null;

        /*
         * @Qualifier("Property4InnerBeanLevel1"
         */
        instance.Property1InnerBeanLevel1 = null;

        /**
         * @Component("InnerBeanLevel2")
         */
        instance.innerBeanLevel2 = function InnerBeanLevel2() {
            var instance = this;

            /*
             * @Qualifier("Property1InnerBeanLevel2"
             */
            instance.Property1InnerBeanLevel2 = null;

            /*
             * @Qualifier("Property2InnerBeanLevel2"
             */
            instance.Property1InnerBeanLevel2 = null;

            /*
             * @Qualifier("Property3InnerBeanLevel2"
             */
            instance.Property1InnerBeanLevel2 = null;

            /*
             * @Qualifier("Property4InnerBeanLevel2"
             */
            instance.Property1InnerBeanLevel2 = null;

            /**
             * @Component("InnerBeanLevel3")
             */
            instance.innerBeanLevel3 = function InnerBeanLevel3() {
                var instance = this;

                /*
                 * @Qualifier("Property1InnerBeanLevel3"
                 */
                instance.Property1InnerBeanLevel3 = null;

                /*
                 * @Qualifier("Property2InnerBeanLevel3"
                 */
                instance.Property1InnerBeanLevel3 = null;

                /*
                 * @Qualifier("Property3InnerBeanLevel3"
                 */
                instance.Property1InnerBeanLevel3 = null;

                /*
                 * @Qualifier("FinishingLevel3")
                 */
                instance.Property1InnerBeanLevel3 = null;
            }

            /*
             * @Qualifier("FinishingLevel2")
             */
            instance.finishingLevel2 = null;
        }

        /*
         * @Qualifier("FinishingLevel1")
         */
        instance.finishingLevel1 = null;
    }

    /*
     * @Bean("NodeCMSFoundationPackageInfo")
     */
    instance.packageInfo = function() {
        return require("../../package.json");
    }

    /*
     * @Bean("Schema-generator")
     */
    instance.schemaGenerator = function() {
        return require("generate-schema");
    };

    /*
     * @Bean("Mongoose-generator")
     */
    instance.mongooseGenerator = function() {
        return require("../helper/json-schema.js");
    };

    /*
     * @Bean("NodeCMSFoundationConfiguration")
     */
    instance.extensionConfiguration = function() {
        return require("../../configuration/extension.json");
    };

    /*
     * @Bean("Ajv")
     */
    instance.ajv = function() {
        var Ajv = require("ajv");
        var ajv = new Ajv();

        // Adding extra keywords
        require('ajv-keywords')(ajv);

        // Adding extra
        require('ajv-merge-patch')(ajv);

        return ajv;
    }

    /*
     * @Prototype("EventEmitter")
     */
    instance.eventEmitter = function() {
        return require('events');
    }

    /*
     * @Bean("Glob")
     */
    instance.glob = function() {
        return require("glob");
    }

    /*
     * @Bean("Faker")
     */
    instance.faker = function() {
        return require("faker");
    }

    /*
     * @Bean("DummyJson")
     */
    instance.dummyJson = function() {
        return require('dummy-json')
    }

    /*
     * @Bean("Moment")
     */
    instance.moment = function() {
        return require("moment")
    }

    /*
     * @Bean("SubBeanlevel1")
     */
    instance.subBeanLevel1 = function(){
        var instance = this;

        /*
         * @Bean("SubBeanlevel2_0")
         */
        instance.subBeanLevel20 = function(){
            var instance = this;

            /*
             * @Bean("SubBeanlevel3_0")
             */
            instance.subBeanLevel30 = function(){
                var instance = this;
                /*
                 * @Bean("SubBeanlevel4_0")
                 */
                instance.subBeanLevel40 = function(){

                }
            }

            /*
             * @Bean("SubBeanlevel3_1")
             */
            instance.subBeanLevel31 = function(){
                var instance = this;
                /*
                 * @Bean("SubBeanlevel41")
                 */
                instance.subBeanLevel41 = function(){
                    var instance = this;
                }
            }
        }
    }
}

module.exports = exports = NodeCMSFoundationDependency;