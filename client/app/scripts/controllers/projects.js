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

						if (project.getId() !== 'p001') {
							DataProvider.getTasks().then(function (tasks) {
								project.setTasks(tasks);
							});
						}
					});

					for (var j = 0; j < 0; j++) {
						var p = factory.project({
							title: 'Project' + j,
							description: 'lalala',
							assignee: {
								id: 'u001',
								name: 'Anton Alpha'
							},
							status: 1,
							startDate: 1392850800000 + j * 24 * 60 * 60 * 1000,
							endDate: 1392850800000 + (j + 1) * 24 * 60 * 60 * 1000,
							duration: 15 * (j + 1),
							effort: 15 * j,
							progress: Math.random()
						});
						p.setId('p11' + j);

						$scope.projects.push(p);
					}
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

			}])

		.controller('ProjectCtrl', ['$scope', '$log', '$timeout',
			function ($scope, $log, $timeout) {
				$scope.editable = {};

				$scope.openDatePicker = function ($event, datePicker) {
					$event.preventDefault();
					$event.stopPropagation();
					$scope.editable[datePicker] = true;
				};

//				$scope.hideStartDatePicker = function ($event) {
//					$timeout(function () {
//						$scope.editable.startDate = false;
//					}, 100);
//				};
			}]);
}());
