(function () {
    'use strict';
    angular.module('frontendPrototypeApp')
        .controller('MainCtrl', ["$scope", "$rootScope", "DataService", "ModelsService", "PersistedModelsService", "Resource",
            function ($scope, $rootScope, DataService, ModelsService, PersistedModelsService, Resource) {
                $scope.menu = {
                    collapsed: false,
                    collapse: function () {
                        this.sections.collapseAll(true);
                        this.collapsed = !this.collapsed;
                    },
                    sections: {
                        collapseAll: function (homeToo) {
                            _.each(_.omit(this, homeToo ? "" : "home"), function (subsection) {
                                subsection.expanded = false;
                            });
                        },
                        home: {
                            expanded: false
                        },
                        tasks: ModelsService.section({
                            subsections: {
                                mine: ModelsService.subsection({
                                    label: "My Tasks"
                                }),
                                requests: ModelsService.subsection({
                                    label: "Requests"
                                }),
                                bookmarked: ModelsService.subsection({
                                    label: "Bookmarked"
                                })
                            }
                        }),
                        people: ModelsService.section({
                            subsections: {
                                mine: ModelsService.subsection({
                                    label: "My Created Users"
                                }),
                                requests: ModelsService.subsection({
                                    label: "Friends"
                                }),
                                bookmarked: ModelsService.subsection({
                                    label: "Suggested"
                                })
                            }
                        }),
                        channel: ModelsService.section({
                            subsections: {
                                requests: ModelsService.subsection({
                                    label: "Latest updates"
                                })
                            }
                        }),
                        competences: ModelsService.section({
                            subsections: {
                                mine: ModelsService.subsection({
                                    label: "My Competences"
                                }),
                                requests: ModelsService.subsection({
                                    label: "Related"
                                }),
                                bookmarked: ModelsService.subsection({
                                    label: "Bookmarked"
                                })
                            }
                        }),
                        pools: ModelsService.section({
                            subsections: {
                                mine: ModelsService.subsection({
                                    label: "My Pools"
                                }),
                                requests: ModelsService.subsection({
                                    label: "Requests"
                                }),
                                bookmarked: ModelsService.subsection({
                                    label: "Bookmarked"
                                })
                            }
                        })
                    }
                }

                $scope.bces = ModelsService.bceCollection();


                $scope.$on("resourceDeleted", function (event, resourceId, resource) {
                    var index = $scope.bces.indexOfResource(resourceId);
                    if (index !== -1) {
                        $scope.bces.remove($scope.bces.get(index));
                    }
                    switch (_.typeOf(resource)) {
                        case "Task":
                            removeTask(resource);
                            break;
                        case "Competence":
                            removeCompetence(resource);
                            break;
                        case "People":
                            removePeople(resource);
                            break;
                        case "Pool":
                            removePool(resource);
                            break;
                    }

                });

                $scope.$on("resourceCreated", function (event, resourceId, resource) {
                    switch (_.typeOf(resource)) {
                        case "Task":
                            addMenuTask(resourceId);
                            break;
                        case "Competence":
                            addMenuCompetence(resourceId);
                            break;
                        case "People":
                            addMenuPeople(resourceId);
                            break;
                        case "Pool":
                            addMenuPool(resourceId);
                            break;
                    }

                });


                $scope.$on("expandBce", function (event, options) {
                    var newBce = ModelsService.bce({resourceId: options.resourceId || options.bce.resourceId});
                    $scope.bces.add(newBce);
                    if (options.callback) {
                        options.callback(newBce);
                    }
                    $("html, body").animate({scrollTop: 0}, {easing: 'easeInOutCirc'});
                })

                $scope.$on("taskDeleted", removeTask);
                $scope.$on("poolDeleted", removePool);
                $scope.$on("peopleDeleted", removePeople);
                $scope.$on("competenceDeleted", removeCompetence);

                $scope.$on("taskCreated", addMenuTask);
                $scope.$on("poolCreated", addMenuPool);
                $scope.$on("peopleCreated", addMenuPeople);
                $scope.$on("competenceCreated", addMenuCompetence);

                var addMenuTask = function (taskId) {
                    $scope.menu.sections.tasks.subsections.mine.add(Resource.get(taskId));
                }, addMenuCompetence = function (competenceId) {
                    $scope.menu.sections.competences.subsections.mine.add(Resource.get(competenceId));
                }, addMenuPeople = function (peopleId) {
                    $scope.menu.sections.people.subsections.mine.add(Resource.get(peopleId));
                }, addMenuPool = function (poolId) {
                    $scope.menu.sections.pools.subsections.mine.add(Resource.get(poolId));
                };

                var removeTask = function (task) {
                    $scope.menu.sections.tasks.remove(task);
                }, removePool = function (pool) {
                    $scope.menu.sections.pools.remove(pool);
                }, removePeople = function (people) {
                    $scope.menu.sections.people.remove(people);
                }, removeCompetence = function (competence) {
                    $scope.menu.sections.competences.remove(competence);
                };

                $scope.addPeople = function (bce, peopleId) {

                    var resourceObject = Resource.get(bce.resourceId);

                    resourceObject.addPeople(peopleId).then(function () {
                        bce.modules.people.resources.addToCollection(peopleId);
                    });

                };
                $scope.addPool = function (bce, poolId) {

                    var resourceObject = Resource.get(bce.resourceId);

                    resourceObject.addPool(poolId).then(function () {
                        bce.modules.pools.resources.addToCollection(poolId);
                    });

                };
                $scope.addTask = function (bce, taskId) {

                    var resourceObject = Resource.get(bce.resourceId);

                    resourceObject.addTask(taskId).then(function () {
                        bce.modules.tasks.resources.addToCollection(taskId);
                    });

                };
                $scope.addCompetence = function (bce, competenceId) {

                    var resourceObject = Resource.get(bce.resourceId);

                    resourceObject.addCompetence(competenceId).then(function () {
                        bce.modules.competences.resources.addToCollection(competenceId);
                    });

                };
                $scope.newPeople = function (peopleId) {
                    if (peopleId) {
                        $scope.bces.add(ModelsService.bce({
                            resourceId: peopleId,
                            icon: "briefcase"
                        }));
                    } else {
                        var newPeople = PersistedModelsService.people({creator: "1"});
                        var newBce = ModelsService.bce({
                            resource: newPeople,
                            icon: "briefcase"
                        }).edit();
                        $scope.bces.add(newBce);
                    }
                    $("html, body").animate({scrollTop: 0}, {easing: 'easeInOutCirc'});
                };
                $scope.newPool = function (poolId) {
                    if (poolId) {
                        $scope.bces.add(ModelsService.bce({
                            resourceId: poolId,
                            icon: "briefcase"
                        }));
                    } else {
                        var newPool = PersistedModelsService.pool({creator: "1"});
                        var newBce = ModelsService.bce({
                            resource: newPool,
                            icon: "briefcase"
                        }).edit();
                        $scope.bces.add(newBce);
                    }
                    $("html, body").animate({scrollTop: 0}, {easing: 'easeInOutCirc'});
                };
                $scope.newTask = function (taskId) {
                    if (taskId) {
                        $scope.bces.add(ModelsService.bce({
                            resourceId: taskId,
                            icon: "list-alt"
                        }));
                    } else {
                        var newTask = PersistedModelsService.task({creator: "1"});
                        var newBce = ModelsService.bce({
                            resource: newTask,
                            icon: "list-alt"
                        }).edit();
                        $scope.bces.add(newBce);
                    }
                    $("html, body").animate({scrollTop: 0}, {easing: 'easeInOutCirc'});
                };
                $scope.newCompetence = function (competenceId) {
                    if (competenceId) {
                        $scope.bces.add(ModelsService.bce({
                            resourceId: competenceId,
                            icon: "briefcase"
                        }));
                    } else {
                        var newCompetence = PersistedModelsService.competence({creator: "1"});
                        var newBce = ModelsService.bce({
                            resource: newCompetence,
                            icon: "briefcase"
                        }).edit();
                        $scope.bces.add(newBce);
                    }
                    $("html, body").animate({scrollTop: 0}, {easing: 'easeInOutCirc'});
                };
                $scope.create = function () {
                    $scope.createBox = true;
                };
                $scope.toggleLogin = function () {
                    $scope.logged = !$scope.logged;
                    $scope.menu.sections.collapseAll();
                    if ($scope.logged) {
                        PersistedModelsService.getUserAllModelsInfo(1).then(function (data) {
                            $scope.menu.sections.tasks.subsections.mine.collection = data.tasks;
                            $scope.menu.sections.pools.subsections.mine.collection = data.pools;
                            $scope.menu.sections.competences.subsections.mine.collection = data.competences;
                            $scope.menu.sections.people.subsections.mine.collection = data.people;
                        });
                    }
                };

            }]);
}());