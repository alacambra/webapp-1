(function () {
    'use strict';

    angular.module('poolingpeopleApp')

        .service('SessionService', function (Base64, $cookieStore, $http) {
	    $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookieStore.get('authdata');
	 
	    var userData = {
	    	id: 0,
	    	username: "username",
	    	password: ""
	    }

        var setCredentials = function (username, password) {

        	userData.username = username;
        	userData.password = password;

            var encoded = Base64.encode(username + ':' + password);
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
            $cookieStore.put('authdata', encoded);
        }
        var clearCredentials = function () {
            $cookieStore.remove('authdata');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }

	    return {
	        loggedIn: function () {
	        	if ($cookieStore.get('authdata')) return true;
	        	else return false
	        },
	        logIn: function () {
	        	setCredentials("user", "password");
	        },
	        logOut: function () {
	        	clearCredentials();
	        },
	        username: function() {
	        	return userData.username;
	        }
	    };
	});

}());