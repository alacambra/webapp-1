(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('TaskModalCtrl', ['$scope', '$modalInstance', 'options', '$log', 'DataProvider', 'LoadStatusService',
			function ($scope, $modalInstance, options, $log, DataProvider, LoadStatusService) {

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
					var defaultUser = $scope.modal.task.assignee;
					DataProvider.getUsers().then(function (users) {
						$scope.modal.assignableUsers = users;
						$scope.modal.task.assignee = defaultUser;
					}, function (response) {
						$scope.error = 'Couldn\'t load users: ' + response;
					});
				};


				var loadProjects = function () {
					var defaultProject = $scope.modal.task.project;
					DataProvider.getProjects().then(function (projects) {
						$scope.modal.assignableProjects = projects;
						$scope.modal.task.project = defaultProject;
					}, function (response) {
						$scope.error = 'Couldn\'t load projects: ' +response;
					})
				};

				var saveTask = function () {
					LoadStatusService.setStatus("taskModal.save", LoadStatusService.RESOLVING);
					if (_.isNull($scope.modal.task.id)) {
						DataProvider.createTask($scope.modal.task.getRequestObj()).then(function (response) {
							_.extend(options.task, $scope.modal.task);
							options.task.id = response.id;

							if (!_.isNull(options.task.project)) {
								DataProvider.addTaskToProject(options.task.id, options.task.project.id).then(function (response) {
									if ($scope.list.tasks) {
										$scope.list.tasks.push(options.task);
									} else {
										$scope.list.selectedProject.addTask(options.task);
										$scope.list.selectedProject.taskCount++;
									}
									$modalInstance.close();

								}, function (response) {
									$scope.error = 'Couldn\'t add task to project: ' + response;
								}).finally(function() {
									LoadStatusService.setStatus("taskModal.save", LoadStatusService.COMPLETED);
								});
							} else {
								if ($scope.list.tasks) {
									$scope.list.tasks.push(options.task);
								} else {
									$scope.list.selectedProject.addTask(options.task);
									$scope.list.selectedProject.taskCount++;
								}
								$modalInstance.close();
							}

						}, function (response) {
							$scope.error = 'Couldn\'t save task: ' + response;
							LoadStatusService.setStatus("taskModal.save", LoadStatusService.COMPLETED);
						})

					} else {
						LoadStatusService.setStatus("taskModal.save", LoadStatusService.RESOLVING);
						var sourceProject = options.task.project;
						DataProvider.updateTask(options.task.id, $scope.modal.task).then(function (response) {
							_.extend(options.task, $scope.modal.task);
							DataProvider.assignTaskToUser(options.task.id, options.task.assignee.id).then(function (response) {
								if (!_.isNull(options.task.project)) {
									if (_.isNull(sourceProject)) {
										DataProvider.addTaskToProject(options.task.id, options.task.project.id).then(function (response) {
											$modalInstance.close();
										}, function (response) {
											$scope.error = 'Couldn\'t add project to task: ' + response;
										}).finally(function() {
											LoadStatusService.setStatus("taskModal.save", LoadStatusService.COMPLETED);
										});
									} else {
										DataProvider.moveTaskFromProjectToProject(options.task.id, sourceProject.id, options.task.project.id).then(function (response) {
											$modalInstance.close();
										}, function (response) {
											$scope.error = 'Couldn\'t move task to another project: ' + response;
										}).finally(function() {
											LoadStatusService.setStatus("taskModal.save", LoadStatusService.COMPLETED);
										});
									}
								} else {
									$modalInstance.close();
								}

							}, function (response) {
								$scope.error = 'Couldn\'t add user to task: ' + response;
								LoadStatusService.setStatus("taskModal.save", LoadStatusService.COMPLETED);
							});
						}, function (response) {
							$scope.error = 'Couldn\'t save task: ' + response;
						})
					}

				};

				var init = (function() {

					loadUsers();
					loadProjects();				

				})()

				$scope.save = function () {
					console.log($scope.form.task);
					if ($scope.form.task.$valid) {
						saveTask();
					} else {
						for (var attr in $scope.form.task) {
							if ($scope.form.task.hasOwnProperty(attr) && $scope.form.task[attr].hasOwnProperty('$dirty')) {
								console.log($scope.form.task[attr])
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

					$scope.modal.datepicker = {};
					$scope.modal.datepicker[opened] = true;
				};

			}]);
}());