(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('LogCtrl', ['$scope', 'DataProvider', 'LoadStatusService',
			function ($scope, DataProvider, LoadStatusService) {

				$scope.logs = [];
				$scope.showLog = false;
				$scope.filter = {
					comment: true,
					change: true
				}
				$scope.idObject = "0";

				var getLog = function(id) {
					LoadStatusService.setStatus('log', LoadStatusService.RESOLVING);
					DataProvider.getLog(id).then(function(data) {
						$scope.logs = data;
						console.log(data);
					}).finally(function() {
						LoadStatusService.setStatus('log', LoadStatusService.COMPLETED);
					})
				}

				$scope.getType = function(log) {
					if (log.comment) return "comment";
					if (log.action) return "change"
				}

				$scope.toggleLog = function() {
					$scope.showLog = !$scope.showLog;
					if ($scope.showLog) {
						getLog($scope.idObject);
						$scope.filter = {
							comment: true,
							change: true
						}
					}
				}

				$scope.getFilteredLogs = function() {
					var filteredLogs = [];
					angular.forEach($scope.logs, function (log) {
						if ($scope.filter[$scope.getType(log)]) filteredLogs.push(log);
					})
					return filteredLogs;
				}

				var init = (function() {

					return this;

				})();
			}]);
}());
