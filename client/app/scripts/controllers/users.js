(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('UsersCtrl', ['$scope', '$log', 'DataProvider',
			function ($scope, $log, DataProvider) {
				DataProvider.getUsers().then(function (users) {
					$scope.users = users;
				});

				$scope.model = {
					password: 'a',
					firstName: 'a',
					lastName: 'a'
				};

				$scope.register = function () {
					DataProvider.createUser($scope.model).then(function (response) {
						var user = factory.user(response);
						$scope.users.push(user);

					}, function (response) {
						$log.error(response);
					});
				};
			}]);
}());
