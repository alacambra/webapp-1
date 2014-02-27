(function () {
	'use strict';

	var dependencies = [
		'ui.bootstrap',
		'ui.router',
		'poolingpeopleAppDirective',
		'poolingpeopleAppFilter',
		'ngCookies'
	];

	angular.module('poolingpeopleApp', dependencies)

		.config(['$stateProvider', '$urlRouterProvider',
			function ($stateProvider, $urlRouterProvider) {
				var homeState = {
						url: '/home',
						name: 'home',
						templateUrl: 'views/home.tpl.html',
						controller: 'HomeCtrl',
						navbar: true
					},
					usersState = {
						url: '/users',
						name: 'users',
						templateUrl: 'views/users.tpl.html',
						controller: 'UsersCtrl',
						navbar: true
					},
					tasksState = {
						url: '/tasks',
						name: 'tasks',
						templateUrl: 'views/tasks.tpl.html',
						controller: 'TasksCtrl',
						navbar: true
					},
					projectsState = {
						url: '/projects',
						name: 'projects',
						templateUrl: 'views/projects.tpl.html',
						controller: 'ProjectsCtrl',
						navbar: true
					};

				$urlRouterProvider.otherwise(homeState.url);

				$stateProvider.state(homeState);
				$stateProvider.state(usersState);
				$stateProvider.state(tasksState);
				$stateProvider.state(projectsState);
			}])

		.run(['$rootScope', '$state', '$stateParams',
			function ($rootScope, $state, $stateParams) {

				window.$state = $state;
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
			}])

		.run(function () {
			var projects = [],
				projectsNumber = 11;

			function randomInt(start, end) {
				return parseInt(Math.random() * (end - start + 1) + start);
			}

			for (var i = 0; i < projectsNumber; i++) {
				var project = factory.project({
					title: 'Project' + i,
					description: 'Lorem ipsum ...',
					status: randomInt(0, 7),
					priority: randomInt(0, 10),
					startDate: moment('2014-02-11').valueOf(),
					endDate: moment('2014-02-20').valueOf(),
					duration: randomInt(15, 300),
					effort: randomInt(15, 300),
					progress: randomInt(0, 100),
					assignee: {
						id: 'user-00002',
						name: 'User2 Last2'
					}
				});
				project.id = 'project-0000' + i;
				projects.push(project);
			}

			window.getMyProjects = function () {
				return projects;
			}
		})

		.run(function () {
			var users = [],
				usersNumber = 8;

			for (var i = 0; i < usersNumber; i++) {
				var user = factory.user({
					firstName: 'User' + i,
					lastName: 'Last' + i,
					birthday: moment('1991-01-0' + (i + 1)).valueOf(),
					email: 'user' + i + '@mail.de'
				});
				user.id = 'user-0000' + i;
				users.push(user);
			}

			window.getMyUsers = function () {
				return users;
			}
		});
}());