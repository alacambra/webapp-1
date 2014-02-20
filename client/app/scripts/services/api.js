(function () {
    'use strict';

    angular.module('poolingpeopleApp')

        .service('API', function($q, $http) {

			var baseUrl = '/webapplication/rest';
            $http.defaults.headers.common['Content-type'] = 'application/json';

            var serialize = function(obj) {
                var str = [];
                for(var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                }
                return str.join("&");
            }
            
            return {

                /* User */


                /* CRUD */

                getUser: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/users/" + id)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

				getUsers: function () {
					var q = $q.defer();

					$http.get(baseUrl + '/users')
						.success(function (data, status, headers, config) {
							q.resolve(users, status, headers, config);

						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});

					return q.promise;
				},

                createUser: function(data) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/users/", {data: serialize(data)})
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                updateUser: function(data) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/users/" + id, {data: serialize(data)})
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                deleteUser: function(id) {
                    var q = $q.defer();
                    $http.delete(baseUrl + "/users/" + id)
                            .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                /* END CRUD */

                /* Task */


                /* CRUD */

                getTask: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks/" + id)
                            .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                getTasks: function() {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks")
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                createTask: function(data) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/tasks/", {data: serialize(data)})
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                updateTask: function(data) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/" + id, {data: serialize(data)})
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                deleteTask: function(id) {
                    var q = $q.defer();
                    $http.delete(baseUrl + "/tasks/" + id)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                /* END CRUD */

                getProjectFromTask: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks/" + id + "/projects/")
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                addUserToTask: function(idTask, idUser) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/" + idTask + "/addusers/" + idUser)
                    .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                getUsersFromTask: function(idTask) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks/" + idTask + "/getUsers/" + idUser)
                    .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                deleteUserFromTask: function(idTask, idUser) {
                    var q = $q.defer();
                    $http.delete(baseUrl + "/tasks/" + idTask + "/deleteUser/" + idUser)
                    .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                getTaskSubtasks: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks/" + id + "/subtasks/")
                    .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                createSubtaskInTask: function(idParent) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/tasks/as/subtask/" + idParent)
                    .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                addSubtaskToTask: function(idParent) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/as/subtask/" + idParent)
                    .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                addTaskToProject: function(idTask, idParent) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/" + idTask + "/in/porject/" + idParent)
                    .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                moveSubtaskFromTaskToTask: function(idSource, idParent) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/from/" + idSource + "/to/" + idParent)
                    .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                moveTaskFromProjectToProject: function(idSource, idParent) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/from/" + idSource + "/to/" + idParent)
                    .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                /* Project */


                /* CRUD */

                getProject: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/projects/" + id)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

				getProjects: function () {
					var q = $q.defer();

					$http.get(baseUrl + '/projects')
						.success(function (data, status, headers, config) {
							q.resolve(data, status, headers, config);
						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});

					return q.promise;
				},

                _getProjects: function() {
                    var q = $q.defer();
                    $http.get(baseUrl + "/projects")
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                createProject: function(data) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/projects/", {data: serialize(data)})
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                updateProject: function(data) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/projects/" + id, {data: serialize(data)})
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                deleteProject: function(id) {
                    var q = $q.defer();
                    $http.delete(baseUrl + "/projects/" + id)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                /* END CRUD */

                getProjectTasks: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/projects/" + id + "/tasks")
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                assignProjectToUser: function(idProject, idUser) {
                    var q = $q.defer();
                    $http.put(baseUrl + idProject + "/to/user/" + idUser)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },
            }
    })

}());