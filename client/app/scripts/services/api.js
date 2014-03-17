(function () {
    'use strict';

    angular.module('poolingpeopleApp')

        .service('API', function($q, $http) {

			var baseUrl = 'rest';
            $http.defaults.headers.common['Content-type'] = 'application/json';

			var serialize = function (obj) {
				return JSON.stringify(obj);
			};

            var pagination = function(size, start) {
                return (size) ? (start ? ('?size=' + size + '&start=' + start) : ('?size=' + size)) : ('');
            }
            
            return {

                /* SESSION */

                getAuthStatus: function() {
                    var q = $q.defer();
                    $http.get(baseUrl + "/user_sessions")
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                /* LOG */

                getChangeLog: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/changelog/of/object/" + id)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                getComments: function(id) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/comments/of/object/" + id)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

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
							q.resolve(data, status, headers, config);

						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});
					return q.promise;
				},

                createUser: function(data) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/users/", data)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                updateUser: function(userId, data) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/users/" + userId, {data: serialize(data)})
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

                getTask: function(id, size, start) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks/" + id)
                            .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                getTasks: function(size, start) {
                    var q = $q.defer();
                    $http.get(baseUrl + "/tasks" + pagination(size, start))
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                createTask: function(data) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/tasks/", data)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                updateTask: function(taskId, data) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/" + taskId, data)
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

                assignTaskToUser: function(idTask, idUser) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/" + idTask + "/to/user/" + idUser)
                    .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                getUsersFromTask: function(idUser) {
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
                    $http.put(baseUrl + "/tasks/" + idTask + "/in/project/" + idParent)
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

                moveTaskFromProjectToProject: function(taskId, idSource, idParent) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/tasks/" + taskId + "/from/project/" + idSource + "/to/" + idParent)
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

				getProjects: function (size, start) {
					var q = $q.defer();
					$http.get(baseUrl + '/projects' + pagination(size, start))
						.success(function (data, status, headers, config) {
							q.resolve(data, status, headers, config);
						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});

					return q.promise;
				},

                createProject: function(data) {
                    var q = $q.defer();
                    $http.post(baseUrl + "/projects/", data)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

                updateProject: function(projectId, data) {
                    var q = $q.defer();
                    $http.put(baseUrl + "/projects/" + projectId + "/to/user/" + data.owner.id)
                        .success(function (_data, status, headers, config) {
                            $http.put(baseUrl + "/projects/" + projectId, data)
                                .success(function (data, status, headers, config) {
                                    q.resolve(data, status, headers, config);
                                }).error(function (data, status, headers, config) {
                                    q.reject(data, status, headers, config);
                                });
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
                    $http.put(baseUrl + "/projects/" + idProject + "/to/user/" + idUser)
                        .success(function (data, status, headers, config) {
                            q.resolve(data, status, headers, config);
                        }).error(function (data, status, headers, config) {
                            q.reject(data, status, headers, config);
                        });
                    return q.promise;
                },

				/* Effort */

				getEffort: function (taskId, effortId) {
					var q = $q.defer();
					$http.get(baseUrl + '/tasks/' + taskId + '/efforts/' + effortId)
						.success(function (data, status, headers, config) {
							q.resolve(data, status, headers, config);
						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});
					return q.promise;
				},

				getEfforts: function (taskId) {
					var q = $q.defer();
					$http.get(baseUrl + '/tasks/' + taskId + '/efforts')
						.success(function (data, status, headers, config) {
							q.resolve(data, status, headers, config);
						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});
					return q.promise;
				},

				createEffort: function (taskId, data) {
					var q = $q.defer();
					$http.post(baseUrl + '/tasks/' + taskId + '/efforts', data)
						.success(function (data, status, headers, config) {
							q.resolve(data, status, headers, config);
						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});
					return q.promise;
				},

				updateEffort: function (taskId, effortId, data) {
					var q = $q.defer();
					$http.put(baseUrl + '/tasks/' + taskId + '/efforts/' + effortId)
						.success(function (data, status, headers, config) {
							q.resolve(data, status, headers, config);
						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});
					return q.promise;
				},

				deleteEffort: function (taskId, effortId) {
					var q = $q.defer();
					$http.delete(baseUrl + '/tasks/' + taskId + '/efforts/' + effortId)
						.success(function (data, status, headers, config) {
							q.resolve(data, status, headers, config);
						}).error(function (data, status, headers, config) {
							q.reject(data, status, headers, config);
						});
					return q.promise;
				}
            }
    })

}());