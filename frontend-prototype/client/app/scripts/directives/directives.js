(function () {
    'use strict';
    angular.module('frontendPrototypeApp')
        .directive("ngDraggable", ["$rootScope", function ($rootScope) {
                return {
                    restrict: "A",
                    link: function (scope, elem, attrs) {


                        elem.draggable({
                            start: function (event, ui) {
                                elem.data("resource", scope.item.getId());
                                elem.css({opacity: 0.7});
                            },
                            stop: function (event, ui) {
                                elem.css({opacity: 1});
                            },
                            helper: function () {
                                switch ($(elem).attr("ng-draggable")) {
                                    case "person":
                                        return $("<span>").addClass("glyphicon glyphicon-user");
                                        break;
                                    case "pool":
                                        return $("<span>").addClass("glyphicon glyphicon-folder-close");
                                        break;
                                    case "task":
                                        return $("<span>").addClass("glyphicon glyphicon-list-alt");
                                        break;
                                    case "competence":
                                        return $("<span>").addClass("glyphicon glyphicon-briefcase");
                                        break;
                                    case "bce":
                                        return $("<span>").addClass("glyphicon glyphicon-th");
                                        break;
                                }
                            },
                            cursor: "move",
                            cursorAt: {left: 0, top: 0}
                        });
                        $rootScope.$broadcast("newDraggableElement", elem);
                    }
                };
            }])
        .directive("ngDroppable", ["$rootScope", function ($rootScope) {
                return {
                    restrict: "A",
                    link: function (scope, elem, attrs) {
                        var $draggableElements = $("[ng-draggable]"),
                            bce = scope.bce;

                        elem.droppable({
                            hoverClass: "bce-droppable",
                            greedy: true,
                            accept: function () {
                                /* 
                                 * A function is used here instead of a variable to avoid 
                                 * internal jQuery clone of the collection. Calling the
                                 * jQuery selector every time is also an option, but slower.
                                 * 
                                 * Logic for choosing if element is valid or not goes here,
                                 * best practice would be using an external service.
                                 * 
                                 */
                                return scope.bce.resourceId ? $draggableElements : false;
                            },
                            drop: function (event, ui) {
                                scope.$apply(function () {
                                    var resource = ui.draggable.data("resource");
                                    if (resource !== scope.bce.resourceId) {
                                        switch ($(ui.draggable).attr("ng-draggable")) {
                                            case "person":
                                                scope.addPeople(bce, resource);
                                                break;
                                            case "pool":
                                                scope.addPool(bce, resource);
                                                break;
                                            case "task":
                                                scope.addTask(bce, resource);
                                                break;
                                            case "competence":
                                                scope.addCompetence(bce, resource);
                                                break;
                                        }
                                    }
                                });
                            }
                        });
                    }
                };
            }])
        .directive('ngEnter', function () {
            return function ($scope, $elem, $attrs) {
                $elem.bind("keydown keypress", function (event) {
                    if (event.which === 13 && $elem.is(':focus')) {
                        $scope.$apply(function () {
                            $scope.$eval($attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            };
        });
}());