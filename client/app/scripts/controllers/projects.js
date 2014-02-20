(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('ProjectsCtrl', ['$scope', '$modal', '$log', 'DataProvider',
			function ($scope, $modal, $log, DataProvider) {

				$scope.checkedItems = {};

				$scope.projects = [];

				DataProvider.getProjects().then(function (projects) {
					$scope.projects = projects;
					$scope.projects.forEach(function (project) {
						project.$ui = {
							showTasks: false
						};
					});
				});

				var openProjectModal = function (project) {
					var modalInstance = $modal.open({
						templateUrl: 'views/project_modal.tpl.html',
						controller: 'ProjectModalCtrl',
						resolve: {
							project: function () {
								return project;
							}
						}
					});

					modalInstance.result.then(function (project) {
						if (_.indexOf($scope.projects, project) < 0) {
							$scope.projects.push(project);
						}
					});
				};

				$scope.selectProject = function (project) {
					if ($scope.checkedItems.hasOwnProperty(project.getId())) {
						delete $scope.checkedItems[project.getId()];
					} else {
						$scope.checkedItems[project.getId()] = project;
					}
				};

				$scope.newProject = function () {
					openProjectModal(null);
				};

				$scope.editSelected = function () {
					for (var projectId in $scope.checkedItems) {
						if (_.size($scope.checkedItems) === 1) {
							openProjectModal($scope.checkedItems[projectId]);
						} else {
							delete $scope.checkedItems[projectId];
						}
					}
				};

				$scope.deleteSelected = function () {
					var index = -1;
					for (var projectId in $scope.checkedItems) {
						index = $scope.projects.indexOf($scope.checkedItems[projectId]);
						delete $scope.checkedItems[projectId]
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

					if (_.isNull(project.getTasks())) {
						DataProvider.getTasks().then(function (tasks) {
							project.setTasks(tasks);
						});
					}
				};

				/*
				$scope.revertSelected = function () {
					$scope.revert(getSelectedItems());
				};

				$scope.revert = function (items) {
					doAction(items, function (index) {
						if ($scope.editingObjects[$scope.projects[index].id]) {
							var item = $scope.projects[index];
							for (var key in $scope.editingObjects[$scope.projects[index].id]) {
								item[key] = $scope.editingObjects[$scope.projects[index].id][key];
							}
							$scope.editingObjects[$scope.projects[index].id] = false;
						}
					})
				};
				*/

			}]);
}());
