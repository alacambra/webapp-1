(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('LoginCtrl', function ($scope, $rootScope, SessionService, $modal) {

			$rootScope.$on("requiredAuth", function() {
				$scope.showLoginModal("You need to be authenticated");
			});

			$scope.loggedIn = SessionService.loggedIn;

			$scope.showLoginModal = function (message) {

				var modalInstance = $modal.open({
					templateUrl: 'views/login_modal.tpl.html',
					controller: 'LoginModalCtrl',
					resolve: {
						message: function() {
							return message || ""
						}
					}
				});

				modalInstance.result.then(function (loginData) {
					SessionService.logIn(loginData.username, loginData.password);
				});
			};

			$scope.logOut = SessionService.logOut;

			$scope.userData = SessionService.userData;

		});
}());