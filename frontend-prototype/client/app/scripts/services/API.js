(function () {
    'use strict';
    angular.module('frontendPrototypeApp')
        .service('API', ['$q', '$http', function ($q, $http) {

                $http.defaults.headers.common['Content-type'] = 'application/json';
                var baseUrl = 'rest',
                    serialize = function (obj) {
                        return JSON.stringify(obj);
                    };
                return {
                    createTask: function (data) {
                        var q = $q.defer();
                        $http.put(baseUrl + '/tasks', data)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getTasks: function () {
                        var q = $q.defer();
                        $http.get(baseUrl + '/tasks')
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getTask: function (id) {
                        var q = $q.defer();
                        $http.get(baseUrl + '/tasks/' + id)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    updateTask: function (id, data) {
                        var q = $q.defer();
                        $http.post(baseUrl + '/tasks/' + id, data)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    deleteTask: function (id) {
                        var q = $q.defer();
                        $http.delete(baseUrl + '/tasks/' + id)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    addPeopleToTask: function (taskId, peopleId) {
                        var q = $q.defer();
                        $http.post(baseUrl + '/tasks/' + taskId + '/people/' + peopleId)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    addCompetenceToTask: function (taskId, competenceId) {
                        var q = $q.defer();
                        $http.post(baseUrl + '/tasks/' + taskId + '/competences/' + competenceId)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    addPoolToTask: function (taskId, poolId) {
                        var q = $q.defer();
                        $http.post(baseUrl + '/tasks/' + taskId + '/pools/' + poolId)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    addTaskToPeople: function (peopleId, taskId) {
                        var q = $q.defer();
                        $http.post(baseUrl + '/people/' + peopleId + '/tasks/' + taskId)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    addTaskToTask: function (taskId1, taskId2) {
                        var q = $q.defer();
                        $http.post(baseUrl + '/tasks/' + taskId1 + '/tasks/' + taskId2)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    createPool: function (data) {
                        var q = $q.defer();
                        $http.put(baseUrl + '/pools', data)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getPools: function () {
                        var q = $q.defer();
                        $http.get(baseUrl + '/pools')
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getPool: function (id) {
                        var q = $q.defer();
                        $http.get(baseUrl + '/pools/' + id)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    updatePool: function (id, data) {
                        var q = $q.defer();
                        $http.post(baseUrl + '/pools/' + id, data)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    deletePool: function (id) {
                        var q = $q.defer();
                        $http.delete(baseUrl + '/pools/' + id)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    createPeople: function (data) {
                        var q = $q.defer();
                        $http.put(baseUrl + '/people', data)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getPeople: function () {
                        var q = $q.defer();
                        $http.get(baseUrl + '/people')
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getPerson: function (id) {
                        var q = $q.defer();
                        $http.get(baseUrl + '/people/' + id)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    updatePeople: function (id, data) {
                        var q = $q.defer();
                        $http.post(baseUrl + '/people/' + id, data)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    deletePeople: function (id) {
                        var q = $q.defer();
                        $http.delete(baseUrl + '/people/' + id)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    createCompetence: function (data) {
                        var q = $q.defer();
                        $http.put(baseUrl + '/competences', data)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getCompetences: function () {
                        var q = $q.defer();
                        $http.get(baseUrl + '/competences')
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getCompetence: function (id) {
                        var q = $q.defer();
                        $http.get(baseUrl + '/competences/' + id)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    updateCompetence: function (id, data) {
                        var q = $q.defer();
                        $http.post(baseUrl + '/competences/' + id, data)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    deleteCompetence: function (id) {
                        var q = $q.defer();
                        $http.delete(baseUrl + '/competences/' + id)
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getUserTasks: function (id) {
                        var q = $q.defer();
                        $http.get(baseUrl + '/users/' + id + '/tasks')
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getUserPools: function (id) {
                        var q = $q.defer();
                        $http.get(baseUrl + '/users/' + id + '/pools')
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getUserPeople: function (id) {
                        var q = $q.defer();
                        $http.get(baseUrl + '/users/' + id + '/people')
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    },
                    getUserCompetences: function (id) {
                        var q = $q.defer();
                        $http.get(baseUrl + '/users/' + id + '/competences')
                            .success(function (data, status, headers, config) {
                                q.resolve(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                                q.reject(data, status, headers, config);
                            });
                        return q.promise;
                    }
                };
            }]);
}());