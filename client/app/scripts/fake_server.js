(function () {
	'use strict';

	var dependencies = [
		'poolingpeopleApp',
		'ngMockE2E'
	];

	angular.module('poolingpeopleAppDev', dependencies)

		.run(['$httpBackend', '$log',
			function ($httpBackend, $log) {
				var baseUrl = '/webapplication/rest',
					projects = null,
					users = null,
					tasks = null;

				$.get('fixtures/users.json', function (data) {
					users = data;
				});

				$.get('fixtures/projects.json', function (data) {
					projects = data;
				});

				$.get('fixtures/tasks.json', function (data) {
					tasks = data;
				});

				$httpBackend.whenGET(/.*\.tpl\.html/).passThrough();

//				$httpBackend.whenGET(baseUrl + '/projects').respond(projects, 200, { valid: true });

				$httpBackend.whenGET(baseUrl + '/projects').respond(function (method, url, data, headers) {
					return [200, JSON.stringify(projects), { valid: true }];
				});

				$httpBackend.whenGET(baseUrl + '/users').respond(function (method, url, data, headers) {
					return [200, JSON.stringify(users)];
				});

				$httpBackend.whenGET(baseUrl + '/tasks').respond(function (method, url, data, headers) {
					return [200, JSON.stringify(tasks)];
				});
			}]);
}());