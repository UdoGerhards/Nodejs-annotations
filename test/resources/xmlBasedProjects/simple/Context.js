'use strict';

class Application {

    constructor() {

        var instance = this;

        instance.bean = null;

        instance.controller = null;

        instance.service = null;

        instance.component = null;

        instance.initFlag = null;

        instance.runFlag = null;

        instance.counter = 0;
    }

    init() {
        var instance = this;
        instance.initFlag = ++instance.counter;
    };

    run() {

        var instance = this;
        instance.runFlag = ++instance.counter;;

    }
}

module.exports = exports = Application;
