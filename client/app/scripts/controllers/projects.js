(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('ProjectsCtrl', ['$scope', '$modal', '$log', 'DataProvider', '$window',
			function ($scope, $modal, $log, DataProvider, $window) {

				$scope.assignableUsers = [];

				$scope.selectedProject = null;

				$scope.projects = [];

				$scope.loader = {
					projects: false,
					user: false
				};

				var loadProjects = function () {
					$scope.loader.projects = true;
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

					}, function (response) {
						$log.error(response);

					}).finally(function () {
						$scope.loader.projects = false;
					});
				};

				loadProjects();

				var loadUsers = function () {
					$scope.loader.users = true;
					DataProvider.getUsers().then(function (users) {
						users.forEach(function (user) {
							$scope.assignableUsers.push({
								id: user.id,
								name: user.firstName + ' ' + user.lastName
							});
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
						var modalInstance2 = $modal.open({
							template: '<div class="loader"></div><p class="text-center">deleting project "' + $scope.selectedProject.title + '" ...</p>'
						});
						var index = $scope.projects.indexOf($scope.selectedProject);
						DataProvider.deleteProject($scope.selectedProject.getId()).then(function (response) {
							$scope.selectedProject = null;
							$scope.projects.splice(index, 1);
						}, function (response) {
							$log.error(response);
						}).finally(function () {
							modalInstance2.close();
						});
					});
				};

				$scope.disableActions = function () {
					return _.isNull($scope.selectedProject);
				};

				$scope.list = {
					showProjectTasks: function (projectId) {
						$scope.projects.forEach(function (project) {
							project.$ui.showTasks = project.getId() === projectId;
						});
					}
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

				$scope.loadProjectTasks = function () {
					$scope.list.showProjectTasks($scope.project.getId());
					$scope.item.loader.tasks.load = true;

					DataProvider.getProjectTasks($scope.project.getId()).then(function (response) {
						$scope.project.setTasks(response);
						$scope.item.loader.tasks.load = false;

					}, function (response) {
						$scope.item.loader.tasks.load = false;
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

				$scope.updateProject = function () {
					$scope.item.loader.edit = true;
					DataProvider.updateProject($scope.project.getId(), $scope.project).then(function (response) {
						origin = angular.copy($scope.project);
						$scope.item.loader.edit = false;

					}, function (response) {
						$log.error(response);
						$scope.project = origin;
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
