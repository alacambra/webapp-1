(function () {
    'use strict';

    angular.module('poolingpeopleApp')
        .controller('TasksCtrl', ['$scope', '$modal', '$log', 'DataProvider', 'LoadStatusService', '$window', "ModelsService",
            function ($scope, $modal, $log, DataProvider, LoadStatusService, $window, ModelsService) {

                $scope.editingObjects = [];

                $scope.checkedItems = {};

                DataProvider.getTasks().then(function(data){
                    $scope.data = data;
                });

                var doAction = function(items, action) {
                    var toDoChanges = items[0] ? items : [items];
                    for (var i = 0; i < $scope.data.length; i++) {
                        for (var j = 0, jj = toDoChanges.length; j < jj; j++) {
                            if ($scope.data[i].id === toDoChanges[j].id) {
                                action(i);
                            }
                        }
                    }
                };

                var getSelectedItems = function() {
                    var items = [];
                    for (var key in $scope.checkedItems) {
                        if (typeof $scope.checkedItems[key] === "object") items.push($scope.checkedItems[key]);
                    }
                    return items;
                };

                $scope.deleteSelected = function() {
                    $scope.delete(getSelectedItems());
                };

                $scope.delete = function (items) {
                    doAction(items, function (index) {
                        $scope.editingObjects[$scope.data[index].id] = false;
                        $scope.data.splice(index, 1)
                    })
                };

                $scope.editSelected = function() {
                    $scope.edit(getSelectedItems());
                };

                $scope.edit = function(items) {
                    doAction(items, function(index) {
                        var item = {};
                        for (var key in $scope.data[index]) {
                            item[key] = $scope.data[index][key];
                        }
                        $scope.editingObjects[$scope.data[index].id] = item;
                    })
                };

                $scope.revertSelected = function() {
                    $scope.revert(getSelectedItems());
                };

                $scope.revert = function(items) {
                    doAction(items, function(index) {
                        if ($scope.editingObjects[$scope.data[index].id]) {
                            var item = $scope.data[index];
                            for (var key in $scope.editingObjects[$scope.data[index].id]) {
                                item[key] = $scope.editingObjects[$scope.data[index].id][key];
                            }
                            $scope.editingObjects[$scope.data[index].id] = false;
                        }
                    })
                };

                $scope.saveSelected = function() {
                    $scope.save(getSelectedItems());
                };

                $scope.save = function(items) {
                    doAction(items, function(index) {
                        if ($scope.editingObjects[$scope.data[index].id]) {
                            $scope.editingObjects[$scope.data[index].id] = false;
                        }
                    })
                };

                $scope.editing = function(item) {
                    return (typeof $scope.editingObjects[item.id] === "object");
                };

            }]);
}());