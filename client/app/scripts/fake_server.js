(function () {
	'use strict';

	var dependencies = [
		'poolingpeopleApp',
		'ngMockE2E'
	];

	angular.module('poolingpeopleAppDev', dependencies)

		.run(['$httpBackend', '$log',
			function ($httpBackend, $log) {
				var baseUrl = 'rest',
					projects = null,
					users = null,
					tasks = null,
					efforts = null;

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

				$.get('fixtures/efforts.json', function (data) {
					efforts = data;
				});

				$httpBackend.whenGET(/.*\.tpl\.html/).passThrough();

				// URI: GET - /projects
				$httpBackend.whenGET(/\/projects$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200, JSON.stringify(projects), { valid: true }];
				});

				// URI: GET - /users
				$httpBackend.whenGET(/\/users$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200, JSON.stringify(users)];
				});

				// URI: GET - /tasks
				$httpBackend.whenGET(/\/tasks$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200, JSON.stringify(tasks)];
				});

				// URI: GET /projects/:projectId/tasks
				$httpBackend.whenGET(/\/projects\/[\w-]\/tasks$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200, JSON.stringify(tasks)];
				});

				// URI: POST /projects
				$httpBackend.whenPOST(/\/projects$/).respond(function (method, url, data, headers) {
					console.log(url);
					data = JSON.parse(data);
					data.id = 'p-' + parseInt(Math.random() * 10000, 10);
					return [200, JSON.stringify(data)];
				});

				// URI: POST /tasks
				$httpBackend.whenPOST(/\/tasks$/).respond(function (method, url, data, headers) {
					console.log(url);
					data = JSON.parse(data);
					data.id = 't-' + parseInt(Math.random() * 10000, 10);
					return [200, JSON.stringify(data)];
				});

				// URI: PUT /tasks/:taskId/in/project/:projectId
				$httpBackend.whenPUT(/\/tasks\/[\w-]+\/in\/project\/[\w-]$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200];
				});

				// URI: DELETE /projects/:projectId
				$httpBackend.whenDELETE(/\/projects\/[\w-]+$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200];
				});

				// URI: DELETE /tasks/:taskId
				$httpBackend.whenDELETE(/\/tasks\/[\w-]+$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200];
				});

				// URI: PUT /projects/:projectId
				$httpBackend.whenPUT(/\/projects\/[\w-]+$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200];
				});

				// URI: PUT /tasks/:taskId/from/:projectSourceId/to/:projectTargetId
				$httpBackend.whenPUT(/\/tasks\/[\w-]+\/from\/[\w-]+\/to\/[\w-]+$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200];
				});

				// URI: PUT /tasks/:taskId
				$httpBackend.whenPUT(/\/tasks\/[\w-]+$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200];
				});

				// URI: POST /tasks/:taskId/efforts
				$httpBackend.whenPOST(/\/tasks\/[\w-]+\/efforts$/).respond(function (method, url, data, headers) {
					console.log(url);
					data = JSON.parse(data);
					data.id = 'e-' + parseInt(Math.random() * 10000, 10);
					return [200, JSON.stringify(data)];
				});

				// URI: GET /tasks/:taskId/efforts
				$httpBackend.whenGET(/\/tasks\/[\w-]+\/efforts$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200, JSON.stringify(efforts)];
				});

				// URI: DELETE /tasks/:taskId/efforts/:effortId
				$httpBackend.whenDELETE(/\/tasks\/[\w-]+\/efforts\/[\w-]+$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200];
				});

				// URI: PUT /tasks/:taskId/efforts/:effortId
				$httpBackend.whenPUT(/\/tasks\/[\w-]+\/efforts\/[\w-]+$/).respond(function (method, url, data, headers) {
					console.log(url);
					return [200];
				});
			}]);
}());