class Esprima_Base {

    constructor() {
        let instance = this;
        instance.annotationParser = null;
    }

    isValid(node) {

        return true;
    }


    getBeanContextAwareInformation(node, annotationInfo) {

        let instance = this;
        annotationInfo.descriptor.parser = instance.constructor.name;
        annotationInfo.descriptor.node = node;

        return annotationInfo;
    }

    getBeanSupport(node, annotationInfo) {
        return annotationInfo;
    }

    getBeanInformation(node, annotationInfo) {
        return annotationInfo;
    }



    parseEsprimaToken(node, annotationInfo) {
        let instance = this;

        let annotation = annotationInfo.annotation;
        if (!annotation) {
            try {
                // In case of sub bean
                annotation = annotationInfo.descriptor.annotation;
            } catch (e) {
                console.log(annotationInfo);
            }
        }

        let annotationParser = instance.annotationParser[annotation.name];
        if (annotationParser) {
            return annotationParser.parseEsprimaToken(node, annotationInfo);
        } else {
            return annotationInfo;
        }
    }
}

module.exports = exports = Esprima_Base;