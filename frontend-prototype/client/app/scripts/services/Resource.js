(function () {
    'use strict';
    angular.module('frontendPrototypeApp')
        .service('Resource', [function () {
                
                var resources = {};
            
                /*
                 * TODO:
                 * - Allow aliases
                 * - Allow groups
                 */
            
                return {
                    set: function(object) {
                        resources[object.getId()] = object;
                    },
                    get: function(id) {
                        return resources[id];
                    },
                    unset: function(id) {
                        delete resources[id];
                    }
                }
            
            }])
}());