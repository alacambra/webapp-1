(function () {
    'use strict';

    angular.module('poolingpeopleApp')
        .service('ModelsService', ['ModelStampsService', function(ModelStampsService) {

            var getTask = function(data, options) {
                data = data || {};
                options = options || {};
                return ModelStampsService.task(data);
            };

            var getTaskList = function(data, options) {

                var tasks = [];

                data.forEach(function(task){
                    tasks.push(getTask(task));
                });

                return tasks;
            };

            return {
                getTask:getTask,
                getTaskList:getTaskList
            };
        }]);
}());



