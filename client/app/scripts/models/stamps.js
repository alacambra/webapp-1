(function () {
    'use strict';

    angular.module('poolingpeopleApp')
        .service('ModelStampsService', function() {
            var poolingpeopleObject = stampit().methods({
                getUUID: function(){
                    return this.uuid;
                }
            }).state({
                    uuid: ""
                });

            var scheduledObject = stampit().methods({
                getStartTimestamp: function() {
                    return this.startTime;
                },

                getEndTimestamp: function() {
                    return this.endTime;
                },

                getFormatedStartTime: function(){
                    return this.startTime;
                },

                getFormatedEndTime: function(){
                    return this.endTime;
                }
            }).state({
                    title: null,
                    description: null,
                    status: 'NEW',
                    priority: 'NORMAL',
                    duration: 0,
                    effort: 0,
                    progress: 0,
                    startTime : 0,
                    endTime : 0
                });
        });
}());