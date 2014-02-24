(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('ProjectsCtrl', ['$scope', '$modal', '$log', 'DataProvider', '$window',
			function ($scope, $modal, $log, DataProvider, $window) {

				$scope.assignableUsers = [];

				$scope.selectedProject = null;

				$scope.projects = [];

				DataProvider.getProjects().then(function (data) {
					var projects = [];
					for (var i = 0; i < data.length; i++) {
						var project = factory.project(data[i]);
						project.setId(data[i].id);
						projects.push(project);
					}
					$scope.projects = projects;
					$scope.projects.forEach(function (project) {
						project.$ui = {
							showTasks: false
						};
					});


//					var numberOfProjectsToAdd = 100;
//					for (var j = 0; j < numberOfProjectsToAdd; j++) {
//						var p = factory.project({
//							title: 'Project' + j,
//							description: 'lalala',
//							assignee: {
//								id: 'u001',
//								name: 'Anton Alpha'
//							},
//							status: 1,
//							startDate: 1392850800000 + j * 24 * 60 * 60 * 1000,
//							endDate: 1392850800000 + (j + 1) * 24 * 60 * 60 * 1000,
//							duration: 15 * (j + 1),
//							effort: 15 * j,
//							progress: Math.random()
//						});
//						p.setId('p11' + j);
//
//						$scope.projects.push(p);
//					}
				});

				DataProvider.getUsers().then(function (users) {
					users.forEach(function (user) {
						$scope.assignableUsers.push({
							id: user.id,
							name: user.firstName + ' ' + user.lastName
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

				$scope.saveProject = function (originProject, project) {
					DataProvider.createProject(project).then(function (response) {
						// update origin project with new data
						_.extend(originProject, response);

						// if origin project is a new project add it to projects
						if ($scope.projects.indexOf(originProject) < 0) {
							originProject.$ui = {
								showTasks: true
							};
							$scope.projects.push(originProject);
						}

					}, function (response) {
						$log.error(response);
					});
				};

				$scope.saveTask = function (originTask, task) {
					DataProvider.createTask(task).then(function (response) {
						DataProvider.addTaskToProject(response.id, task.project.id).then(function () {
							_.extend(originTask, response);

							for (var i = 0; i < $scope.projects.length; i++) {
								var project = $scope.projects[i];
								if (project.getId() === originTask.project.id) {
									project.addTask(originTask);
									return;
								}
							}
						});
					});
				};

				$scope.selectProject = function (project) {
					if ($scope.selectedProject === project) {
						$scope.selectedProject = null;
					} else {
						$scope.selectedProject = project;
					}
				};

				$scope.newProject = function () {
					var modalInstance = openModal({
						title: 'Neues Projekt',
						model: factory.project()
					});
				};

				$scope.editSelected = function () {
					var modalInstance = openModal({
						title: 'Projekt "' + $scope.selectedProject.title + '" bearbeiten',
						model: $scope.selectedProject
					});
				};

				$scope.createProjectTask = function () {
					var task = factory.task();
					task.setProject($scope.selectedProject);

					var modalInstance = openModal({
						title: 'Neue Aufgabe für Projekt "' + $scope.selectedProject.title + '" anlegen',
						model: task
					});
				};

				$scope.createSubProject = function () {

				};

				$scope.deleteSelected = function () {

					var modalInstance = $modal.open({
						templateUrl: 'views/confirm_modal.tpl.html',
						controller: 'ConfirmModalCtrl',
						resolve: {
							message: function() {
								return "Soll das Projekt '" + $scope.selectedProject.title + "' wirklich gelöscht werden?"
							}
						}
					});

					modalInstance.result.then(function () {
						var index = $scope.projects.indexOf($scope.selectedProject);
						DataProvider.deleteProject($scope.selectedProject.getId()).then(function (response) {
							$scope.selectedProject = null;
							$scope.projects.splice(index, 1);
						}, function (response) {
							$log.error(response);
						});
					});
				};

				$scope.showTasks = function (project) {
					DataProvider.getProjectTasks(project.getId()).then(function (tasks) {
						project.setTasks(tasks);
					});

					$scope.projects.forEach(function (p) {
						if (project === p) {
							p.$ui.showTasks = !p.$ui.showTasks;
						} else {
							p.$ui.showTasks = false;
						}
					});
				};

				$scope.disableActions = function () {
					return _.isNull($scope.selectedProject);
				};

			}])

		.controller('ProjectCtrl', ['$scope', '$log', '$timeout', 'DataProvider',
			function ($scope, $log, $timeout, DataProvider) {
				var origin = angular.copy($scope.project);

				$scope.editable = {};

				$scope.updateProject = function () {
					DataProvider.updateProject($scope.project.getId(), $scope.project).then(function (response) {
						origin = angular.copy($scope.project);

					}, function (response) {
						$log.error(response);
						$scope.project = origin;
					})
				};

				$scope.openDatePicker = function ($event, date) {
					$event.preventDefault();
					$event.stopPropagation();
					$scope.editable.datepicker = {};
					$scope.editable.datepicker[date] = true;
				};
			}]);
}());
