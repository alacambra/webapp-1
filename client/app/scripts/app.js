(function () {
    'use strict';

    var dependencies = [
        'ui.router'
    ];

    angular.module('poolingpeopleApp', dependencies)

        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                var mainState = {
                        url: '/main',
                        name: 'main',
                        templateUrl: 'views/main.tpl.html',
                        controller: 'MainCtrl'
                    },
                    userState = {
                        url: '/users',
                        name: 'users',
                        templateUrl: 'views/users.tpl.html',
                        controller: 'UsersCtrl'
                    };

                $urlRouterProvider.otherwise('/main');

                $stateProvider.state(mainState);
                $stateProvider.state(userState);
            }])

        .run(['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }]);
}());