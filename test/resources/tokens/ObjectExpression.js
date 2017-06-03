'use strict';

/*
 * @Component("ObjectWithInnerBeans")
 */
var object = {
    instance: this,

    /*
     * @Qualifier("ObjectProperty1")
     */
    property1: null,

    // @Qualifier("ObjectProperty2")
    property2: null,

    /*
     * @Component("ObjectInnerBeanLevel1")
     */
    innerBean: function() {
            var instance = this,

            /*
             * @Init()
             */
            init = function() {

                var instance = this;

            },

            /*
             * @Component("ObjectInnerBeanLevel2")
             */
            innerBean2 = function() {

                var instance = this;

                // @Qualifier("ObjectInnerBeanLevel2Property1")
                instance.ObjectInnerBeanLevel2Property1 = null;

                /*
                 * @Init()
                 */
                instance.init = function() {

                    var instance = this;

                }
            }
        }
    }

module.exports = exports = object;
