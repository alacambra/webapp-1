(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('ProjectsCtrl', ['$scope', '$modal', '$log', 'DataProvider', '$window',
			function ($scope, $modal, $log, DataProvider, $window) {

				// Properties that are defined in this scope attached to $scope.list

				$scope.list = {
					projects: [],

					assignableUsers: [],

					selectedProject: null,

					showProjectTasks: function (projectId) {
						$scope.list.projects.forEach(function (project) {
							project.$ui.showTasks = project.id === projectId;
						});
					},

					datepicker: {}
				};

				// Load all projects
				var loadProjects = function () {
					DataProvider.getProjects().then(function (data) {
						var projects = [];
						data.forEach(function (project) {
							var project = factory.project(project);
							project.id = project.id;
							project.$ui = {};
							projects.push(project);
						});
						$scope.list.projects = projects;
					}, function (response) {
						$log.error(response);

					});
				};

				loadProjects();

				var loadUsers = function () {
					DataProvider.getUsers().then(function (data) {
						data.forEach(function (user) {
							$scope.list.assignableUsers.push(user);
						});

					}, function (response) {
						$log.error(response);

					});
				};

				loadUsers();

				var openProjectModal = function (options) {
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

				$scope.selectProject = function (project) {
					if ($scope.list.selectedProject === project) {
						$scope.list.selectedProject = null;
					} else {
						$scope.list.selectedProject = project;
					}
				};

				$scope.newProject = function () {
					var modalInstance = openProjectModal({
						title: 'Neues Projekt',
						model: factory.project()
					});
				};

				$scope.editSelectedProject = function () {
					var modalInstance = openProjectModal({
						title: 'Projekt "' + $scope.list.selectedProject.title + '" bearbeiten',
						model: $scope.list.selectedProject
					});
				};

				$scope.createProjectTask = function () {
					var task = factory.task();
					task.project = $scope.list.selectedProject;

					var modalInstance = openTaskModal({
						title: 'Neue Aufgabe für Projekt "' + $scope.list.selectedProject.title + '" anlegen',
						task: task,
						disabled: {
							project: true
						}
					});
				};

				$scope.deleteSelected = function () {
					var modalInstance = $modal.open({
						templateUrl: 'views/confirm_modal.tpl.html',
						controller: 'ConfirmModalCtrl',
						resolve: {
							message: function() {
								return "Soll das Projekt '" + $scope.list.selectedProject.title + "' wirklich gelöscht werden?"
							}
						}
					});

					modalInstance.result.then(function () {
						var modalAjaxLoader = $modal.open({
							template: '<div class="loader"></div><p class="text-center">deleting project "' + $scope.list.selectedProject.title + '" ...</p>'
						});

						DataProvider.deleteProject($scope.list.selectedProject.id).then(function (response) {
							var index = $scope.list.projects.indexOf($scope.list.selectedProject);
							$scope.list.projects.splice(index, 1);
							$scope.list.selectedProject = null;
						}, function (response) {
							$log.error(response);
						}).finally(function () {
							modalAjaxLoader.close();
						});
					});
				};

				$scope.assignProjectToUser = function (project) {
					DataProvider.assignProjectToUser(project.id, project.owner.id);
				};

				$scope.openDatePicker = function ($event, key) {
					$event.preventDefault();
					$event.stopPropagation();

					$scope.list.datepicker = {};
					$scope.list.datepicker[key] = true;
				};

			}])

		.controller('ProjectCtrl', ['$scope', '$log', '$timeout', 'DataProvider',
			function ($scope, $log, $timeout, DataProvider) {
				var origin = angular.copy($scope.project);

				$scope.editable = {};

				$scope.showTasks = function (project) {
					if (project.$ui.showTasks) {
						project.$ui.showTasks = false;
						return;
					}

					$scope.list.showProjectTasks($scope.project.id);

					DataProvider.getProjectTasks(project.id).then(function (tasks) {
						project.setTasks(tasks);
					});
				};

				$scope.updateProject = function () {
					DataProvider.updateProject($scope.project.id, $scope.project.getRequestObj()).then(function (response) {
						origin = angular.copy($scope.project);
					}, function (response) {
						$log.error(response);
						$scope.project = angular.copy(origin);
					});
				};
			}]);
}());
