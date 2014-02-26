(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('EffortModalCtrl', ['$scope', '$modalInstance', '$modal', 'options', '$log', 'DataProvider',
			function ($scope, $modalInstance, $modal, options, $log, DataProvider) {
				$scope.modal = {
					title: options.title,

					task: options.task,

					newEffort: factory.effort({
						date: moment().valueOf()
					})
				};

				DataProvider.getEfforts($scope.modal.task.getId()).then(function (efforts) {
					var effortsList = [];
					efforts.forEach(function (effort) {
						var _effort = factory.effort(effort);
						_effort.taskId = $scope.modal.task.getId();
						_effort.setId(effort.id);
						effortsList.push(_effort);
					});
					$scope.modal.task.setEfforts(effortsList);
				});


				$scope.form = {
					datePickerOpened: false
				};

				$scope.editable = {
					datepicker: {
						date: false
					}
				};

				$scope.clearFields = function() {
					$scope.modal.newEffort.time = $scope.modal.newEffort.comment = ""
					$scope.modal.newEffort.date = moment().valueOf();
				}

				$scope.save = function () {
					DataProvider.createEffort($scope.modal.task.getId(), $scope.modal.newEffort.getRequestObj()).then(function (response) {
						response.taskId = $scope.modal.task.getId();
						$scope.modal.task.addEffort(factory.effort(response));
						$scope.clearFields();
					}, function (response) {
						$log.error(response);
					});
				};

				$scope.remove = function (effort) {
					var modalInstance = $modal.open({
						templateUrl: 'views/confirm_modal.tpl.html',
						controller: 'ConfirmModalCtrl',
						resolve: {
							message: function() {
								return "Soll die  effort wirklich gelöscht werden?";
							}
						}
					});

					modalInstance.result.then(function () {
						DataProvider.deleteEffort($scope.modal.task.getId(), effort.getId()).then(function (response) {
							$scope.modal.task.removeEffort(effort);
						}, function (response) {
							$log.error(response);
						});
					});
				};

				$scope.close = function () {
					$modalInstance.dismiss('cancel');
				};

				$scope.openDatePicker = function ($event, datepicker) {
					$event.preventDefault();
					$event.stopPropagation();
					$scope.form[datepicker] = true;
				};

			}])

		.controller('EffortCtrl', ['$scope', '$log', 'DataProvider',
			function($scope, $log, DataProvider) {
				$scope.editableEffort = angular.copy($scope.effort);

				$scope.editable = {
					datepicker: {
						date: false
					}
				};

				$scope.updateEffort = function () {
					console.log("TEST");
					DataProvider.updateEffort($scope.editableEffort.taskId, $scope.editableEffort.getId(), $scope.editableEffort.getRequestObj()).then(function (response) {
						$scope.effort = angular.copy($scope.editableEffort);
					}, function (response) {
						$scope.editableEffort = angular.copy($scope.effort);
						$log.error(response);
					});
				};

				$scope.openDatePicker = function ($event) {
					$event.preventDefault();
					$event.stopPropagation();
					$scope.editable.datepicker.date = true;
				};
			}]);
}());