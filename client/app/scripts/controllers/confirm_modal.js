(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('ConfirmModalCtrl', ['$scope', '$modalInstance', 'message',
			function ($scope, $modalInstance, message) {

				$scope.modal = {
					message: message
				};

				$scope.dismiss = function () {
					$modalInstance.dismiss('cancel');
				};

				$scope.confirm = function () {
					$modalInstance.close();
				};

			}]);
}());