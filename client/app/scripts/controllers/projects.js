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
							project.$ui.showTasks = project.getId() === projectId;
						});
					}
				};

				// Load all projects
				var loadProjects = function () {
					DataProvider.getProjects().then(function (data) {
						var projects = [];
						data.forEach(function (project) {
							var project = factory.project(project);
							project.setId(project.id);
							project.$ui = {};
							projects.push(project);
						});
						$scope.list.projects = projects;

					}, function (response) {
						$log.error(response);

					}).finally(function () {
						// ajax loader
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

					}).finally(function () {
						$scope.loader.users = false;
					});
				};

				loadUsers();

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

				$scope.editSelectedProject = function () {
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
						model: task,
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
								return "Soll das Projekt '" + $scope.selectedProject.title + "' wirklich gelöscht werden?"
							}
						}
					});

					modalInstance.result.then(function () {
						var modalAjaxLoader = $modal.open({
							template: '<div class="loader"></div><p class="text-center">deleting project "' + $scope.selectedProject.title + '" ...</p>'
						});

						DataProvider.deleteProject($scope.list.selectedProject.getId()).then(function (response) {
							var index = $scope.list.projects.indexOf($scope.selectedProject);
							$scope.projects.splice(index, 1);
							$scope.selectedProject = null;
						}, function (response) {
							$log.error(response);
						}).finally(function () {
							modalAjaxLoader.close();
						});
					});
				};

				$scope.disableActions = function () {
					return _.isNull($scope.selectedProject);
				};

				$scope.assignProjectToUser = function (project) {
					DataProvider.assignProjectToUser(project.getId(), project.owner.id);
				};

			}])

		.controller('ProjectCtrl', ['$scope', '$log', '$timeout', 'DataProvider',
			function ($scope, $log, $timeout, DataProvider) {
				var origin = angular.copy($scope.project);

				$scope.editable = {};

				$scope.item = {
					loader: {
						edit: false,
						tasks: {
							load: false
						}
					}
				};

				$scope.showTasks = function (project) {
					if (project.$ui.showTasks) {
						project.$ui.showTasks = false;
						return;
					}

					$scope.list.showProjectTasks($scope.project.getId());
					$scope.item.loader.tasks.load = true;

					DataProvider.getProjectTasks(project.getId()).then(function (tasks) {
						project.setTasks(tasks);
					}).finally(function () {
						$scope.item.loader.tasks.load = false;
					});
				};

				$scope.updateProject = function () {
					$scope.item.loader.edit = true;
					DataProvider.updateProject($scope.project.getId(), $scope.project.getRequestObj()).then(function (response) {
						origin = angular.copy($scope.project);
					}, function (response) {
						$log.error(response);
						$scope.project = angular.copy(origin);
					}).finally(function () {
						$scope.item.loader.edit = false;
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
