(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('UsersCtrl', ['$scope', '$log', 'DataProvider', 'LoadStatusService',
			function ($scope, $log, DataProvider, LoadStatusService) {

				$scope.model = {
					password: 'a',
					firstName: 'a',
					lastName: 'a'
				};

				$scope.getUsers = function() {
					LoadStatusService.setStatus("users.userList", LoadStatusService.RESOLVING);

					DataProvider.getUsers().then(function (users) {
						$scope.users = users;
					}).finally(function() {
						LoadStatusService.setStatus("users.userList", LoadStatusService.COMPLETED);
					});				
				}


				$scope.register = function () {
					LoadStatusService.setStatus("users.newUser", LoadStatusService.RESOLVING);
					DataProvider.createUser($scope.model).then(function (response) {
						var user = factory.user(response);
						$scope.users.push(user);

					}, function (response) {
						$log.error(response);
					}).finally(function() {
						LoadStatusService.setStatus("users.newUser", LoadStatusService.COMPLETED);
					});
				};

				var init = (function() {
					$scope.getUsers();

					return this;
				})();
			}]);
}());
