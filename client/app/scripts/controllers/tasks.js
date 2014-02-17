(function () {
    'use strict';

    angular.module('poolingpeopleApp')

        .controller('TasksCtrl', function ($scope) {
            $scope.title = 'Hello Task';

			$scope.tasks = [];

			function random8 () {
				return parseInt(Math.random() * 8);
			}

			function randomMinute () {
				return parseInt(Math.random() * 520 + 30);
			}

			for (var i = 1; i <= 5; i++) {
				var task = factory.task({
					title: 'Task' + i,
					description: 'Lorem ipsum ...',
					status: random8(),
					priority: random8(),
					startDate: moment('2014-02-11').unix(),
					endDate: moment('2014-02-20').unix(),
					duration: randomMinute(),
					progress: random8()
				});

				$scope.tasks.push(task);
			}
        });
}());
