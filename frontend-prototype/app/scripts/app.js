(function () {
    'use strict';
    angular.module('frontendPrototypeApp', [
        'ngCookies',
        'ngAnimate'
    ]).constant("typeNames", {
        ELEMENT: "Element",
        CONTEXT: "Context"
    }).directive("ngDraggable", ["$rootScope", function ($rootScope) {
            return {
                restrict: "A",
                link: function (scope, elem, attrs) {


                    elem.draggable({
                        start: function (event, ui) {
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
                            }
                        },
                        cursor: "move",
                        cursorAt: {left: 0, top: 0}
                    });
                    $rootScope.$broadcast("newDraggableElement", elem);
                }
            };
        }]).directive("ngDroppable", ["$rootScope", function ($rootScope) {
            return {
                restrict: "A",
                link: function (scope, elem, attrs) {

                    var $draggableElements = $("[ng-draggable]");
                    $rootScope.$on("newDraggableElement", function (event, newDraggableElement) {
                        $draggableElements = $draggableElements.add(newDraggableElement);
                    });
                    elem.droppable({
                        hoverClass: "bce-droppable",
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
                            return $draggableElements;
                        },
                        drop: function (event, ui) {
                            scope.$apply(function () {
                                switch ($(ui.draggable).attr("ng-draggable")) {
                                    case "person":
                                        scope.addPeople(scope.bce);
                                        break;
                                    case "pool":
                                        scope.addPool(scope.bce);
                                        break;
                                    case "task":
                                        scope.addTask(scope.bce);
                                        break;
                                    case "competence":
                                        scope.addCompetence(scope.bce);
                                        break;
                                }
                            });
                        }
                    });
                }
            };
        }]).directive("bce", ["RecursionHelper", function (RecursionHelper) {
            return {
                restrict: "E",
                priority: 1,
                templateUrl: 'views/bce.tpl.html',
                scope: {
                    size: '&',
                    resource: '='
                },
                controller: ['$scope', function ($scope) {
                    var resource = $scope.resource,
                        size = $scope.size(),
                        hideRules = {
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
                            "SS": {
                                "bce-header": true,
                                "bce-icon": true,
                                "bce-title": true
                            }
                        };
                    $scope.$watch(function () {

                        size = $scope.size();
                    })

                    $scope.expandModule = function (bce) {
                        if ($scope.bce.expandedView.bces.indexOf(bce) === -1)
                            $scope.bce.expandedView.bces.push(bce);
                        $scope.bce.expanded = true;
                    }


                    $scope.bce = resource // transform into bce object


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

                }],
                replace: true,
                compile: function (element) {
                    return RecursionHelper.compile(element, function ($scope) {
                    });
                }
            };
        }]).filter('highlight', function () {
        var findAll = function (text, search) {

            var matches = [];
            var find = function (text, key) {
                var helperString = text.toLowerCase(),
                    keyHelper = key.toLowerCase(),
                    matches = [],
                    lastMatch = helperString.indexOf(keyHelper);
                while (lastMatch !== -1) {

                    matches.push([lastMatch - helperString.length + text.length, key.length]);
                    helperString = helperString.substring(lastMatch + key.length);
                    lastMatch = helperString.indexOf(keyHelper);
                }

                return matches;
            };
            var getUnion = function (items) {
                var unionHelper = [], union = [];
                for (var i = 0, ii = items.length; i < ii; i++) {
                    for (var j = 0, jj = items[i][1]; j < jj; j++) {
                        unionHelper[items[i][0] + j] = true;
                    }
                }

                var firstIndex = -1, length = 0;
                for (var i = 0, ii = unionHelper.length + 1; i < ii; i++) {
                    if (unionHelper[i]) {
                        if (firstIndex === -1) {
                            firstIndex = i;
                        }
                        length++;
                    } else {
                        if (firstIndex !== -1) {
                            union.push([firstIndex, length]);
                            firstIndex = -1;
                            length = 0;
                        }
                    }
                }

                return union;
            };
            var searchArray = search ? search.split(" ") : [];
            for (var i = 0, ii = searchArray.length; i < ii; i++) {
                if (searchArray[i] !== "") {
                    var caseMatches = find(text, searchArray[i]);
                    for (var j = 0, jj = caseMatches.length; j < jj; j++) {
                        matches.push(caseMatches[j]);
                    }
                }
            }

            return getUnion(matches.sort(function (a, b) {
                return a[0] - b[0];
            }));
        };
        var wrapWithTag = function (text, tag, substrs) {
            var textHelper = text;
            var offset = 0;
            for (var i = 0, ii = substrs.length; i < ii; i++) {
                textHelper = textHelper.substr(0, substrs[i][0] + offset) + "<" + tag + " class='search-match'>" + textHelper.substr(substrs[i][0] + offset, substrs[i][1]) + "</" + tag + ">" + textHelper.substr(substrs[i][0] + offset + substrs[i][1]);
                offset = offset + 30 + tag.length;
            }
            return textHelper;
        };
        return function (text, search) {
            return wrapWithTag(text, "span", findAll(text, search));
        };
    }).filter('softFilter', function () {
        return function (items, search) {
            var filtered = [];
            angular.forEach(items, function (item) {
                var searchKeys = (search || "").split(" ") || [];
                var wordsFound = 0;
                angular.forEach(searchKeys, function (key) {
                    if ((item.title || "").toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                        wordsFound = wordsFound + 1;
                    }

                });
                if (wordsFound === searchKeys.length) {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    }).filter('madeBy', function () {
        return function (items, user) {
            if (!user || !(user.length > 0))
                return items;
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.creator === user)
                    filtered.push(item);
            });
            return filtered;
        };
    }).filter('range', function () {
        return function (input, total) {
            total = parseInt(total, 10);
            for (var i = 0; i < total; i++)
                input.push(i);
            return input;
        };
    }).run(function () {

        String.prototype.capitalize = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        _.mixin({
            typeOf: function (obj) {
                if (obj === null) {
                    return "null";
                }
                var t = typeof obj;
                switch (t) {
                    case "function":
                    case "object":
                        if (obj.constructor) {
                            if (obj.typeName) {
                                return obj.typeName;
                            } else if (obj.constructor.name) {
                                return obj.constructor.name;
                            } else {
                                var match = obj.constructor.toString().match(/^function (.+)\(.*$/);
                                if (match) {
                                    return match[1];
                                }
                            }
                        }
                        return Object.prototype.toString.call(obj).match(/^\[object (.+)\]$/)[1];
                    default:
                        return t.capitalize();
                }
            }
        });
    }).factory('RecursionHelper', ['$compile', function ($compile) {
            return {
                /**
                 * Manually compiles the element, fixing the recursion loop.
                 * @param element
                 * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
                 * @returns An object containing the linking functions.
                 */
                compile: function (element, link) {
// Normalize the link parameter
                    if (angular.isFunction(link)) {
                        link = {post: link};
                    }

// Break the recursion loop by removing the contents
                    var contents = element.contents().remove();
                    var compiledContents;
                    return {
                        pre: (link && link.pre) ? link.pre : null,
                        /**
                         * Compiles and re-adds the contents
                         */
                        post: function (scope, element) {
                            // Compile the contents
                            if (!compiledContents) {
                                compiledContents = $compile(contents);
                            }
                            // Re-add the compiled contents to the element
                            compiledContents(scope, function (clone) {
                                element.append(clone);
                            });
                            // Call the post-linking function, if any
                            if (link && link.post) {
                                link.post.apply(null, arguments);
                            }
                        }
                    };
                }
            };
        }])
        .service('ModelsService', ["typeNames", function (typeNames) {

                var context = stampit()
                    .state({
                        typeName: typeNames.CONTEXT
                    });
                var element = stampit()
                    .enclose(function (contextInstance) {

                        var localContext = contextInstance || this.localContext || context();
                        this.getContext = function () {
                            return this.localContext || context();
                        };
                        /*
                         * setContext: sets the context for an element
                         * 
                         * @param {type} options Default context attributes of the class.
                         * @param {type} contextInstance Inline attributes given
                         * @returns {element} Return the element itself to allow method concatenation
                         */

                        this.setContext = function (options, contextInstance) {
                            this.localContext = context(_.extend(options, contextInstance || {}));
                            return this;
                        }

                        /*
                         * this.context() is this.setContext() alias
                         */

                        this.context = function (options, contextInstance) {
                            return this.setContext(options, contextInstance);
                        }

                    })
                    .state({
                        typeName: typeNames.ELEMENT
                    })
                    .methods({});
                var bce = stampit.compose(element)
                    .enclose(function (contextInstance) {
                        this.setContext(contextInstance);
                    })
                    .state({
                        title: "Untitled 1",
                        description: "",
                        place: "",
                        timestamp: new Date(),
                        creator: null,
                        people: 0,
                        pools: 0,
                        tasks: 0,
                        competences: 0,
                        size: "LL"
                    })
                    .methods();
                var section = stampit.compose(element)
                    .enclose(function (contextInstance) {
                        this.setContext(contextInstance);
                    })
                    .state({
                        expanded: false,
                        subsections: {}
                    })
                    .methods({
                        count: function () {
                            var count = 0;
                            _.each(this.subsections, function (subsection) {
                                count = count + subsection.collection.length;
                            });
                            return count;
                        },
                        expand: function () {
                            this.expanded = true;
                        },
                        contract: function () {
                            this.expanded = false;
                        },
                        toggle: function () {
                            this.expanded = !this.expanded;
                        }
                    });
                var subsection = stampit.compose(section)
                    .enclose(function (contextInstance) {
                        this.setContext(contextInstance);
                    })
                    .state({
                        label: "Subsection",
                        expanded: false,
                        collection: []
                    })
                    .methods({
                        expand: function () {
                            this.expanded = true;
                        },
                        contract: function () {
                            this.expanded = false;
                        },
                        toggle: function () {
                            this.expanded = !this.expanded;
                        }
                    });
                var task = stampit.compose(element)
                    .enclose()
                    .state({
                        title: "",
                        description: "",
                        timestamp: new Date(),
                        place: "",
                        creator: null,
                        people: [],
                        tasks: [],
                        pools: [],
                        competences: []
                    })
                    .methods();
                var pool = stampit.compose(element)
                    .enclose()
                    .state({
                        title: "",
                        description: "",
                        timestamp: new Date(),
                        place: "",
                        creator: null,
                        people: [],
                        tasks: [],
                        pools: [],
                        competences: []
                    })
                    .methods();
                var people = stampit.compose(element)
                    .enclose()
                    .state({
                        title: "",
                        description: "",
                        timestamp: new Date(),
                        place: "",
                        creator: null,
                        people: [],
                        tasks: [],
                        pools: [],
                        competences: []
                    })
                    .methods();
                var competence = stampit.compose(element)
                    .enclose()
                    .state({
                        title: "",
                        description: "",
                        timestamp: new Date(),
                        place: "",
                        creator: null,
                        people: [],
                        tasks: [],
                        pools: [],
                        competences: []
                    })
                    .methods();
                return {
                    bce: bce,
                    task: task,
                    people: people,
                    competence: competence,
                    pool: pool,
                    section: section,
                    subsection: subsection
                };
            }])
        .controller('MainCtrl', ["$scope", "ModelsService", function ($scope, ModelsService) {

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
                            count: 20,
                            subsections: {
                                mine: ModelsService.subsection({
                                    label: "My Tasks",
                                    collection: [
                                        ModelsService.task({
                                            title: "Lorem",
                                            description: "Lorem ipsum dolor sit amet.",
                                            timestamp: new Date(),
                                            place: "Frankfurt",
                                            creator: "Jacob",
                                            people: [{}, {}, {}],
                                            tasks: [{}, {}, {}],
                                            pools: [{}, {}, {}, {}, {}, {}],
                                            competences: [{}]
                                        }),
                                        ModelsService.task({
                                            title: "Ipsum",
                                            description: "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                            timestamp: new Date(),
                                            place: "Darmstadt",
                                            creator: "Albert",
                                            people: [{}],
                                            tasks: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                                            pools: [{}],
                                            competences: [{}, {}, {}, {}]
                                        })
                                    ]
                                }),
                                requests: ModelsService.subsection({
                                    label: "Requests",
                                    collection: [
                                        ModelsService.task({
                                            title: "Ipsum",
                                            description: "Ipsum amet sit lorem dolor."
                                        })
                                    ]
                                }),
                                bookmarked: ModelsService.subsection({
                                    label: "Bookmarked"
                                })
                            }
                        }),
                        people: ModelsService.section({
                            count: 20,
                            subsections: {
                                requests: ModelsService.subsection({
                                    label: "Friends",
                                    collection: [
                                        ModelsService.task({
                                            title: "Petersen",
                                            description: "",
                                            timestamp: new Date(),
                                            place: "Frankfurt",
                                            creator: "Jacob",
                                            people: [{}, {}, {}],
                                            tasks: [{}, {}, {}],
                                            pools: [{}, {}, {}, {}, {}, {}],
                                            competences: [{}]
                                        }),
                                        ModelsService.task({
                                            title: "Conrad",
                                            description: "",
                                            timestamp: new Date(),
                                            place: "Frankfurt",
                                            creator: "Jacob",
                                            people: [{}, {}, {}],
                                            tasks: [{}, {}, {}],
                                            pools: [{}, {}, {}, {}, {}, {}],
                                            competences: [{}]
                                        })
                                    ]
                                }),
                                bookmarked: ModelsService.subsection({
                                    label: "Suggested",
                                    collection: [
                                        ModelsService.task({
                                            title: "Dave",
                                            description: "",
                                            timestamp: new Date(),
                                            place: "Frankfurt",
                                            creator: "Jacob",
                                            people: [{}, {}, {}],
                                            tasks: [{}, {}, {}],
                                            pools: [{}, {}, {}, {}, {}, {}],
                                            competences: [{}]
                                        }),
                                        ModelsService.task({
                                            title: "Reynolds",
                                            description: "",
                                            timestamp: new Date(),
                                            place: "Frankfurt",
                                            creator: "Jacob",
                                            people: [{}, {}, {}],
                                            tasks: [{}, {}, {}],
                                            pools: [{}, {}, {}, {}, {}, {}],
                                            competences: [{}]
                                        })
                                    ]
                                })
                            }
                        }),
                        channel: ModelsService.section({
                            count: 20,
                            subsections: {
                                requests: ModelsService.subsection({
                                    label: "Latest updates",
                                    collection: [
                                        ModelsService.task({
                                            title: "Friendship request",
                                            description: "Eduardo wants to add you"
                                        }),
                                        ModelsService.task({
                                            title: "Welcome",
                                            description: "You just singed up"
                                        })
                                    ]
                                })
                            }
                        }),
                        competences: ModelsService.section({
                            count: 20,
                            subsections: {
                                mine: ModelsService.subsection({
                                    label: "My Competences",
                                    collection: [
                                        ModelsService.task({
                                            title: "After Effects",
                                            description: "",
                                            timestamp: new Date(),
                                            place: "Frankfurt",
                                            creator: "Jacob",
                                            people: [{}, {}, {}],
                                            tasks: [{}, {}, {}],
                                            pools: [{}, {}, {}, {}, {}, {}],
                                            competences: [{}]
                                        }),
                                        ModelsService.task({
                                            title: "Photoshop",
                                            description: "",
                                            timestamp: new Date(),
                                            place: "Frankfurt",
                                            creator: "Jacob",
                                            people: [{}, {}, {}],
                                            tasks: [{}, {}, {}],
                                            pools: [{}, {}, {}, {}, {}, {}],
                                            competences: [{}]
                                        }),
                                        ModelsService.task({
                                            title: "Corel Draw",
                                            description: "",
                                            timestamp: new Date(),
                                            place: "Frankfurt",
                                            creator: "Jacob",
                                            people: [{}, {}, {}],
                                            tasks: [{}, {}, {}],
                                            pools: [{}, {}, {}, {}, {}, {}],
                                            competences: [{}]
                                        }),
                                    ]
                                }),
                                requests: ModelsService.subsection({
                                    label: "Related",
                                    collection: [
                                        ModelsService.task({
                                            title: "Adobe Premiere",
                                        }),
                                        ModelsService.task({
                                            title: "Sony Vegas",
                                        })
                                    ]
                                }),
                                bookmarked: ModelsService.subsection({
                                    label: "Bookmarked"
                                })
                            }
                        }),
                        pools: ModelsService.section({
                            count: 20,
                            subsections: {
                                mine: ModelsService.subsection({
                                    label: "My Pools",
                                    collection: [
                                        ModelsService.task({
                                            title: "Lorem",
                                            description: "Lorem ipsum dolor sit amet.",
                                            timestamp: new Date(),
                                            place: "Frankfurt",
                                            creator: "Jacob",
                                            people: [{}, {}, {}],
                                            tasks: [{}, {}, {}],
                                            pools: [{}, {}, {}, {}, {}, {}],
                                            competences: [{}]
                                        }),
                                        ModelsService.task({
                                            title: "Ipsum",
                                            description: "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                            timestamp: new Date(),
                                            place: "Darmstadt",
                                            creator: "Albert",
                                            people: [{}],
                                            tasks: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                                            pools: [{}],
                                            competences: [{}, {}, {}, {}]
                                        })
                                    ]
                                }),
                                requests: ModelsService.subsection({
                                    label: "Requests",
                                    collection: [
                                        ModelsService.task({
                                            title: "Ipsum",
                                            description: "Ipsum amet sit lorem dolor."
                                        })
                                    ]
                                }),
                                bookmarked: ModelsService.subsection({
                                    label: "Bookmarked"
                                })
                            }
                        })
                    }
                }
                $scope.bces = [
                    ModelsService.bce({
                        "id": Math.random() * 10000,
                        "icon": "briefcase",
                        "title": "Davenport Petersen",
                        "description": "Ex culpa magna deserunt duis quis et. Officia consequat esse ut consectetur eiusmod incididunt quis Lorem quis deserunt magna officia. Cupidatat laboris non incididunt ullamco aute tempor reprehenderit culpa consequat proident velit enim exercitation anim. Culpa incididunt laborum proident minim ad velit culpa sunt occaecat. Adipisicing anim esse tempor pariatur labore in ea nulla deserunt laboris enim sint consectetur enim.\r\n",
                        "modules": {
                            "people": {
                                "label": "People",
                                "resource": {
                                    "icon": "user",
                                    "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                    "title": "People"
                                }
                            },
                            "pools": {
                                "label": "People",
                                "resource": {
                                    "icon": "folder-close",
                                    "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                    "title": "Pool"
                                }
                            },
                            "tasks": {
                                "label": "People",
                                "resource": {
                                    "icon": "list-alt",
                                    "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                    "title": "Tasks"
                                }
                            },
                            "competences": {
                                "label": "People",
                                "resource": {
                                    "icon": "briefcase",
                                    "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                    "title": "Competences"
                                }
                            }
                        },
                        expandedView: {
                            bces: [
                                ModelsService.bce({
                                    "id": Math.random() * 10000,
                                    "title": "Everett Valencia",
                                    "icon": "user",
                                    "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                    modules: {
                                        "people": {
                                            "label": "People",
                                            "resource": {
                                                "icon": "user",
                                                "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                                "title": "People"
                                            }
                                        },
                                        "pools": {
                                            "label": "People",
                                            "resource": {
                                                "icon": "folder-close",
                                                "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                                "title": "Pool"
                                            }
                                        },
                                        "tasks": {
                                            "label": "People",
                                            "resource": {
                                                "icon": "list-alt",
                                                "title": "Tasks",
                                                "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                            }
                                        },
                                        "competences": {
                                            "label": "People",
                                            "resource": {
                                                "icon": "briefcase",
                                                "title": "Competences",
                                                "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                            }
                                        }
                                    },
                                    "creator": "Eduardo Paez",
                                    "timestamp": 2,
                                    "size": "MM"
                                })
                            ]
                        },
                        "creator": "Arne Cornelius",
                        "timestamp": 1,
                        "size": "LL"
                    }),
                    ModelsService.bce({
                        "id": Math.random() * 10000,
                        "title": "Everett Valencia",
                        "icon": "briefcase",
                        "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                        modules: {
                            "people": {
                                "label": "People",
                                "resource": {
                                    "icon": "user",
                                    "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                    "title": "People"
                                }
                            },
                            "pools": {
                                "label": "People",
                                "resource": {
                                    "icon": "briefcase",
                                    "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                    "title": "Pool"
                                }
                            },
                            "tasks": {
                                "label": "People",
                                "resource": {
                                    "icon": "list-alt",
                                    "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                    "title": "Tasks"
                                }
                            },
                            "competences": {
                                "label": "People",
                                "resource": {
                                    "icon": "briefcase",
                                    "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                                    "title": "Competences"
                                }
                            }
                        },
                        expandedView: {
                            bces: []
                        },
                        "creator": "Eduardo Paez",
                        "timestamp": 2,
                        "size": "LL",
                        "expanded": false


                    }),
                    ModelsService.bce({
                        "id": Math.random() * 10000,
                        "title": "Everett Valencia",
                        "icon": "list-alt",
                        "description": "Eiusmod ex nisi labore esse irure laborum consectetur ad voluptate veniam. Ipsum anim dolor irure aliquip incididunt pariatur nulla non consectetur culpa est commodo nisi. Incididunt tempor ullamco voluptate occaecat aliquip pariatur excepteur. Eiusmod dolor culpa sunt adipisicing qui. Et anim consequat cupidatat aliqua excepteur aliqua minim in non. Reprehenderit do elit velit id deserunt adipisicing anim officia nostrud irure duis.\r\n",
                        modules: {
                            "people": {
                                "label": "People",
                                "resource": {
                                    "icon": "user",
                                    "title": "People"
                                }
                            },
                            "pools": {
                                "label": "People",
                                "resource": {
                                    "icon": "folder-close",
                                    "title": "Pool"
                                }
                            },
                            "tasks": {
                                "label": "People",
                                "resource": {
                                    "icon": "list-alt",
                                    "title": "Tasks"
                                }
                            },
                            "competences": {
                                "label": "People",
                                "resource": {
                                    "icon": "briefcase",
                                    "title": "Competences"
                                }
                            }
                        },
                        expandedView: {
                            bces: []
                        },
                        "creator": "Eduardo Paez",
                        "timestamp": 2,
                        "size": "MM"
                    })
                ];
                $scope.addPeople = function (bce) {
                    bce.people.push({});
                };
                $scope.addPool = function (bce) {
                    bce.pools.push({});
                };
                $scope.addTask = function (bce) {
                    bce.tasks.push({});
                };
                $scope.addCompetence = function (bce) {
                    bce.competences.push({});
                };
                $scope.newPeople = function (people) {
                    var newBCE = ModelsService.bce(people || ModelsService.people({people: [{}], id: parseInt(Math.random() * 10000)}));
                    $scope.bces.push(newBCE);
                };
                $scope.newPool = function (pool) {
                    var newBCE = ModelsService.bce(pool || ModelsService.pool({pools: [{}], id: parseInt(Math.random() * 10000)}));
                    $scope.bces.push(newBCE);
                };
                $scope.newTask = function (task) {
                    var newBCE = ModelsService.bce(task || ModelsService.task({tasks: [{}], id: parseInt(Math.random() * 10000)}));
                    $scope.bces.push(newBCE);
                };
                $scope.newCompetence = function (competence) {
                    var newBCE = ModelsService.bce(competence || ModelsService.competence({competences: [{}], id: parseInt(Math.random() * 10000)}));
                    $scope.bces.push(newBCE);
                };
                $scope.create = function () {
                    $scope.createBox = true;
                };
                $scope.toggleLogin = function () {
                    $scope.logged = !$scope.logged;
                    $scope.menu.sections.collapseAll();
                }
            }]);
}());