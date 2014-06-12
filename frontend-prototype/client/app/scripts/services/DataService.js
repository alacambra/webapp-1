(function () {
    'use strict';
    angular.module('frontendPrototypeApp')
        .service('DataService', ['$q', 'API', 'ModelsService', 'Resource', function ($q, API, ModelsService, Resource) {
                var DataSources = {API: API},
                getDataSource = function () {
                    return DataSources.API;
                };
                return {
                    createTask: function (task) {
                        return getDataSource().createTask(task.getDTO());
                    },
                    getTasks: function () {
                        return getDataSource().getTasks().then(function (data) {
                            var tasks = [];
                            _.each(data, function (task) {
                                var newTask = ModelsService.task(task)
                                tasks.push(newTask);
                            });
                            return tasks;
                        });
                    },
                    updateTask: function (id, task) {
                        return getDataSource().updateTask(id, task.getDTO());
                    },
                    deleteTask: function (id) {
                        return getDataSource().deleteTask(id);
                    },
                    addPeopleToTask: function (taskId, peopleId) {
                        var that = this,
                            q = $q.all([
                                getDataSource().addPeopleToTask(taskId, peopleId),
                                getDataSource().addTaskToPeople(peopleId, taskId)
                            ]);
                        return q;
                    },
                    addCompetenceToTask: function (taskId, competenceId) {
                        var that = this,
                            q = $q.all([
                                getDataSource().addCompetenceToTask(taskId, competenceId),
                                    //getDataSource().addTaskToCompetence(competenceId, taskId)
                            ]);
                        return q;
                    },
                    addPoolToTask: function (taskId, poolId) {
                        var that = this,
                            q = $q.all([
                                getDataSource().addPoolToTask(taskId, poolId),
                                    //getDataSource().addTaskToPool(poolId, taskId)
                            ]);
                        return q;
                    },
                    addTaskToTask: function (taskId1, taskId2) {
                        var that = this,
                            q = $q.all([
                                getDataSource().addTaskToTask(taskId1, taskId2),
                                getDataSource().addTaskToTask(taskId2, taskId1)
                            ]);
                        return q;
                    },
                    createPool: function (pool) {
                        return getDataSource().createPool(pool.getDTO());
                    },
                    getPools: function () {
                        return getDataSource().getPools().then(function (data) {
                            var pools = [];
                            _.each(data, function (pool) {
                                pools.push(ModelsService.task(pool));
                            });
                            return pools;
                        });
                    },
                    updatePool: function (id, pool) {
                        return getDataSource().updatePool(id, pool.getDTO());
                    },
                    deletePool: function (id) {
                        return getDataSource().deletePool(id);
                    },
                    createPeople: function (people) {
                        return getDataSource().createPeople(people.getDTO());
                    },
                    getPeople: function () {
                        return getDataSource().getPeople().then(function (data) {
                            var people = [];
                            _.each(data, function (peopleItem) {
                                people.push(ModelsService.people(peopleItem));
                            });
                            return people;
                        });
                    },
                    updatePeople: function (id, people) {
                        return getDataSource().updatePeople(id, people.getDTO());
                    },
                    deletePeople: function (id) {
                        return getDataSource().deletePeople(id);
                    },
                    createCompetence: function (competence) {
                        return getDataSource().createCompetence(competence.getDTO());
                    },
                    getCompetence: function () {
                        return getDataSource().getCompetence().then(function (data) {
                            var competence = [];
                            _.each(data, function (competenceItem) {
                                competence.push(ModelsService.people(competenceItem));
                            });
                            return people;
                        });
                    },
                    updateCompetence: function (id, competence) {
                        return getDataSource().updateCompetence(id, competence.getDTO());
                    },
                    deleteCompetence: function (id) {
                        return getDataSource().deleteCompetence(id);
                    },
                    getPeopleList: function (peopleList) {
                        var that = this,
                            peopleListRequest = [];
                        _.each(peopleList, function (people) {
                            peopleListRequest.push(getDataSource().getPerson(people));
                        });
                        return $q.all(peopleListRequest);
                    },
                    getTaskList: function (taskList) {
                        var that = this,
                            taskListRequest = [];
                        _.each(taskList, function (task) {                        
                            taskListRequest.push(getDataSource().getTask(task));
                        });
                        return $q.all(taskListRequest);
                    },
                    getPoolList: function (poolList) {
                        var that = this,
                            poolListRequest = [];
                        _.each(poolList, function (pool) {
                            poolListRequest.push(getDataSource().getPool(pool));
                        });
                        return $q.all(poolListRequest);
                    },
                    getCompetenceList: function (competenceList) {
                        var that = this,
                            competenceListRequest = [];
                        _.each(competenceList, function (competence) {
                            competenceListRequest.push(getDataSource().getCompetence(competence));
                        });
                        return $q.all(competenceListRequest);
                    },
                    getUserTasks: function (id) {
                        return getDataSource().getUserTasks(id).then(function (data) {
                            var tasks = [];
                            _.each(data, function (task) {
                                var newTask = ModelsService.task(task)
                                Resource.set(newTask);
                                tasks.push(newTask);
                            });
                            return tasks;
                        });
                    },
                    getUserPools: function (id) {
                        return getDataSource().getUserPools(id).then(function (data) {
                            var pools = [];
                            _.each(data, function (pool) {
                                var newPool = ModelsService.pool(pool)
                                Resource.set(newPool);
                                pools.push(newPool);
                            });
                            return pools;
                        });
                    },
                    getUserCompetences: function (id) {
                        return getDataSource().getUserCompetences(id).then(function (data) {
                            var competences = [];
                            _.each(data, function (competence) {
                                competences.push(ModelsService.competence(competence));
                            });
                            return competences;
                        });
                    },
                    getUserPeople: function (id) {
                        return getDataSource().getUserPeople(id).then(function (data) {
                            var people = [];
                            _.each(data, function (peopleItem) {
                                var newPeople = ModelsService.people(peopleItem);
                                Resource.set(newPeople);
                                people.push(newPeople);
                            });
                            return people;
                        });
                    },
                };
            }])
}());