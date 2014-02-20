(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('LoginModalCtrl', ['$scope', '$modalInstance', 'SessionService', 'message',
			function ($scope, $modalInstance, SessionService, message) {

				$scope.modal = {
					title: 'Login',
					message: message || ''
				};

				$scope.form = {
					username: "",
					password: ""
				};

				$scope.close = function () {
					$modalInstance.dismiss('cancel');
				};

				$scope.save = function () {
					if (!$scope.form.login.$invalid) {
						$modalInstance.close(username, password);
					} else {
						for (var attr in $scope.form.login) {
							if ($scope.form.login.hasOwnProperty(attr) && $scope.form.login[attr].hasOwnProperty('$dirty')) {
								$scope.form.login[attr].$dirty = true;
							}
						}
					}
					
				};

			}]);
}());