(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('LoginCtrl', function ($scope, SessionService) {

			$scope.loggedIn = SessionService.loggedIn;
			$scope.logIn = SessionService.logIn;
			$scope.logOut = SessionService.logOut;

			$scope.username = SessionService.username();
		});
}());