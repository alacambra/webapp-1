(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('TaskModalCtrl', ['$scope', '$modalInstance', 'options', '$log', 'DataProvider',
			function ($scope, $modalInstance, options, $log, DataProvider) {
				$scope.modal = {
					title: options.title,

					task: angular.copy(options.task),

					assignableUsers: [],

					assignableProjects: [],

					disabled: options.disabled
				};

				$scope.form = {
					task: null,

					startDatePickerOpened: false,

					endDatePickerOpened: false
				};

				$scope.error = false;

				var loadUsers = function () {
					DataProvider.getUsers().then(function (users) {
						users.forEach(function (user) {
							$scope.modal.assignableUsers.push(user);
						});
					}, function (response) {
						$scope.error = 'Couldn\'t load users: ' + response;
					});
				};

				loadUsers();

				var loadProjects = function () {
					DataProvider.getProjects().then(function (response) {
						response.forEach(function (project) {
							$scope.modal.assignableProjects.push(project);
						});
					}, function (response) {
						$scope.error = 'Couldn\'t load projects: ' +response;
					});
				};

				loadProjects();

				var saveTask = function () {
					if (_.isNull($scope.modal.task.getId())) {
						DataProvider.createTask($scope.modal.task.getRequestObj()).then(function (response) {
							_.extend(options.task, $scope.modal.task);
							options.task.setId(response.id);

							DataProvider.addTaskToProject(options.task.getId(), options.task.project.id).then(function (response) {
								if ($scope.list.tasks) {
									$scope.list.tasks.push(options.task);
								} else {
									$scope.list.selectedProject.addTask(options.task);
								}
								$modalInstance.close();

							}, function (response) {
								$scope.error = 'Couldn\'t add task to project: ' + response;
							});

						}, function (response) {
							$scope.error = 'Couldn\'t save task: ' + response;
						});

					} else {
						var sourceProject = options.task.project;
						DataProvider.updateTask(options.task.getId(), $scope.modal.task.getRequestObj()).then(function (response) {
							_.extend(options.task, $scope.modal.task);
							DataProvider.assignTaskToUser(options.task.getId(), options.task.assignee.id).then(function (response) {
								if (_.isNull(sourceProject)) {
									DataProvider.addTaskToProject(options.task.getId(), options.task.project.id).then(function (response) {
										$modalInstance.close();
									}, function (response) {
										$scope.error = 'Couldn\'t add project to task: ' + response;
									});
								} else {
									DataProvider.moveTaskFromProjectToProject(options.task.getId(), sourceProject.id, options.task.project.id).then(function (response) {
										$modalInstance.close();
									}, function (response) {
										$scope.error = 'Couldn\'t move task to another project: ' + response;
									});
								}

							}, function (response) {
								$scope.error = 'Couldn\'t add user to task: ' + response;
							});
						}, function (response) {
							$scope.error = 'Couldn\'t save task: ' + response;
						});
					}

				};

				$scope.save = function () {
					if ($scope.form.task.$valid) {
						saveTask();
					} else {
						for (var attr in $scope.form.task) {
							if ($scope.form.task.hasOwnProperty(attr) && $scope.form.task[attr].hasOwnProperty('$dirty')) {
								$scope.form.task[attr].$dirty = true;
							}
						}
					}
				};

				$scope.close = function () {
					$modalInstance.dismiss('cancel');
				};

				$scope.openDatePicker = function ($event, opened) {
					$event.preventDefault();
					$event.stopPropagation();
					$scope.form[opened] = true;
				};

			}]);
}());