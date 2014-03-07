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
                getStartDate: function() {
                    return this.startDate;
                },

                getEndDate: function() {
                    return this.endDate ===  -99999999999999 ? null : this.endDate;
                },

                getFormatedStartDate: function(){
                    return Date(this.startDate);
                },

                getFormatedEndDate: function(){
                    return this.endDate ===  -99999999999999 ? null : Date(this.endDate);
                },

                getShortTitle: function(){
                    if(this.title.length > 100){
                        return this.title.substring(0, 100) + "..."
                    }

                    return this.title
                },

                getShortDescription: function(){
                    var size = 50;
                    if(this.description.length > size){
                        return this.description.substring(0, size) + "..."
                    }

                    return this.title
                },

                getAssignee: function(){
                    return this.assignee;
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
                    endDate : 0,
                    assignee: null
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


            var user = stampit.compose(poolingpeopleObject).state({
                firstName: null,
                lastName: null,
                birthday: null,
                email: null
            }).methods({
                    getPrettyName: function () {

                        var name = "";

                        if ( this.lastName != null ){
                            name = this.lastName + ", ";
                        }

                        if ( this.firstName != null ){
                            name += this.firstName;
                        }

                        return name;
                    }
                });

            return {
                task: task,
                project: null,
                user: user,
                effort: null
            }
        });
}());