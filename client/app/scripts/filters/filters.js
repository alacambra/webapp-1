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
				return function (date) {
					return moment(date).valueOf();
				}
			}])

		.filter('numberToDate', [
			function () {
				return function (date, format) {
					return moment(date).toDate();
				}
			}])

		.filter('range', function() {
			return function(input, total) {
				total = parseInt(total);
				for (var i=0; i<total; i++)
					input.push(i);
				return input;
				};
			})
		.filter('startFrom', function() {
		    return function(input, start) {
		        start = +start; //parse to int
		        return input.slice(start);
		    }
		});
}());