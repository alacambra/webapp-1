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
						navbar: true,
						needAuth: false
					},
					usersState = {
						url: '/users',
						name: 'users',
						templateUrl: 'views/users.tpl.html',
						controller: 'UsersCtrl',
						navbar: true,
						needAuth: true
					},
					tasksState = {
						url: '/tasks',
						name: 'tasks',
						templateUrl: 'views/tasks.tpl.html',
						controller: 'TasksCtrl',
						navbar: true,
						needAuth: false
					},
					projectsState = {
						url: '/projects',
						name: 'projects',
						templateUrl: 'views/projects.tpl.html',
						controller: 'ProjectsCtrl',
						navbar: true,
						needAuth: false
					};

				$urlRouterProvider.otherwise(homeState.url);

				$stateProvider.state(homeState);
				$stateProvider.state(usersState);
				$stateProvider.state(tasksState);
				$stateProvider.state(projectsState);
			}])

		.run(['$rootScope', '$state', '$stateParams', 'SessionService', 
			function ($rootScope, $state, $stateParams, SessionService) {

				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;

			    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			    	if (toState.needAuth && !SessionService.loggedIn()) {
				    	event.preventDefault();
				    	$rootScope.$broadcast("requiredAuth", toState, toParams, fromState, fromParams);
			    	}
			    })

			}])
}());