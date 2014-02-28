(function () {
    'use strict';

    angular.module('poolingpeopleApp')

        .service('SessionService', function (Base64, $cookieStore, $http, $q, DataProvider) {
			if ($cookieStore.get('authdata')) {
				$http.defaults.headers.common.Authorization = 'Basic ' + $cookieStore.get('authdata');
			}
		 
		    var userData = {
		    	id: 0,
		    	username: "",
		    	password: ""
		    };

	        var setCredentials = function (username, password) {

	        	userData.username = username;
	        	userData.password = password;

	            var encoded = Base64.encode(username + ':' + password);
	            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
	            $cookieStore.put('authdata', encoded);
	        };

	        var clearCredentials = function () {
	            $cookieStore.remove('authdata');
	            delete $http.defaults.headers.common.Authorization;
	        };

		    return {

		        loggedIn: function () {
		        	if ($cookieStore.get('authdata')) return true;
		        	else return false
		        },

		        logIn: function (username, password) {

                    var q = $q.defer(),
                    	username = username, 
                    	password = password;

		        	setCredentials(username, password);

		        	var authRequest = DataProvider.getAuthStatus().then(function (response) {
		        		setCredentials(username, password);
		        		q.resolve(response);
		        	}, function (response) {
		        		q.reject(response);
		        	});

		        	clearCredentials();

                    return q.promise;
		        },

		        logOut: function () {
		        	clearCredentials();
		        },

		        userData: userData

			}
		});

}());