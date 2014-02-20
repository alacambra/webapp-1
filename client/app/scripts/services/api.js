(function () {
    'use strict';

    angular.module('poolingpeopleApp')

        .service('API', function($q, $http) {

			var baseUrl = '/webapplication/rest';

            var serialize = function(obj) {
              var str = [];
              for(var p in obj)
                if (obj.hasOwnProperty(p)) {
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
              return str.join("&");
            }

            var formatResponse = function(data) {
                return {
                    data: data[0],
                    code: data[1],
                    request: data[3]
                }
            }
            
            return {

                /* User */


                /* CRUD */

                getUser: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/users/" + id)
                        .success(function(data) {
                            q.resolve(formatResponse(arguments));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

				getUsers: function () {
					var q = $q.defer();

					$http.get(baseUrl + '/users')
						.success(function (data, status, headers, config) {
							var users = [];
							for (var i = 0; i < data.length; i++) {
								var user = factory.user(data[i]);
								user.setId(data[i].id);
								users.push(user);
							}
							q.resolve(users, status, headers, config);

						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});

					return q.promise;
				},

                _getUsers: function() {
                    var q = $q.defer();
                    $http.get(baseUrl + "/users/")
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                createUser: function(data) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/users/", {'Content-Type': 'application/x-www-form-urlencoded', data: serialize(data)})
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                updateUser: function(data) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/users/" + id, {'Content-Type': 'application/x-www-form-urlencoded', data: serialize(data)})
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                deleteUser: function(id) {
                    var q = $q.defer();
                    $http.delete(baseUrl + "/users/" + id)
                            .success(function(data) {
                            q.resolve(formatResponse(data));
                        });
                    return q.promise;
                },

                /* END CRUD */

                /* Task */


                /* CRUD */

                getTask: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks/" + id)
                            .success(function(data) {
                            q.resolve(formatResponse(data));
                        });
                    return q.promise;
                },

                getTasks: function() {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks/")
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                createTask: function(data) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/tasks/", {'Content-Type': 'application/x-www-form-urlencoded', data: serialize(data)})
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                updateTask: function(data) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/" + id, {'Content-Type': 'application/x-www-form-urlencoded', data: serialize(data)})
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                deleteTask: function(id) {
                    var q = $q.defer();
                    $http.delete(baseUrl + "/tasks/" + id)
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                /* END CRUD */

                getProjectFromTask: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks/" + id + "/projects/")
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                addUserToTask: function(idTask, idUser) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/" + idTask + "/addusers/" + idUser)
                    .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                getUsersFromTask: function(idTask) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks/" + idTask + "/getUsers/" + idUser)
                    .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                deleteUserFromTask: function(idTask, idUser) {
                    var q = $q.defer();
                    $http.delete(baseUrl + "/tasks/" + idTask + "/deleteUser/" + idUser)
                    .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                getTaskSubtasks: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks/" + id + "/subtasks/")
                    .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                createSubtaskInTask: function(idParent) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/tasks/as/subtask/" + idParent)
                    .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                addSubtaskToTask: function(idParent) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/as/subtask/" + idParent)
                    .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                addTaskToProject: function(idTask, idParent) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/" + idTask + "/in/porject/" + idParent)
                    .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                moveSubtaskFromTaskToTask: function(idSource, idParent) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/from/" + idSource + "/to/" + idParent)
                    .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                moveTaskFromProjectToProject: function(idSource, idParent) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/from/" + idSource + "/to/" + idParent)
                    .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                /* Project */


                /* CRUD */

                getProject: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/projects/" + id)
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

				getProjects: function () {
					var q = $q.defer();

					$http.get(baseUrl + '/projects')
						.success(function (data, status, headers, config) {
							var projects = [];
							for (var i = 0; i < data.length; i++) {
								var project = factory.project(data[i]);
								project.setId(data[i].id);
								projects.push(project);
							}
							q.resolve(projects, status, headers, config);

						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});

					return q.promise;
				},

                _getProjects: function() {
                    var q = $q.defer();
                    $http.get(baseUrl + "/projects/")
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                createProject: function(data) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/projects/", {'Content-Type': 'application/x-www-form-urlencoded', data: serialize(data)})
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                updateProject: function(data) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/projects/" + id, {'Content-Type': 'application/x-www-form-urlencoded', data: serialize(data)})
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                deleteProject: function(id) {
                    var q = $q.defer();
                    $http.delete(baseUrl + "/projects/" + id)
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                /* END CRUD */

                getProjectTasks: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/projects/" + id + "/tasks")
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },

                assignProjectToUser: function(idProject, idUser) {
                    var q = $q.defer();
                    $http.put(baseUrl + idProject + "/to/user/" + idUser)
                        .success(function(data) {
                            q.resolve(formatResponse(data));
                        }).error(function() {
                            q.reject(formatResponse(arguments));
                        });
                    return q.promise;
                },
            }
    })

}());