(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('TasksCtrl', ['$scope', '$modal', '$log', 'DataProvider', '$window',
			function ($scope, $modal, $log, DataProvider, $window) {

				$scope.assignableUsers = [];

				$scope.assignableProjects = [];

				$scope.selectedTask = null;

				$scope.tasks = [];

				DataProvider.getTasks().then(function (data) {
					var tasks = [];
					for (var i = 0; i < data.length; i++) {
						var task = factory.task(data[i]);
						task.setId(data[i].id);
						tasks.push(task);
					}
					$scope.tasks = tasks;
					$scope.tasks.forEach(function (task) {
						task.$ui = {
							showTasks: false
						};
					});
				});

				DataProvider.getUsers().then(function (users) {
					users.forEach(function (user) {
						$scope.assignableUsers.push({
							id: user.id,
							name: user.firstName + ' ' + user.lastName
						});
					});
				});

				DataProvider.getProjects().then(function (projects) {
					projects.forEach(function (project) {
						$scope.assignableProjects.push({
							id: project.id,
							name: project.title
						});
					});
				});

				var openModal = function (options) {
					return $modal.open({
						templateUrl: 'views/process_modal.tpl.html',
						controller: 'ProcessModalCtrl',
						scope: $scope,
						resolve: {
							options: function () {
								return options;
							}
						}
					});
				};

				$scope.saveTask = function (originTask, task) {
					if ($scope.tasks.indexOf(originTask) < 0) {
						// create new task
						DataProvider.createTask(task).then(function (response) {
							// update origin task with new data
							_.extend(originTask, response);

							// add to other tasks
							originTask.$ui = {
								showTasks: true
							};
							$scope.tasks.push(originTask);

						}, function (response) {
							$log.error(response);
						});

					} else {
						// update task
						DataProvider.updateTask(task.getId(), task).then(function (response) {
							// update origin task with new data
							_.extend(originTask, response);

						}, function (response) {
							$log.error(response);
						});
					}
				};

				$scope.saveProject = function (originProject, project) {
					// not implemented
				};

				$scope.selectTask = function (task) {
					if ($scope.selectedTask === task) {
						$scope.selectedTask = null;
					} else {
						$scope.selectedTask = task;
					}
				};

				$scope.newTask = function () {
					var modalInstance = openModal({
						title: 'Neues Projekt',
						model: factory.task()
					});
				};

				$scope.editSelected = function () {
					var modalInstance = openModal({
						title: 'Projekt "' + $scope.selectedTask.title + '" bearbeiten',
						model: $scope.selectedTask
					});
				};

				$scope.createTaskTask = function () {
					var task = factory.task();
					task.setTask($scope.selectedTask);

					var modalInstance = openModal({
						title: 'Neue Aufgabe für Projekt "' + $scope.selectedTask.title + '" anlegen',
						model: task
					});
				};

				$scope.createSubTask = function () {

				};

				$scope.deleteSelected = function () {

					var modalInstance = $modal.open({
						templateUrl: 'views/confirm_modal.tpl.html',
						controller: 'ConfirmModalCtrl',
						resolve: {
							message: function() {
								return "Soll die Aufgabe '" + $scope.selectedTask.title + "' wirklich gelöscht werden?"
							}
						}
					});

					modalInstance.result.then(function () {
							var index = $scope.tasks.indexOf($scope.selectedTask);
							DataProvider.deleteTask($scope.selectedTask.getId()).then(function (response) {
								$scope.selectedTask = null;
								$scope.tasks.splice(index, 1);
							}, function (response) {
								$log.error(response);
							});
					});

				};

				$scope.showTasks = function (task) {
					$scope.tasks.forEach(function (p) {
						if (task === p) {
							p.$ui.showTasks = !p.$ui.showTasks;
						} else {
							p.$ui.showTasks = false;
						}
					});
				};

				$scope.disableActions = function () {
					return _.isNull($scope.selectedTask);
				};

			}])

		.controller('TaskCtrl', ['$scope', '$log', '$timeout', 'DataProvider',
			function ($scope, $log, $timeout, DataProvider) {
				var origin = angular.copy($scope.task);

				$scope.editable = {};

				$scope.updateTask = function () {
					DataProvider.updateTask($scope.task.getId(), $scope.task).then(function (response) {
						origin = angular.copy($scope.task);

					}, function (response) {
						$log.error(response);
						$scope.task = origin;
					})
				};

				$scope.updateTaskProject = function () {
					DataProvider.moveTaskFromProjectToProject($scope.task.getId(), origin.project.id, $scope.task.project.id).then(function (response) {
						origin = angular.copy($scope.task);

					}, function (response) {
						$log.error(response);
						$scope.task = origin;
					});
				};

				$scope.openDatePicker = function ($event, date) {
					$event.preventDefault();
					$event.stopPropagation();
					$scope.editable.datepicker = {};
					$scope.editable.datepicker[date] = true;
				};
			}]);
}());
