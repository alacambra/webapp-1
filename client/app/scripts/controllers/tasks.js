(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('TasksCtrl', ['$scope', '$modal', '$log', 'DataProvider', 'LoadStatusService', '$window',
			function ($scope, $modal, $log, DataProvider, LoadStatusService, $window) {


				$scope.list = {
					tasks: [],

					assignableUsers: [],

					assignableProjects: [],

					selectedTask: null,

					datepicker: {}
				};

				var loadTasks = function () {
					LoadStatusService.setStatus("tasks.taskList", LoadStatusService.RESOLVING);
					DataProvider.getTasks().then(function (tasks) {
					LoadStatusService.setStatus("tasks.taskList", LoadStatusService.COMPLETED);
						$scope.list.tasks = tasks;
					});
				};

				var loadUsers = function () {
					DataProvider.getUsers().then(function (users) {
						$scope.list.assignableUsers = users;
					});
				};

				var loadProjects = function () {
					DataProvider.getProjects().then(function (projects) {
						$scope.list.assignableProjects = projects;
					});
				};

				var init = (function() {

					loadTasks();
					loadUsers();
					loadProjects();

					return this; 

				})();


				var openTaskModal = function (options) {
					return $modal.open({
						templateUrl: 'views/task_modal.tpl.html',
						controller: 'TaskModalCtrl',
						scope: $scope,
						resolve: {
							options: function () {
								return options;
							}
						}
					});
				};

				var openEffortModal = function (options) {
					return $modal.open({
						templateUrl: 'views/effort_modal.tpl.html',
						controller: 'EffortModalCtrl',
						scope: $scope,
						resolve: {
							options: function () {
								return options;
							}
						}
					});
				};

				$scope.selectTask = function (task) {
					if ($scope.list.selectedTask === task) {
						$scope.list.selectedTask = null;
					} else {
						$scope.list.selectedTask = task;
					}
				};

				$scope.assignUserToTask = function (task) {
					DataProvider.assignTaskToUser(task.id, task.assignee.id);
				};

				$scope.newTask = function () {
					var modalInstance = openTaskModal({
						title: 'Neue Aufgabe',
						task: factory.task()
					});
				};

				$scope.editSelected = function () {
					var modalInstance = openTaskModal({
						title: 'Aufgabe "' + $scope.list.selectedTask.title + '" bearbeiten',
						task: $scope.list.selectedTask
					});
				};

				$scope.deleteSelected = function () {
					var modalInstance = $modal.open({
						templateUrl: 'views/confirm_modal.tpl.html',
						controller: 'ConfirmModalCtrl',
						resolve: {
							message: function() {
								return "Soll die Aufgabe '" + $scope.list.selectedTask.title + "' wirklich gelöscht werden?";
							}
						}
					});

					modalInstance.result.then(function () {
							DataProvider.deleteTask($scope.list.selectedTask.id).then(function (response) {
								var index = $scope.list.tasks.indexOf($scope.list.selectedTask);
								$scope.list.selectedTask = null;
								$scope.list.tasks.splice(index, 1);
							}, function (response) {
								$log.error(response);
							});
					});

				};

				$scope.showTasks = function (task) {
					$scope.tasks.forEach(function (_task) {
						if (task === _task) {
							_task.$ui.showTasks = !_task.$ui.showTasks;
						} else {
							_task.$ui.showTasks = false;
						}
					});
				};

				$scope.bookEffort = function (task) {
					var targetTask = task || $scope.list.selectedTask;
					var modalInstance = openEffortModal({
						title: 'Neuer Aufwand für Aufgabe "' + targetTask.title + '"',
						task: targetTask
					});
				};

				$scope.openDatePicker = function ($event, key) {
					$event.preventDefault();
					$event.stopPropagation();


					$scope.list.datepicker = {};
					$scope.list.datepicker[key] = true;
				};

			}])

		.controller('TaskCtrl', ['$scope', '$log', '$timeout', 'DataProvider',
			function ($scope, $log, $timeout, DataProvider) {
				var origin = angular.copy($scope.task);

				$scope.editable = {};

				$scope.updateTask = function () {

					LoadStatusService['updateTask'] = true;

					DataProvider.updateTask($scope.task.id, $scope.task.getRequestObj()).then(function (response) {
						origin = angular.copy($scope.task);
					}, function (response) {
						$log.error(response);
						$scope.task = origin;
					}).finally(function() {
						LoadStatusService['updateTask'] = false;
					})
				};

				$scope.updateTaskProject = function () {
					LoadStatusService['updateTask'] = true;
					DataProvider.moveTaskFromProjectToProject($scope.task.id, origin.project.id, $scope.task.project.id).then(function (response) {
						origin = angular.copy($scope.task);

					}, function (response) {
						$log.error(response);
						$scope.task = origin;
					}).finally(function() {
						LoadStatusService['updateTask'] = false;
					});
				};
			}]);
}());
