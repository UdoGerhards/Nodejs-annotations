class Esprima_Base {

    constructor() {
        let instance = this;
        instance.annotationParser = null;
    }

    parseEsprimaToken(node, annotationInfo) {
        let instance = this;

        let annotation = annotationInfo.annotation;
        if (!annotation) {
            try {
                // In case of sub bean
                annotation = annotationInfo.descriptor.annotation;
            } catch (e) {
                console.error(annotationInfo);
                throw e;
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

export default Esprima_Base;