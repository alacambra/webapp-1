(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('ProcessModalCtrl', ['$scope', '$modalInstance', 'options', '$log', 'DataProvider',
			function ($scope, $modalInstance, options, $log, DataProvider) {
				$scope.modal = {
					title: options.title,

					model: angular.copy(options.model),

					assignableUsers: [],

					assignableProjects: [],

					disabled: options.disabled
				};

				$scope.form = {
					model: null,

					startDatePickerOpened: false,

					endDatePickerOpened: false
				};

				$scope.modal.loader = {
					users: false,
					model: {
						save: false
					},
					projects: []
				};

				$scope.error = false;

				var loadUsers = function () {
					$scope.modal.loader.users = true;
					DataProvider.getUsers().then(function (users) {
						users.forEach(function (user) {
							$scope.modal.assignableUsers.push({
								id: user.id,
								name: user.firstName + ' ' + user.lastName
							});
							$scope.modal.loader.users = false;
						});
					}, function (response) {
						$scope.modal.loader.users = false;
						$scope.error = 'Couldn\'t load users: ' + response;
					});
				};

				loadUsers();

				var loadProjects = function () {
					$scope.modal.loader.projects = true;
					DataProvider.getProjects().then(function (response) {
						response.forEach(function (project) {
							$scope.modal.assignableProjects.push({
								id: project.id,
								name: project.title
							});
							$scope.modal.projects.push(factory.project(project));
							$scope.modal.loader.projects = false;
						});
					}, function (response) {
						$scope.modal.loader.users = false;
						$scope.error = 'Couldn\'t load projects: ' +response;
					});
				};

				loadProjects();

				var saveProject = function () {
					$scope.modal.loader.model.save = true;
					DataProvider.createProject($scope.modal.model).then(function (response) {
						// update origin project with new data
						_.extend(options.model, $scope.modal.model);

						// if origin project is a new project add it to projects
						if ($scope.projects.indexOf(options.model) < 0) {
							options.model.$ui = {
								showTasks: true
							};
							$scope.projects.push(options.model);
						}

						$scope.modal.loader.model.save = false;
						$modalInstance.close();

					}, function (response) {
						$scope.modal.loader.model.save = false;
						$scope.error = 'Couldn\'t save project: ' + response;
					});
				};

				var saveTask = function () {
					$scope.modal.loader.model.save = true;

					DataProvider.createTask($scope.modal.model).then(function (response) {
						_.extend(options.model, $scope.modal.model);

						DataProvider.addTaskToProject(options.model.project.id, options.model.getId()).then(function (response) {
							$scope.modal.loader.model.save = false;
							$modalInstance.close();

						}, function (response) {
							$scope.modal.loader.model.save = false;
							$scope.error = 'Couldn\'t add task to project: ' + response;
						});

					}, function (response) {
						$scope.modal.loader.model.save = false;
						$scope.error = 'Couldn\'t save task: ' + response;
					});
				};

				$scope.save = function () {
					if (!$scope.form.model.$invalid) {
						if ($scope.modal.model.isTask) {
							saveTask();

						} else if ($scope.modal.model.isProject) {
							saveProject();
						}

					} else {
						for (var attr in $scope.form.model) {
							if ($scope.form.model.hasOwnProperty(attr) && $scope.form.model[attr].hasOwnProperty('$dirty')) {
								$scope.form.model[attr].$dirty = true;
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