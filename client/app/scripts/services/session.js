(function () {
    'use strict';

    angular.module('poolingpeopleApp')

        .service('SessionService', function (Base64, $cookieStore, $http) {
		    $http.defaults.headers.common.Authorization = $cookieStore.get('authdata') ? ('Basic ' + $cookieStore.get('authdata')) : "";
		 
		    var userData = {
		    	id: 0,
		    	username: "",
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
	            delete $http.defaults.headers.common.Authorization;
	        }

		    return {

		        loggedIn: function () {
		        	if ($cookieStore.get('authdata')) return true;
		        	else return false
		        },

		        logIn: function (username, password) {
		        	setCredentials(username, password);
		        },

		        logOut: function () {
		        	clearCredentials();
		        },

		        userData: userData

			}
		});

}());