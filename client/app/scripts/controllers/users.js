(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('UsersCtrl', ['$scope', '$log',
			function ($scope, $log) {
				$scope.title = 'Hello User';

				$scope.users = [];

				for (var i = 1; i <= 5; i++) {
					var user = factory.user({
						firstName: 'User' + i,
						lastName: 'Last' + i,
						birthday: moment('1991-01-0' + i).unix(),
						email: 'user' + i + '@users.com'
					});
					if (i % 2 === 0) {
						user.setId('userid-' + i);
					}
					$scope.users.push(user);
				}

				$scope.addNewUser = function () {
					if ($scope.newUserForm.$invalid) {
						$scope.invalidNewUser = true;
						return;
					}

					$scope.invalidNewUser = false;

					if ($scope.newUser.birthday) {
						$scope.newUser.birthday = moment($scope.newUser.birthday).unix();
					}
					$scope.users.push($scope.newUser);
					$scope.newUser = null;
					$scope.newUserForm.$setPristine();
				};

				$scope.thomas = factory.user({
					firstName: 'Thomas',
					lastName: 'Stern',
					birthday: moment('1988-01-14').unix(),
					email: 'thomas.stern@ion2s.com'
				});

				$scope.johnny = factory.user({
					firstName: 'Johnny',
					lastName: 'No Merci',
					birthday: moment('1978-08-22').unix(),
					email: 'johnny.no-merci@mail.de'
				});

				$scope.print = function (val) {
					if (_.isFunction(val)) {
						return 'function';
					}
					return val;
				}
			}]);
}());
