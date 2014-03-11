(function () {
    'use strict';

    angular.module('poolingpeopleApp')
        .service('ModelsService', ['ModelStampsService', function(ModelStampsService) {

            var getTask = function(data) {
                data = data || {};
                var task = ModelStampsService.task(data);
                task.assignee = getUser(data.assignee);
                return task;
            };

            var getTaskList = function(data) {

                var tasks = [];

                data.forEach(function(task){
                    tasks.push(getTask(task));
                });

                return tasks;
            };

            var getUser = function (data) {
                data = data || {};
                return ModelStampsService.user(data);
            };

            return {
                getTask:getTask,
                getTaskList:getTaskList
            };
        }]);
}());



