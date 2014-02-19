(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('ProjectModalCtrl', ['$scope', '$modalInstance', 'project', '$log',
			function ($scope, $modalInstance, project, $log) {
				$scope.modal = {
					title: _.isNull(project) ? 'New Project' : 'Edit Project',

					assignableUsers: [],

					project: angular.copy(project) || factory.project({}),

					projectForm: null,

					startDatePickerOpened: false,

					endDatePickerOpened: false
				};

				$scope.form = {
					project: null
				};

				window.getMyUsers().forEach(function (user) {
					$scope.modal.assignableUsers.push({
						id: user.getId(),
						name: user.getFullName()
					});
				});

				$scope.close = function () {
					$modalInstance.dismiss('cancel');
				};

				$scope.save = function () {
					if (!$scope.form.project.$invalid) {
						$modalInstance.close(_.extend(project || {}, $scope.modal.project));
					} else {
						for (var attr in $scope.form.project) {
							if ($scope.form.project.hasOwnProperty(attr) && $scope.form.project[attr].hasOwnProperty('$dirty')) {
								$scope.form.project[attr].$dirty = true;
							}
						}
					}
				};

				$scope.openDatePicker = function ($event, opened) {
					$event.preventDefault();
					$event.stopPropagation();
					$scope.modal[opened] = true;
				};

			}]);
}());