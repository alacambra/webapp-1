(function () {
    'use strict';

    angular.module('poolingpeopleApp')
        .service('ModelStampsService', function() {
            var poolingpeopleObject = stampit().methods({
                getUUID: function(){
                    return this.id;
                }
            }).state({
                    id : ""
                });

            var scheduledObject = stampit().methods({
                getStartTimestamp: function() {
                    return this.startDate;
                },

                getEndTimestamp: function() {
                    return this.endDate ===  -99999999999999 ? null : this.endDate;
                },

                getFormatedStartTime: function(){
                    return this.startDate;
                },

                getFormatedEndTime: function(){
                    return this.endDate ===  -99999999999999 ? null : Date(this.endDate);
                }

            }).state({
                    title: null,
                    description: null,
                    status: 'NEW',
                    priority: 'NORMAL',
                    duration: 0,
                    effort: 0,
                    progress: 0,
                    startDate : 0,
                    endDate : 0
                });

            var task = stampit.compose(poolingpeopleObject, scheduledObject).state({

                project: null,
                assignee: null

            }).methods({
                    setProject: function (project) {
                        this.project = {
                            id: project.id,
                            name: project.title
                        };
                    }
                }).enclose(function () {
                    var _efforts = [];

                    this.getEfforts = function () {
                        return _efforts;
                    };

                    this.setEfforts = function (efforts) {
                        _efforts = efforts;
                    };

                });
            return {
                task: task,
                project: null,
                user: null,
                effort: null
            }
        });
}());