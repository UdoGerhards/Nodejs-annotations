'use strict';


/**
 * @Context("Application")
 * @Namespace()
 */
class Application {

    constructor() {

        var instance = this;

        /*
         * @Qualifier("Bean")
         *
         * @type{object}
         */
        instance.bean = null;

        /*
         * @Qualifier("Controller")
         * @type{object}
         */
        instance.controller = null;

        /*
         * @Qualifier("ServiceBean")
         */
        instance.service = null;

        /*
         * @Qualifier("ComponentBean")
         */
        instance.component = null;

        instance.initFlag = null;

        instance.runFlag = null;

        instance.counter = 0;
    }

    /**
     *  @Init()
     */
    init() {
        var instance = this;

        instance.initFlag = ++instance.counter;
    };

    /**
     * @Run()
     */
    run() {

        var instance = this;
        instance.runFlag = ++instance.counter;;

    }
}

module.exports = exports = Application;
