'use strict';

class Bean {

    constructor() {
        var instance = this;
    }

    static get TYPE() {return (global.TYPE_ANNOTATION_AWARE + global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE)};
}

module.exports = exports = Bean;