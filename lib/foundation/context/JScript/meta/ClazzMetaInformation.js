"use strict";

/**
 * ClassMetaInformation
 *
 * Dataobject to hold the parsed meta information of a javascript clazz
 *
 * (c) 2021 - Udo Gerhards, Udo.Gerhards@gerhards.eus
 */

class ClassMetaInformation {

    constructor() {

        let instance = this;

        /**
         * Information from the file system
         */
        instance.filePath = null;

        /**
         * The main information of the clazz like name and type
         */
        instance.information = {};

        /**
         * Properties of the clazz
         */
        instance.properties = {};

        /**
         * Members of the clazz
         */
        instance.members = {};

        /**
         * Additional annotation
         * Used to holde additonal annotation which has not one of the above meanings
         */
        instance.additional = [];
    }

    setFilePath(filePath) {
        let instance = this;
        instance.filePath = filePath;
    }

    getFilePath() {
        let instance = this;
        return instance.filePath;
    }

    setInformation(type) {
        let instance = this;
        instance.information[type.constructor.name] = type;
    }

    getInformation() {
        let instance = this;
        return instance.information;
    }

    setProperty(annotation) {
        let instance = this;
        let member = annotation.getMember();

        instance.properties[member] = annotation;
    }

    getProperty(member) {
        let instance = this;
        return intance.properties[member] || null;
    }

    getAllPropperties() {
        let instance = this;
        return instance.properties;
    }

    setMember(annotation) {
        let instance = this;
        let member = annotation.getMember();

        instance.members[member] = annotation;
    }

    getMember(member) {
        let instance = this;
        return intance.members[member] || null;
    }

    getAllMembers() {
        let instance = this;
        return instance.members;
    }

    setAdditional(additional) {
        let instance = this;
        instance.additional.push(additional);
    }

    getAdditional() {
        let instance = this;
        return instance.additional;
    }

    findAdditional(clazz) {
        let instance = this;
        let found = null;
        instance.additional.every(function (additional) {
            if (additional.isPrototypeOf(clazz)) {
                found = additional;
                return false;
            };

            return found;
        });
    }
}

module.exports = exports = ClassMetaInformation;