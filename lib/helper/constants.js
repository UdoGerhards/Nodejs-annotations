'use strict';

module.exports = exports = function() {

    // Annotation types
    global.TYPE_ANNOTATION_APPLICATION_CONTEXT_AWARE = 0x1;    // Application context aware
    global.TYPE_ANNOTATION_BEAN_CONTEXT_AWARE = 0x2;           // Bean context aware
    global.TYPE_ANNOTATION_TARGET = 0x4;                       // Target aware
    global.TYPE_ANNOTATION_AWARE = 0x10;                       // Annotation can have subannotations added
    global.TYPE_ANNOTATION_SUPPORT = 0x20;                     // Annotation provides support for other annotations


    // Application build stages
    global.phase = {
        _BUILD_STRUCTURE_: 0x1,
        _BUILD_CONTEXT_: 0x2,
        _BUILD_FINISHED_: 0x4,
        _BUILD_PLUGIN_FINISHED: 0x8,
        _FINAL_PLUGIN_CONTEXT_: 0xFE,
        _FINAL_APPLICATION_CONTEXT_: 0xFF
    };

}();