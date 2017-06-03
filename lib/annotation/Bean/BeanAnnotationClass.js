'use strict';

class Bean {

    constructor() {
        var instance = this;
    }

    static get TYPE() {return (Bean.TYPE_ANNOTATION_AWARE + Bean.TYPE_ANNOTATION_SUPPORT + Bean.TYPE_ANNOTATION_SOURCE)};

    static get TYPE_ANNOTATION_AWARE() {return 0x10};
    static get TYPE_ANNOTATION_SUPPORT() {return 0x20};
    static get TYPE_ANNOTATION_SOURCE() {return 0x100};
    static get TYPE_ANNOTATION_TARGET() {return 0x200};
    static get TYPE_CLASS_MEMBER_AWARE() {return 0x1000};
}

module.exports = exports = Bean;