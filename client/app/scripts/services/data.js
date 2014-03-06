(function () {
    'use strict';

    angular.module('poolingpeopleApp')

        .service('DataProvider', function(API, ModelsService) {

            var DataSources = { API: API };

            var getDataSource = function() {
                return DataSources["API"];
            };

            return {

                /* SESSION */

                getAuthStatus: function() {
                    return getDataSource().getAuthStatus();
                },

                /* User */

                /* CRUD */

                getUser: function(id) {
                    return getDataSource().getUser(id);
                },

                getUsers: function() {
                    return getDataSource().getUsers();
                },

                createUser: function(data) {
                    return getDataSource().createUser(data);
                },

                updateUser: function(id, data) {
                    return getDataSource().updateUser(id, data);
                },

                deleteUser: function(id) {
                    return getDataSource().deleteUser(id);
                },

                /* END CRUD */

                /* Task */


                /* CRUD */

                getTask: function(id) {
                    return ModelsService.getTask(getDataSource().getTasks(id));
                },

                getTasks: function () {
//                    return ModelsService.getTaskList(getDataSource().getTasks());
                    return ModelsService.getTaskList(getDataSource().getTasks());
                },

                createTask: function(data) {
                    return getDataSource().createTask(data);
                },

                updateTask: function(id, data) {
                    return getDataSource().updateTask(id, data);
                },

                deleteTask: function(id) {
                    return getDataSource().deleteTask(id);
                },

                /* END CRUD */

                getProjectFromTask: function(id) {
                    return getDataSource().getProjectFromTask(id);
                },

                assignTaskToUser: function(idTask, idUser) {
                    return getDataSource().assignTaskToUser(idTask, idUser);
                },

                getUsersFromTask: function(idTask) {
                    return getDataSource().getUsersFromTask(idTask);
                },

                deleteUserFromTask: function(idTask, idUser) {
                    return getDataSource().deleteUserFromTask(idTask, idUser);
                },

                getTaskSubtasks: function(id) {
                    return getDataSource().getTaskSubtasks(id);
                },

                createSubtaskInTask: function(idParent) {
                    return getDataSource().createSubtaskInTask(idParent);
                },

                addSubtaskToTask: function(idParent) {
                    return getDataSource().addSubtaskToTask(idParent);
                },

                addTaskToProject: function(idTask, idParent) {
                    return getDataSource().addTaskToProject(idTask, idParent);
                },

                moveSubtaskFromTaskToTask: function(idSource, idParent) {
                    return getDataSource().moveSubtaskFromTaskToTask(idSource, idParent);
                },

                moveTaskFromProjectToProject: function(id, idSource, idParent) {
                    return getDataSource().moveTaskFromProjectToProject(id, idSource, idParent);
                },

                /* Project */


                /* CRUD */

                getProject: function(id) {
                    return getDataSource().getProject(id);
                },

                getProjects: function() {
                    return getDataSource().getProjects();
                },

                createProject: function(data) {
                    return getDataSource().createProject(data);
                },

                updateProject: function(id, data) {
                    return getDataSource().updateProject(id, data);
                },

                deleteProject: function(id) {
                    return getDataSource().deleteProject(id);
                },

                /* END CRUD */

                getProjectTasks: function(id) {
                    return getDataSource().getProjectTasks(id);
                },

                assignProjectToUser: function(idProject, idUser) {
                    return getDataSource().assignProjectToUser(idProject, idUser);
                },

                /* Effort */

                getEffort: function (taskId, effortId) {
                    return getDataSource().getProject(taskId, effortId);
                },

                getEfforts: function (taskId) {
                    return getDataSource().getEfforts(taskId);
                },

                createEffort: function (taskId, data) {
                    return getDataSource().createEffort(taskId, data);
                },

                updateEffort: function (taskId, effortId, data) {
                    return getDataSource().updateEffort(taskId, effortId, data);
                },

                deleteEffort: function (taskId, effortId) {
                    return getDataSource().deleteEffort(taskId, effortId);
                }
            }
        });

}());