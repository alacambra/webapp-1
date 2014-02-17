(function () {
	'use strict';

	var dependencies = [
//		'ui.bootstrap',
		'ui.router'
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
			}]);
}());