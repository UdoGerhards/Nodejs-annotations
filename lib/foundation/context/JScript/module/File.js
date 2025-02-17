'use strict';

class File {

    static types = {
        MODULE: 'module',
        PROGRAM: 'program',
        SCRIPT: 'script'
    }

    constructor(fileObject) {
        let instance = this;

        instance.path = null;
        instance.data = null;
        instance.type = null;

        if (fileObject) {
            instance.path = fileObject.getPath();
            instance.data = fileObject.getData();
            instance.type = fileObject.getType();
        }

    }

    setPath(path) {
        let instance = this;
        instance.path = path;
    }

    getPath() {
        let instance = this;
        return instance.path;
    }

    setData(data) {
        let instance = this;
        instance.data = data;
    }

    getData() {
        let instance = this;
        return instance.data;
    }

    setType(type) {

        let instance = this;

        let tpe = null;

        for (let name in File.types) {
            let val = File.types[name];
            if (type == val) {
                tpe = val;
                break;
            }
        }
        instance.type = tpe;
    }

    getType() {
        let instance = this;
        return instance.type;
    }
};

export default File;