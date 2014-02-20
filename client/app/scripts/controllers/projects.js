(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('ProjectsCtrl', ['$scope', '$modal', '$log', 'DataProvider', '$window',
			function ($scope, $modal, $log, DataProvider, $window) {

				$scope.selectedProject = null;

				$scope.projects = [];

				DataProvider.getProjects().then(function (projects) {
					$scope.projects = projects;
					$scope.projects.forEach(function (project) {
						project.$ui = {
							showTasks: false
						};

						if (project.getId() !== 'p001') {
							DataProvider.getTasks().then(function (tasks) {
								project.setTasks(tasks);
							});
						}
					});
				});

				var openModal = function (options) {
					return $modal.open({
						templateUrl: 'views/project_modal.tpl.html',
						controller: 'ProjectModalCtrl',
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

					modalInstance.result.then(function (project) {
						$scope.projects.push(project);
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

					modalInstance.result.then(function (task) {
						$scope.selectedProject.addTask(task);
					});
				};

				$scope.createSubProject = function () {

				};

				$scope.deleteSelected = function () {
					var confirmed = $window.confirm('Soll das Projekt "' + $scope.selectedProject.title + '" wirklich gelöscht werden?');

					if (confirmed) {
						var index = $scope.projects.indexOf($scope.selectedProject);
						$scope.selectedProject = null;
						$scope.projects.splice(index, 1);
					}
				};

				$scope.showTasks = function (project) {
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

			}]);
}());
