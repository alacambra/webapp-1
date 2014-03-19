(function () {
    'use strict';

    angular.module('poolingpeopleApp')
        .controller('TasksCtrl', ['$scope', '$modal', '$log', 'DataProvider', 'LoadStatusService', '$window',
            function ($scope, $modal, $log, DataProvider, LoadStatusService, $window) {

                $scope.showSubtasks = {};

                $scope.editingObjects = {};

                $scope.checkedItems = {};


                $scope.taskList = [];

                $scope.pagination = {

                        currentPage: 0,
                        itemsPerPage: 10,
                        totalPages: function() {
                            return parseInt($scope.taskList.length / this.itemsPerPage);
                        },

                        showPaginationIndex: function(n) {
                            //return Math.abs(this.currentPage - n) < 2 || n < 2 || n > this.totalPages - 3;
                            return true;
                        },

                        nextPage: function() {
                            if (this.currentPage < this.totalPages())
                                this.gotoPage(this.currentPage + 1);
                        },

                        prevPage: function() {
                            if (this.currentPage > 0)
                                this.gotoPage(this.currentPage - 1);
                        },

                        gotoPage: function(n) {
                            this.currentPage = n;
                        }

                    }


                var loadTasks = function () {
                    LoadStatusService.setStatus("tasks.taskList", LoadStatusService.RESOLVING);
                    DataProvider.getTasks().then(function (tasks) {
                        $scope.taskList = tasks;
                    }).finally(function() {
                        LoadStatusService.setStatus("tasks.taskList", LoadStatusService.COMPLETED);
                    });
                };

                var loadUsers = function () {
                    DataProvider.getUsers().then(function (users) {
                        $scope.assignableUsers = users;
                    });
                };

                var openTaskModal = function (options) {
                    return $modal.open({
                        templateUrl: 'views/task_modal.tpl.html',
                        controller: 'TaskModalCtrl',
                        scope: $scope,
                        resolve: {
                            options: function () {
                                return options;
                            }
                        }
                    });
                };

                var init = (function() {

                    loadTasks();
                    loadUsers();

                })();

                var doAction = function(items, action) {
                    var toDoChanges = items[0] ? items : [items];
                    for (var i = 0; i < $scope.taskList.length; i++) {
                        for (var j = 0, jj = toDoChanges.length; j < jj; j++) {
                            if ($scope.taskList[i].id === toDoChanges[j].id) {
                                action($scope.taskList[i], i);
                            }
                        }
                    }
                };

                $scope.getSelectedItems = function() {
                    var items = [];
                    for (var key in $scope.checkedItems) {
                        if (typeof $scope.checkedItems[key] === "object") items.push($scope.checkedItems[key]);
                    }
                    return items;
                };

                $scope.create = function () {
                    var modalInstance = openTaskModal({
                        title: 'Neue Aufgabe',
                        task: factory.task()
                    });
                };

                $scope.update = function(items) {
                    doAction(items, function(item) {
                        var sourceProject = item.project;
                        DataProvider.updateTask(item.id, item).then(function (response) {
                            DataProvider.assignTaskToUser(item.id, item.assignee.id).then(function (response) {
                                if (!_.isNull(item.project)) {
                                    if (_.isNull(sourceProject)) {
                                        DataProvider.addTaskToProject(item.id, item.project.id).then(function (response) {
                                            if ($modalInstance) 
                                                $modalInstance.close();
                                        }, function (response) {
                                            $scope.error = 'Couldn\'t add project to task: ' + response;
                                        });
                                    } else {
                                        DataProvider.moveTaskFromProjectToProject(item.id, sourceProject.id, item.project.id).then(function (response) {
                                            if ($modalInstance)
                                                $modalInstance.close();
                                        }, function (response) {
                                            $scope.error = 'Couldn\'t move task to another project: ' + response;
                                        });
                                    }
                                } else {
                                    $modalInstance.close();
                                }

                            }, function (response) {
                                $scope.error = 'Couldn\'t add user to task: ' + response;
                            });
                        }, function (response) {
                            $scope.error = 'Couldn\'t save task: ' + response;
                        });
                    });
                }

                $scope.edit = function(items) {
                    doAction(items, function(item) {
                        var modalInstance = openTaskModal({
                            title: 'Aufgabe "' + item.title + '" bearbeiten',
                            task: item
                        });
                    })
                };

                $scope.delete = function (items) {
                    doAction(items, function (item, index) {
                        var modalInstance = $modal.open({
                            templateUrl: 'views/confirm_modal.tpl.html',
                            controller: 'ConfirmModalCtrl',
                            resolve: {
                                message: function() {
                                    return "Soll die Aufgabe '" + item.title + "' wirklich gelöscht werden?";
                                }
                            }
                        });

                        modalInstance.result.then(function () {
                            LoadStatusService.setStatus("tasks.taskList.task." + item.id, LoadStatusService.RESOLVING); 
                            DataProvider.deleteTask(item.id).then(function (response) {
                                $scope.editingObjects[item.id] = false;
                                $scope.taskList.splice(index, 1)
                            }, function (response) {
                                $log.error(response);
                            }).finally(function() {
                                LoadStatusService.setStatus("tasks.taskList.task." + item.id, LoadStatusService.COMPLETED); 
                            });
                        });
                    })
                };

                $scope.bookEffort = function(items) {
                    doAction(items, function(item) {
                        var targetTask = item;
                        var modalInstance = $modal.open({
                            templateUrl: 'views/effort_modal.tpl.html',
                            controller: 'EffortModalCtrl',
                            scope: $scope,
                            resolve: {
                                options: function () {
                                    return {
                                        title: 'Neuer Aufwand für Aufgabe "' + targetTask.title + '"',
                                        task: targetTask
                                    }
                                }
                            }
                        })
                    })
                };

                $scope.assignUserToTask = function (task) {
                    LoadStatusService.setStatus("tasks.taskList.task." + task.id, LoadStatusService.RESOLVING); 
                    DataProvider.assignTaskToUser(task.id, task.assignee.id).finally(function() {
                        LoadStatusService.setStatus("tasks.taskList.task." + task.id, LoadStatusService.COMPLETED); 
                    });
                };

                $scope.isChecked = function(item) {
                    return ($scope.checkedItems[item.id] ? true : false)
                }

                $scope.deleteSelected = function() {
                    $scope.delete($scope.getSelectedItems());
                };

                $scope.editSelected = function() {
                    $scope.edit($scope.getSelectedItems());
                };

                $scope.bookSelected = function() {
                    $scope.bookEffort($scope.getSelectedItems());
                };

                $scope.editField = function(item, field) {
                    $scope.editingObjects[item.id + "." + field] = item;
                }

                $scope.blurField = function(item, field) {
                    $scope.editingObjects[item.id + "." + field] = false;
                }

                $scope.blurDatepickers = function() {
                    angular.forEach($scope.editingObjects, function(item, key) {
                        if (key.lastIndexOf('.startDate') == key.length - '.startDate'.length ||
                            key.lastIndexOf('.endDate') == key.length - '.endDate'.length) {
                            $scope.editingObjects[key] = false;
                        }
                    })
                }

                $scope.editingField = function(item, field) {
                    return (typeof $scope.editingObjects[item.id + "." + field] === "object");
                };

                $scope.toggleSubtasks = function(task) {
                    $scope.showSubtasks[task.id] = $scope.showSubtasks[task.id] ? !$scope.showSubtasks[task.id] : true;
                }

                $scope.hasSubtasks = function (task) {
                    return (task.subtasks && task.subtasks.length > 0);
                }

                $scope.checkItem = function(item, event, ignoreTarget) {
                    if (event.target == event.currentTarget || ignoreTarget) {
                        if (!event.ctrlKey) {
                            if ($scope.getSelectedItems().length > 1)
                                $scope.checkedItems[item.id] = item;
                            else
                                $scope.checkedItems[item.id] = $scope.checkedItems[item.id] ? false : item;
                                angular.forEach($scope.checkedItems, function (value, key) {
                                    if (key != item.id) {
                                        $scope.checkedItems[key] = false;
                                    }
                                });
                        } else {
                            $scope.checkedItems[item.id] = $scope.checkedItems[item.id] ? false : item;
                        }
                    }

                }

            }]);
}());