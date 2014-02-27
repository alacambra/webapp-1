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
						console.log(users);
						users.forEach(function (user) {
							$scope.modal.assignableUsers.push(user);
						});
						$scope.modal.loader.users = false;
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

					if (_.isNull($scope.modal.model.id)) {
						DataProvider.createProject($scope.modal.model.getRequestObj()).then(function (response) {
							// update origin project with new data
							console.log(options.model, $scope.modal.model);
							_.extend(options.model, $scope.modal.model);
							options.model.id = response.id;

							options.model.$ui = {
								showTasks: false
							};
							$scope.list.projects.push(options.model);

							$modalInstance.close();

						}, function (response) {
							$scope.error = 'Couldn\'t save project: ' + response;
						}).finally(function () {
							$scope.modal.loader.model.save = false;
						});

					} else {
						DataProvider.updateProject($scope.modal.model.id, $scope.modal.model.getRequestObj()).then(function (response) {
							_.extend(options.model, $scope.modal.model);
							$modalInstance.close();
						}, function (response) {
							$scope.error = 'Couldn\'t update project: ' + response;
						}).finally(function () {
							$scope.modal.loader.model.save = false;
						});
					}



				};

				var saveTask = function () {
					$scope.modal.loader.model.save = true;

					DataProvider.createTask($scope.modal.model.getRequestObj()).then(function (response) {
						_.extend(options.model, $scope.modal.model);

						DataProvider.addTaskToProject(options.model.project.id, options.model.id).then(function (response) {
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