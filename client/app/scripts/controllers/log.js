(function () {
	'use strict';

	angular.module('poolingpeopleApp')

		.controller('LogCtrl', ['$scope', 'DataProvider', 'LoadStatusService', 'SessionService', 'ModelsService',
			function ($scope, DataProvider, LoadStatusService, SessionService, ModelsService) {

				$scope.logs = [];

				$scope.showLog = false;

				$scope.filter = {
					comment: true,
					change: true
				}

				$scope.comment = {
					text: ""
				};

				$scope.idObject = "";

				var getLog = function(id) {
					LoadStatusService.setStatus('log', LoadStatusService.RESOLVING);
					DataProvider.getLog(id).then(function(data) {
						$scope.logs = data;
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

				$scope.newComment = function() {

					var body = {
						comment: $scope.comment.text, 
						date: Date.now().valueOf()
					};
					
					$scope.comment.text = "";

					LoadStatusService.setStatus('log.createComment', LoadStatusService.RESOLVING);
					DataProvider.createComment($scope.idObject, body).then(function(data) {
						$scope.logs.push(ModelsService.getComment({
							id: data, 
							comment: body.comment,
							date: body.date,
							owner: SessionService.userData()
						}));
					}).finally(function() {
						LoadStatusService.setStatus('log.createComment', LoadStatusService.COMPLETED);
					})
				}

				var init = (function() {

					return this;

				})();
			}]);
}());
