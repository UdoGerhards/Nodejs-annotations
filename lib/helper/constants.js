'use strict';

module.exports = exports = function() {

    global.TYPE_ANNOTATION_APPLICATION_CONTEXT_AWARE = 0x1;    // Application context aware
    global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE = 0x2;           // Bean context aware
    global.TYPE_ANNOTATION_TARGET = 0x4;                       // Target aware
    global.TYPE_ANNOTATION_AWARE = 0x10;                       // Annotation can have subannotations added
    global.TYPE_ANNOTATION_SUPPORT = 0x20;                     // Annotation provides support for other annotations
};