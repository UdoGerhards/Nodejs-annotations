'use strict';


/*
 * @Component("ClassWithInnerBeans")
 */
class ClassParser {
    constructor() {
        var instance = this;

        // @Component("ClassInnerBeanLevel1")
        instance.classInnerBeanLevel1 = class {
            constructor() {
                var instance = this;

                // @Qualifier("ClassInnerBeanLevel1Property1")
                instance.ClassInnerBeanLevel1Property1 = null;

                // @Qualifier("ClassInnerBeanLevel1Property2")
                instance.ClassInnerBeanLevel1Property2 = null;

                // @Component("ClassInnerBeanLevel2")
                instance.classInnerBeanLevel1 = class {
                    constructor() {
                        var instance = this;

                        // @Qualifier("ClassInnerBeanLevel2Property")
                        instance.ClassInnerBeanLevel1Property1 = null;

                        // @Qualifier("ClassInnerBeanLevel2Property2")
                        instance.ClassInnerBeanLevel1Property2 = null;
                    }

                };

                /*
                 *  @Component("ClassInnerBeanLevel1FunctionConstructor")
                 */
                instance.classInnerBeanLevel1FunctionConstructor = function() {
                    var instance = this;

                    //@Qualifier("classInnerBeanLevel1FunctionConstructorProperty1")
                    instance.classInnerBeanLevel1FunctionConstructorProperty1 = null;

                    //@Qualifier("classInnerBeanLevel1FunctionConstructorProperty2")
                    instance.classInnerBeanLevel1FunctionConstructorProperty2 = null;
                };

                /*
                 *  @Component("ClassInnerBeanLevel1ObjectConstructor")
                 */
                instance.classInnerBeanLevel1ObjectConstructor = function() {
                    var instance = this;

                    //@Qualifier("classInnerBeanLevel1ObjectConstructorProperty1")
                    instance.classInnerBeanLevel1ObjectConstructorProperty1 = null;

                    //@Qualifier("classInnerBeanLevel1ObjectConstructorProperty2")
                    instance.classInnerBeanLevel1ObjectConstructorProperty2 = null;

                    /*
                     *  @Component("ClassInnerBeanLevel2FunctionConstructor")
                     */
                    instance.classInnerBeanLevel2FunctionConstructor = function() {
                        var instance = this;

                        //@Qualifier("classInnerBeanLevel2FunctionConstructorProperty1")
                        instance.classInnerBeanLevel2FunctionConstructorProperty1 = null;

                        //@Qualifier("classInnerBeanLevel2FunctionConstructorProperty2")
                        instance.classInnerBeanLevel2FunctionConstructorProperty2 = null;

                        // @Component("ClassInnerBeanLevel3")
                        instance.classInnerBeanLevel1 = class {
                            constructor() {
                                var instance = this;

                                // @Qualifier("ClassInnerBeanLevel3Property")
                                instance.ClassInnerBeanLevel1Property1 = null;

                                // @Qualifier("ClassInnerBeanLevel3Property2")
                                instance.ClassInnerBeanLevel1Property2 = null;
                            }

                        };
                    };
                };

            }

        }
    }

    get TestMethod() {
        var instance = this;
    }
}

module.exports = exports = ClassParser;