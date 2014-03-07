(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('LogCtrl', ['$scope', 'DataProvider', 'LoadStatusService',
			function ($scope, DataProvider, LoadStatusService) {

				$scope.logs = [];
				$scope.showLog = false;
				$scope.filter = {
					comment: true,
					edition: true
				}
				$scope.idObject = "0";

				var getLog = function(id) {
					LoadStatusService.setStatus('log', LoadStatusService.RESOLVING);
					DataProvider.getLog(id).then(function(data) {
						$scope.logs = data;
					}).finally(function() {
						LoadStatusService.setStatus('log', LoadStatusService.COMPLETED);
					})
				}

				$scope.toggleLog = function() {
					$scope.showLog = !$scope.showLog;
					if ($scope.showLog) {
						getLog($scope.idObject);
						$scope.filter = {
							comment: true,
							edition: true
						}
					}
				}

				$scope.getFilteredLogs = function() {
					var filteredLogs = [];
					angular.forEach($scope.logs, function (log) {
						if ($scope.filter[log.type]) filteredLogs.push(log);
					})
					return filteredLogs;
				}

				var init = (function() {

					return this;

				})();
			}]);
}());
