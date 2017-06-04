'use strict';

module.exports = exports = function() {

    // Annotation types
    global.TYPE_ANNOTATION_APPLICATION_CONTEXT_AWARE = 0x1;    // Application context aware
    global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE = 0x2;           // Bean context aware
    global.TYPE_ANNOTATION_TARGET = 0x4;                       // Target aware
    global.TYPE_ANNOTATION_AWARE = 0x10;                       // Annotation can have subannotations added
    global.TYPE_ANNOTATION_SUPPORT = 0x20;                     // Annotation provides support for other annotations


    // Parsing stages
    global._BUILD_STRUCTURE_ = 0x1;                            // The very first state
    global._STAGE_ = 0x2;
    global._INHERIT_ = 0x4;
    global._INSTANTIATE_ = 0x8;
    global._INJECT_ = 0x10;
    global._FINISH_SETUP_ = 0x20;
};