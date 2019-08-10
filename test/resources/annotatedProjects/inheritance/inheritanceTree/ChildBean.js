'use strict';

/**
 * @Bean("Inheritor")
 * @Inherits("Parent")
 *
 * @constructor
 */
class Child {

    constructor() {

        let instance = this;

        /*
         * @Qualifier("childProperty1")
         */
        instance.childProperty1 = null;

        /*
         * @Qualifier("childProperty2")
         */
        instance.childProperty2 = null;

        /*
         * @Qualifier("childProperty3")
         */
        instance.childProperty3 = null;

        /*
         * @Qualifier("childProperty4")
         */
        instance.childProperty4 = null;

        /*
         * @Qualifier("childProperty5")
         */
        instance.childProperty5 = null;

        /*
         * @Qualifier("parentPropertyOverwritten1")
         */
        instance.parentPropertyOverwritten1 = null;

        /*
         * @Qualifier("parentPropertyOverwritten2")
         */
        instance.parentPropertyOverwritten2 = null;

        /*
         * @Qualifier("parentPropertyOverwritten3")
         */
        instance.parentPropertyOverwritten3 = null;
    }

    /**
     * @Init()
     */
    init() {

        super.init();
        console.log("Inheritor initilized!");
    }

};

module.exports = exports = Child;