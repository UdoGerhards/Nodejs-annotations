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

        console.log("==> Context init: "+instance.initFlag);
    };

    run() {

        var instance = this;
        instance.runFlag = ++instance.counter;

        console.log("==> Context run: "+instance.initFlag);

    }
}

module.exports = exports = Application;
