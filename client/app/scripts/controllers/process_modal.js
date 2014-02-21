(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('ProcessModalCtrl', ['$scope', '$modalInstance', 'options', '$log', 'DataProvider',
			function ($scope, $modalInstance, options, $log, DataProvider) {
				$scope.modal = {
					title: options.title,

					model: angular.copy(options.model),

					assignableUsers: []
				};

				$scope.form = {
					model: null,

					startDatePickerOpened: false,

					endDatePickerOpened: false
				};

				DataProvider.getUsers().then(function (users) {
					users.forEach(function (user) {
						$scope.modal.assignableUsers.push({
							id: user.id,
							name: user.firstName + ' ' + user.lastName
						});
					});
				});

				$scope.save = function () {
					if (!$scope.form.model.$invalid) {
						if ($scope.modal.model.isTask) {
							$scope.saveTask(options.model, $scope.modal.model);

						} else if ($scope.modal.model.isProject) {
							$scope.saveProject(options.model, $scope.modal.model);
						}

						$modalInstance.close();

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