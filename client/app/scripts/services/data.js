(function () {
    'use strict';

    angular.module('poolingpeopleApp')

        .service('DataProvider', function(API) {

            var DataSources = {API:API}

            var getDataSource = function(key) {
                return DataSources["API"];
            }

            var API = {
                
                getUser: function(id) {
                    var key = this.name + "/" + id;
                    return getDataSource(key).getUser(id);
                },

                getUsers: function() {
                    return DataSources[getDataSource()].getUsers(id);
                },

                createUser: function(data) {
                    return DataSources[getDataSource()].createUser(data);
                },

                updateUser: function(data) {
                    return DataSources[getDataSource()].updateUser(data);
                },

                deleteUser: function(id) {
                    return DataSources[getDataSource()].deleteUser(id);
                },

                /* END CRUD */

                /* Task */


                /* CRUD */

                getTask: function(id) {
                    return DataSources[getDataSource()].getTasks(id);
                },

                createTask: function(data) {
                    return DataSources[getDataSource()].createTask(id);
                },

                updateTask: function(data) {
                    return DataSources[getDataSource()].updateTask(data);
                },

                deleteTask: function(id) {
                    return DataSources[getDataSource()].deleteTask(id);
                },

                /* END CRUD */

                getProjectFromTask: function(id) {
                    return DataSources[getDataSource()].getProjectFromTask(id);
                },

                addUserToTask: function(idTask, idUser) {
                    return DataSources[getDataSource()].addUserToTask(idTask, idUser);
                },

                getUsersFromTask: function(idTask) {
                    return DataSources[getDataSource()].getUsersFromTask(id);
                },

                deleteUserFromTask: function(idTask, idUser) {
                    return DataSources[getDataSource()].deleteUserFromTask(idTask, idUser);
                },

                getTaskSubtasks: function(id) {
                    return DataSources[getDataSource()].getTaskSubtasks(id);
                },

                createSubtaskInTask: function(idParent) {
                    return DataSources[getDataSource()].createSubtaskInTask(idParent);
                },

                addSubtaskToTask: function(idParent) {
                    return DataSources[getDataSource()].addSubtaskToTask(idParent);
                },

                addTaskToProject: function(idTask, idParent) {
                    return DataSources[getDataSource()].addTaskToProject(idTask, idParent);
                },

                moveSubtaskFromTaskToTask: function(idSource, idParent) {
                    return DataSources[getDataSource()].moveSubtaskFromTaskToTask(idSource, idParent);
                },

                moveTaskFromProjectToProject: function(idSource, idParent) {
                    return DataSources[getDataSource()].moveTaskFromProjectToProject(idSource, idParent);
                },

                /* Project */


                /* CRUD */

                getProject: function(id) {
                    return DataSources[getDataSource()].getProject(id);
                },

                getProjects: function() {
                    return DataSources[getDataSource()].getProjects(id);
                },

                createProject: function(data) {
                    return DataSources[getDataSource()].createProject(data);
                },

                updateProject: function(data) {
                    return DataSources[getDataSource()].updateProject(data);
                },

                deleteProject: function(id) {
                    return DataSources[getDataSource()].deleteProject(id);
                },

                /* END CRUD */

                getProjectTasks: function(id) {
                    return DataSources[getDataSource()].getProjectTasks(id);
                },

                assignProjectToUser: function(idProject, idUser) {
                    return DataSources[getDataSource()].assignProjectToUser(idProject, idUser);
                }
            };


            Function.prototype.createInterceptor = function createInterceptor(fn) {

            }

            /*********************************************************************************************************************/

            Function.prototype.createInterceptor = function createInterceptor(fn) {
                var scope = {},
                    original = this; //<-- add this
                return function () {
                    if (fn.apply(scope, arguments)) {
                        return original.apply(scope, arguments);
                    }
                    else {
                        return null;
                    }
                };
            };
            var interceptMe = function cube(x) {
                console.info(x);
                return Math.pow(x, 3);
            };

            var cube = interceptMe.createInterceptor(function (x) {
                return typeof x === "number";
            });

            /*********************************************************************************************************************/


            for (var k in API) {
                if(API.hasOwnProperty(k)){
                    k.createInterceptor(function (){
//                        return k.arguments;
                    })
                }
            }

            return API;
    });

}());