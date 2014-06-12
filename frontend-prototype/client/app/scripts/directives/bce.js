(function () {
    'use strict';
    angular.module('frontendPrototypeApp')
        .directive("bce", ["RecursionHelper", "ModelsService", 'Resource', function (RecursionHelper, ModelsService, Resource) {
                return {
                    restrict: "E",
                    priority: 1,
                    templateUrl: 'views/bce.tpl.html',
                    replace: true,
                    scope: {
                        bceObject: "=resource",
                    },
                    compile: function (element) {
                        return RecursionHelper.compile(element);
                    },
                    controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                            $scope.bce = $scope.bceObject;
                            var hideRules = {
                                "LL": {
                                    "bce-header": true,
                                    "bce-title": true,
                                    "bce-icon": true,
                                    "bce-body": true,
                                    "bce-left": true,
                                    "bce-description": true,
                                    "bce-expanded-view": true,
                                    "bce-right": true,
                                    "bce-modules": true,
                                    "bce-footer": true
                                },
                                "MM": {
                                    "bce-header": true,
                                    "bce-title": true,
                                    "bce-icon": true,
                                    "bce-body": true,
                                    "bce-left": true,
                                    "bce-description": true,
                                    "bce-footer": true
                                },
                                "MS": {
                                    "bce-header": true,
                                    "bce-title": true,
                                    "bce-icon": true,
                                    "bce-body": true,
                                    "bce-left": true,
                                    "bce-description": true
                                },
                                "SS": {
                                    "bce-header": true,
                                    "bce-icon": true,
                                    "bce-title": true
                                }
                            },
                            icons = {
                                "Task": "list-alt",
                                "Pool": "folder-open",
                                "People": "user",
                                "Competence": "briefcase"
                            },
                            size = $scope.bce.size;
                            
                            $scope.resource = $scope.bce.resourceId ? Resource.get($scope.bce.resourceId) : $scope.bce.resource;
                            $scope.resource.getResources();
                            $scope.bce.icon = icons[_.typeOf($scope.resource)] || $scope.bce.icon;

                            var addResourcesToModuleCollection = function (module, resources) {
                                _.each(resources, function (resource) {
                                    module.resources.addToCollection(resource);
                                })
                            }

                            addResourcesToModuleCollection($scope.bce.modules.people, $scope.resource.people)

//                        Uncomment in case of live-updated size
//                        
//                        $scope.$watch(function () {
//                            size = $scope.size();
//                        });

                            $scope.$on("resourceDeleted", function (event, resourceId, resource) {
                                var index = $scope.bce.subBces.indexOfResource(resourceId);
                                if (index !== -1) {
                                    $scope.bce.subBces.remove($scope.bce.subBces.get(index));
                                }

                                switch (_.typeOf(resource)) {
                                    case "Task":
                                        var index = $scope.bce.modules.tasks.resources.indexOf(resourceId);
                                        if (index !== -1)
                                            $scope.bce.modules.tasks.resources.remove($scope.bce.modules.tasks.resources.get(index));
                                        break;
                                    case "Competence":
                                        var index = $scope.bce.modules.competences.resources.indexOf(resourceId);
                                        if (index !== -1)
                                            $scope.bce.modules.competences.resources.remove($scope.bce.modules.competences.resources.get(index));
                                        break;
                                    case "People":
                                        var index = $scope.bce.modules.people.resources.indexOf(resourceId);
                                        if (index !== -1)
                                            $scope.bce.modules.people.resources.remove($scope.bce.modules.people.resources.get(index));
                                        break;
                                    case "Pool":
                                        var index = $scope.bce.modules.pools.resources.indexOf(resourceId);
                                        if (index !== -1)
                                            $scope.bce.modules.pools.resources.remove($scope.bce.modules.pools.resources.get(index));
                                        break;
                                }

                            });

                            $scope.expandBce = function (bce) {
                                $scope.$emit("expandBce", bce);
                            }

                            $scope.expandModule = function (module) {
                                _.each(module.resources.toArray(), function (resource) {
                                    $scope.bce.addSubBce(ModelsService.bce({
                                        resourceId: resource,
                                        size: 'MM'
                                    }).context({subBce: true}));
                                });
                                $scope.bce.expanded = true;
                            };

                            $scope.save = function () {
                                $scope.resource.save().then(function (resourceId) {
                                    if (resourceId) {
                                        $scope.bce.resourceId = resourceId
                                        $rootScope.$broadcast("resourceCreated", $scope.bce.resourceId, $scope.resource);
                                    }
                                    $scope.bce.unedit();
                                })

                            };

                            $scope.edit = function (event) {
                                if ($scope.bce.getContext().subBce !== true) {
                                    $scope.bce.edit();
                                } else {
                                    event.stopPropagation();
                                    $scope.$emit("expandBce", {
                                        bce: $scope.bce,
                                        callback: function (newBce) {
                                            newBce.edit();
                                        }
                                    });
                                }
                            };

                            $scope.remove = function (event) {
                                event.stopPropagation();
                                $scope.resource.delete().then(function () {
                                    $rootScope.$broadcast("resourceDeleted", $scope.bce.resourceId, $scope.resource);
                                })
                            }


                            /*
                             * Function that resolves if a block bust be shown or not taking
                             * as rules the previously declared hideRules variable. In case
                             * of not founding a rule, will return FALSE (hidden).
                             * 
                             * TODO: 
                             *  - Make restriction so that smaller BCEs can only allocate
                             *    properties that parents have. Now it's done by hand
                             *  - Auto resolve for parents. Example: bce-header contains
                             *    bce-title. If only bce-title is declared as visible, 
                             *    bce-header will also resolve true, since is a parent of
                             *    the title and title will never be visible if header is not
                             * 
                             * @param {type} block Name of the block to resolve. As convenction 
                             *               will be bce-BLOCKNAME
                             * @returns {Boolean}
                             * 
                             */

                            $scope.isShowed = function (block) {
                                if (_.isUndefined(hideRules[size]))
                                    return false;
                                return _.isUndefined(hideRules[size][block]) ? false : hideRules[size][block];
                            }

                        }]
                };
            }])
}());