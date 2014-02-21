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

				var _baseUrl = new RegExp(/\/webapplication\/rest/);
				var _id = new RegExp(/[\w\d-]+/);

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

				$httpBackend.whenGET(baseUrl + '/projects').respond(function (method, url, data, headers) {
					return [200, JSON.stringify(projects), { valid: true }];
				});

				$httpBackend.whenGET(baseUrl + '/users').respond(function (method, url, data, headers) {
					return [200, JSON.stringify(users)];
				});

				$httpBackend.whenGET(baseUrl + '/tasks').respond(function (method, url, data, headers) {
					return [200, JSON.stringify(tasks)];
				});

				$httpBackend.whenGET(/.+\/projects\/[^\/]+\/tasks/).respond(function (method, url, data, headers) {
					return [200, JSON.stringify(tasks)];
				});

				$httpBackend.whenPOST(baseUrl + '/projects/').respond(function (method, url, data, headers) {
					data = JSON.parse(data);
					data.id = 'p-' + parseInt(Math.random() * 10000, 10);
					return [200, JSON.stringify(data)];
				});

				$httpBackend.whenPOST(baseUrl + '/tasks/').respond(function (method, url, data, headers) {
					data = JSON.parse(data);
					data.id = 't-' + parseInt(Math.random() * 10000, 10);
					return [200, JSON.stringify(data)];
				});

				$httpBackend.whenPUT(/.+\/tasks\/[^\/]+\/in\/project\/[^\/]+/).respond(function (method, url, data, headers) {
					return [200];
				});

				$httpBackend.whenDELETE(/.+\/projects\/.+/).respond(function (method, url, data, headers) {
					return [200];
				});

				$httpBackend.whenPUT(/.+\/projects\/.+/).respond(function (method, url, data, headers) {
					return [200];
				});

//				$httpBackend.

				$httpBackend.whenPUT(/.+\/tasks\/.+/).respond(function (method, url, data, headers) {
					return [200];
				});
			}]);
}());