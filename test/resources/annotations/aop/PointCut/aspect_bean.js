'use strict';

/**
 * @Aspect("TestAspect")
 * @PointCut("test*Function*")
 * @PointCut("testFunction*")
 * @PointCut("*test*")
 */

class TestAspectBean {

    constructor() {

        var instance = this;

    }
}

module.exports = exports = TestAspectBean;
