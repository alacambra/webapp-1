(function () {
    'use strict';
    angular.module('frontendPrototypeApp')
        .service('PersistedModelsService', ['$q', 'DataService', 'ModelsService', 'Resource', function ($q, DataService, ModelsService, Resource) {

                var persistedCommonActions = {
                    getResources: function () {
                        var that = this;
                        return $q.all([
                            persistedActions.getTaskList(that.tasks || []),
                            persistedActions.getPoolList(that.pools || []),
                            persistedActions.getPeopleList(that.people || []),
                            persistedActions.getCompetenceList(that.competences || [])
                        ]);
                    },
                    addPeople: function (peopleId) {
                        var that = this;
                        return DataService.addPeopleToTask(that.getId(), peopleId);
                    },
                    addTask: function (taskId) {
                        var that = this;
                        return DataService.addTaskToTask(that.getId(), taskId);
                    },
                    addPool: function (poolId) {
                        var that = this;
                        return DataService.addPoolToTask(that.getId(), poolId);
                    },
                    addCompetence: function (competenceId) {
                        var that = this;
                        return DataService.addCompetenceToTask(that.getId(), competenceId);
                    }
                }, persistedTaskActions = {
                    save: function () {
                        var that = this;
                        if (!this._id)
                            return DataService.createTask(that).then(function (task) {
                                that._id = task[0]._id;
                                Resource.set(that);
                                return that.getId();
                            });
                        else
                            return DataService.updateTask(that.getId(), that);
                    },
                    delete: function () {
                        var that = this;
                        return DataService.deleteTask(that.getId()).then(function() {
                            Resource.unset(that.getId());
                        });
                    }
                }, persistedPeopleActions = {
                    save: function () {
                        var that = this;
                        if (!this._id)
                            return DataService.createPeople(that).then(function (people) {
                                that._id = people[0]._id;
                                Resource.set(that);
                                return that.getId();
                            });
                        else
                            return DataService.updatePeople(that.getId(), that);
                    },
                    delete: function () {
                        var that = this;
                        return DataService.deletePeople(that.getId()).then(function() {
                            Resource.unset(that.getId());
                        });
                    }
                }, persistedPoolActions = {
                    save: function () {
                        var that = this;
                        if (!this._id)
                            return DataService.createPool(that).then(function (pool) {
                                that._id = pool[0]._id;
                                Resource.set(that);
                                return that.getId();
                            });
                        else
                            return DataService.updatePool(that.getId(), that);
                    },
                    delete: function () {
                        var that = this;
                        return DataService.deletePool(that.getId()).then(function() {
                            Resource.unset(that.getId());
                        });
                    }
                }, persistedCompetenceActions = {
                    save: function () {
                        var that = this;
                        if (!this._id)
                            return DataService.createCompetence(that).then(function (competence) {
                                that._id = competence[0]._id;
                                Resource.set(that);
                                return that.getId();
                            });
                        else
                            return DataService.updateCompetence(that.getId(), that);
                    },
                    delete: function () {
                        var that = this;
                        return DataService.deleteCompetence(that.getId()).then(function() {
                            Resource.unset(that.getId());
                        });
                    }
                }, persistedActions = {
                    task: function (attributes) {
                        return _.extend(ModelsService.task(attributes), persistedCommonActions, persistedTaskActions);
                    },
                    people: function (attributes) {
                        return _.extend(ModelsService.people(attributes), persistedCommonActions, persistedPeopleActions);
                    },
                    pool: function (attributes) {
                        return _.extend(ModelsService.pool(attributes), persistedCommonActions, persistedPoolActions);
                    },
                    competence: function (attributes) {
                        return _.extend(ModelsService.competence(attributes), persistedCommonActions, persistedCompetenceActions);
                    },
                    getTask: function (id) {
                        var that = this;
                        return DataService.getTask(id).then(function (task) {
                            var persistedTask = _.extend(task, persistedCommonActions, persistedTaskActions);
                            return persistedTask;
                        });
                    },
                    getPool: function (id) {
                        return DataService.getṔool(id).then(function (pool) {
                            return _.extend(pool, persistedCommonActions, persistedPoolActions);
                        });
                    },
                    getTasks: function () {
                        return DataService.getTasks().then(function (tasks) {
                            var persistedTasks = [];
                            _.each(tasks, function (task) {
                                persistedTasks.push(_.extend(task, persistedCommonActions, persistedTaskActions));
                            });
                            return persistedTasks;
                        });
                    },
                    getTaskList: function (tasks) {
                        return DataService.getTaskList(tasks).then(function (data) {
                            var persistedTasks = [];
                            _.each(data, function (task) {
                                persistedTasks.push(_.extend(task, persistedCommonActions, persistedTaskActions));
                            });
                            return persistedTasks;
                        });
                    },
                    getPoolList: function (pools) {
                        return DataService.getPoolList(pools).then(function (data) {
                            var persistedPools = [];
                            _.each(data, function (pool) {
                                persistedPools.push(_.extend(pool, persistedCommonActions, persistedPoolActions));
                            });
                            return persistedPools;
                        });
                    },
                    getCompetenceList: function (competences) {
                        return DataService.getCompetenceList(competences).then(function (data) {
                            var persistedCompetences = [];
                            _.each(data, function (competence) {
                                persistedCompetences.push(_.extend(competence, persistedCommonActions, persistedCompetenceActions));
                            });
                            return persistedCompetences;
                        });
                    },
                    getPeopleList: function (people) {
                        return DataService.getPeopleList(people).then(function (data) {
                            var persistedPeople = [];
                            _.each(data, function (people) {
                                persistedPeople.push(_.extend(people, persistedCommonActions, persistedPeopleActions));
                            });
                            return persistedPeople;
                        });
                    },
                    getPools: function () {
                        return DataService.getPools().then(function (pools) {
                            var persistedPools = [];
                            _.each(pools, function (pool) {
                                persistedPools.push(_.extend(pool, persistedCommonActions, persistedPoolActions));
                            });
                            return persistedPools;
                        });
                    },
                    getUserTasks: function (id) {
                        return DataService.getUserTasks(id).then(function (tasks) {
                            var persistedTasks = [];
                            _.each(tasks, function (task) {
                                var newTask = _.extend(task, persistedCommonActions, persistedTaskActions);
                                Resource.set(newTask);
                                persistedTasks.push(newTask);
                            });
                            return persistedTasks;
                        });
                    },
                    getUserPools: function (id) {
                        return DataService.getUserPools(id).then(function (pools) {
                            var persistedPools = [];
                            _.each(pools, function (pool) {
                                var newPool = _.extend(pool, persistedCommonActions, persistedPoolActions);
                                Resource.set(newPool);
                                persistedPools.push(newPool);
                            });
                            return persistedPools;
                        });
                    },
                    getUserCompetences: function (id) {
                        return DataService.getUserCompetences(id).then(function (competences) {
                            var persistedCompetences = [];
                            _.each(competences, function (competence) {
                                var newCompetence = _.extend(competence, persistedCommonActions, persistedCompetenceActions);
                                Resource.set(newCompetence);
                                persistedCompetences.push(newCompetence);
                            });
                            return persistedCompetences;
                        });
                    },
                    getUserPeople: function (id) {
                        return DataService.getUserPeople(id).then(function (people) {
                            var persistedPeople = [];
                            _.each(people, function (peopleItem) {
                                var newPeople = ModelsService.people(_.extend(peopleItem, persistedCommonActions, persistedPeopleActions));
                                Resource.set(newPeople);
                                persistedPeople.push(newPeople);
                            });
                            return persistedPeople;
                        });
                    },
                    getUserAllModelsInfo: function (id) {
                        var that = this,
                            q = $q.all([
                                that.getUserTasks(id),
                                that.getUserPools(id),
                                that.getUserPeople(id),
                                that.getUserCompetences(id)
                            ]).then(function (data) {
                            return {
                                tasks: data[0],
                                pools: data[1],
                                people: data[2],
                                competences: data[3]
                            };
                        });
                        return q;
                    }
                };
                return persistedActions;
            }]);
}());