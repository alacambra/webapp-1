(function () {
	'use strict';

	var dependencies = [];

	angular.module('poolingpeopleAppFilter', dependencies)

		.filter('minutesToHours', [
			function () {
				return function (minutes) {
					var h = parseInt(minutes / 60, 10),
						m = minutes % 60 / 60;

					return h + m;
				};
			}])

		.filter('hoursToMinutes', [
			function () {
				return function (hours) {
					return hours * 60;
				}
			}])

		.filter('dateToNumber', [
			function () {
				return function (date, format) {
					return moment(date, format).valueOf();
				}
			}]);
}());