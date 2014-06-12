(function () {
    'use strict';
    angular.module('frontendPrototypeApp', [
        'ngAnimate'
    ]).constant("typeNames", {
        ELEMENT: "Element",
        CONTEXT: "Context",
        BCE: "Bce",
        TASK: "Task",
        DATA: "Data",
        POOL: "Pool",
        PEOPLE: "People",
        COMPETENCE: "Competence",
        COMMUNICATION: "Communication",
        EVENT: "Event"
    }).run(function () {

        String.prototype.capitalize = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };

        _.mixin({
            typeOf: function (obj) {
                if (obj === null) {
                    return "null";
                }
                var t = typeof obj;
                switch (t) {
                    case "function":
                    case "object":
                        if (obj.constructor) {
                            if (obj.typeName) {
                                return obj.typeName;
                            } else if (obj.constructor.name) {
                                return obj.constructor.name;
                            } else {
                                var match = obj.constructor.toString().match(/^function (.+)\(.*$/);
                                if (match) {
                                    return match[1];
                                }
                            }
                        }
                        return Object.prototype.toString.call(obj).match(/^\[object (.+)\]$/)[1];
                    default:
                        return t.capitalize();
                }
            }
        });
    })
}());