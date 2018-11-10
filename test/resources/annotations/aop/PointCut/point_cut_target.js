'use strict';

/**
 * Created by udogerhards on 10.11.18.
 * @Controller("PointCutTarget")
 */
class PointCutTargetClass {

    constructor() {
        var instance = this;

        instance.property1 = "Test1";

        instance.property2 = "Test2"
    }

    testFunction1() {
        var instance = this;

        console.log("Test function 1");

    }

    testFunction2() {
        var instance = this;

        console.log("Test function 1");

    }

}

module.exports = exports = PointCutTargetClass;