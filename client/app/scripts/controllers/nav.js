(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('NavCtrl', ['$scope',
			function ($scope) {
				var currentUser = null;

				$scope.loggedIn = function () {
					return !_.isNull(currentUser);
				};

				$scope.logIn = function () {
					currentUser = {};
				};

				$scope.logOut = function () {
					currentUser = null;
				};
			}]);
}());