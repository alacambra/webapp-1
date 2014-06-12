(function () {
    'use strict';
    angular.module('frontendPrototypeApp')
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
                        };
                        /*
                         * this.context() is this.setContext() alias
                         */

                        this.context = function (options, contextInstance) {
                            return this.setContext(options, contextInstance);
                        };
                    })
                    .state({
                        _id: null,
                        typeName: typeNames.ELEMENT
                    })
                    .methods({
                        getDTO: function () {
                            return _.omit(this, "typeName");
                        },
                        getId: function() {
                            return this._id;
                        }
                    });
                var collection = stampit()
                    .state({
                        collection: []
                    })
                    .methods({
                        /*
                         * Manages elements in an collection.
                         * 
                         * TODO:
                         * - Mix collections
                         * - Create iterator
                         * - Make collection array private
                         * 
                         */

                        addToCollection: function () {
                            var items = arguments,
                                that = this;
                            _.each(items, function (item) {
                                if (that.collection.indexOf(item) === -1)
                                    that.collection.push(item);
                            });
                            return that;
                        },
                        add: function () {
                            var items = arguments,
                                that = this;
                            _.each(items, function (item) {
                                that.collection.push(item);
                            });
                            return that;
                        },
                        indexOf: function (item) {
                            var that = this;
                            return that.collection.indexOf(item);
                        },
                        filter: function (filter) {
                            return _.where(this.collection, filter)
                        },
                        find: function (item) {
                            var index = -1,
                                that = this;
                            _.find(that.collection, function (collectionItem) {
                                index++;
                                if (_.isEqual(item, collectionItem)) {
                                    return 1;
                                }
                            })

                            return index;
                        },
                        get: function (index) {
                            return this.collection[index];
                        },
                        remove: function (item) {
                            while (this.indexOf(item) !== - 1)
                                this.collection.splice(this.indexOf(item), 1)
                            return this;
                        },
                        clear: function () {
                            while (!this.isEmpty()) {
                                this.remove(this.get(0));
                            }
                            return this;
                        },
                        size: function () {
                            return this.collection.length;
                        },
                        isEmpty: function () {
                            return this.size() === 0;
                        },
                        move: function (oldIndex, newIndex) {
                            if (newIndex >= this.collection.length) {
                                var k = newIndex - this.collection.length;
                                while ((k--) + 1) {
                                    this.collection.push(undefined);
                                }
                            }
                            this.collection.splice(newIndex, 0, this.collection.splice(oldIndex, 1)[0]);
                            return this;
                        },
                        first: function (index) {
                            this.move(index, 0)
                            return this;
                        },
                        last: function (index) {
                            this.move(index, this.size() - 1);
                            return this;
                        },
                        toArray: function () {
                            return this.collection;
                        }
                    });
                var section = stampit.compose(element, collection)
                    .enclose(function (contextInstance) {
                        this.setContext(contextInstance);
                    })
                    .state({
                        expanded: false,
                        subsections: {}
                    })
                    .methods({
                        count: function () {
                            var itemsCount = 0;
                            _.each(this.subsections, function (subsection) {
                                itemsCount = itemsCount + subsection.collection.length;
                            });
                            return itemsCount;
                        },
                        expand: function () {
                            this.expanded = true;
                        },
                        contract: function () {
                            this.expanded = false;
                        },
                        toggle: function () {
                            this.expanded = !this.expanded;
                        },
                        remove: function (element) {
                            _.each(this.subsections, function (subsection) {
                                var index = subsection.collection.indexOf(element);
                                if (index !== -1) {
                                    subsection.collection.splice(index, 1);
                                }
                            });
                        }
                    });
                var subsection = stampit.compose(section, collection)
                    .enclose(function (contextInstance) {
                        this.setContext(contextInstance);
                    })
                    .state({
                        label: "Subsection",
                        expanded: false
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
                var bceCollection = stampit.compose(collection)
                    .methods({
                        indexOfResource: function (resourceId) {
                            if (!resourceId) return -1;
                            var match = this.filter({resourceId: resourceId})[0];
                            if (match) {
                                return this.indexOf(match);
                            }
                            return -1;
                        },
                        add: function () {
                            var items = arguments,
                                that = this;
                            _.each(items, function (item) {
                                var index = that.indexOfResource(item.resourceId);
                                if (index === -1) {
                                    that.collection.push(item);
                                } else {
                                    that.last(index)
                                }
                            });
                            return that;
                        }
                    })
                var bce = stampit.compose(element)
                    .enclose(function (contextInstance) {
                        this.setContext(contextInstance);
                        this.subBces = bceCollection();
                        this.modules.tasks.resources = collection();
                        this.modules.competences.resources = collection();
                        this.modules.people.resources = collection();
                        this.modules.pools.resources = collection();
//
//                        switch (_.typeOf(this.resource)) {
//                            case "Competence":
//                                this.icon = "briefcase";
//                                break;
//                            case "Pool":
//                                this.icon = "folder-close";
//                                break;
//                            case "People":
//                                this.icon = "user";
//                                break;
//                            case "Task":
//                                this.icon = "list-alt";
//                                break;
//                            default:
//                                this.icon = "th"
//                        }
                    })
                    .state({
                        typeName: typeNames.BCE,
                        icon: "th",
                        modules: {
                            "tasks": {
                                icon: "list-alt",
                                label: "Tasks"
                            },
                            "people": {
                                icon: "user",
                                label: "People"
                            },
                            "pools": {
                                icon: "folder-close",
                                label: "Pools"
                            },
                            "competences": {
                                icon: "briefcase",
                                label: "Competences"
                            }
                        },
                        subBces: null,
                        expanded: false,
                        editing: false,
                        timestamp: new Date(),
                        size: "LL"
                    })
                    .methods({
                        addModule: function (module, resource) {
                            this.modules[module] ? this.modules[module].resource.push(resource) : angular.noop();
                        },
                        addSubBce: function (subbce) {
                            this.subBces.add(subbce);
                            return this;
                        },
                        edit: function () {
                            this.editing = true;
                            return this;
                        },
                        unedit: function () {
                            this.editing = false;
                            return this;
                        }
                    });
                var people = stampit.compose(element)
                    .enclose()
                    .state({
                        typeName: typeNames.PEOPLE,
                        title: "",
                        description: "",
                        creator: null,
                        location: "",
                        creationDate: null,
                        publishDate: null,
                        startDate: null,
                        endDate: null,
                        deleteDate: null,
                        type: "",
                        occupation: "",
                        progress: 0, visibility: false,
                        privacy: null,
                        verified: false,
                        updateDate: null
                    })
                    .methods({
                        getDTO: function () {
                            return _.pick(this, ["_id", "title", "description", "creator"]);
                        }
                    });
                var pool = stampit.compose(element)
                    .enclose()
                    .state({
                        typeName: typeNames.POOL,
                        title: "",
                        description: "",
                        creator: null,
                        location: "",
                        creationDate: null,
                        publishDate: null,
                        startDate: null,
                        endDate: null,
                        deleteDate: null,
                        type: "",
                        visibility: false,
                        privacy: null,
                        verified: false,
                        updateDate: null
                    })
                    .methods({
                        getDTO: function () {
                            return _.pick(this, ["_id", "title", "description", "creator"]);
                        }
                    });
                var task = stampit.compose(element)
                    .enclose()
                    .state({
                        typeName: typeNames.TASK,
                        title: "",
                        description: "",
                        creator: null, location: "",
                        creationDate: null,
                        status: "",
                        publishDate: null,
                        startDate: null,
                        endDate: null,
                        deleteDate: null,
                        progress: 0,
                        visibility: false, privacy: null,
                        verified: false,
                        updateDate: null,
                        estimatedEffort: 0,
                        effort: 0
                    })
                    .methods({
                        getDTO: function () {
                            return _.pick(this, ["_id", "title", "description", "creator"]);
                        }
                    });
                var competence = stampit.compose(element)
                    .enclose()
                    .state({
                        typeName: typeNames.COMPETENCE,
                        title: "",
                        description: "",
                        creator: null,
                        creationDate: null,
                        publishDate: null,
                        startDate: null,
                        type: "", verified: false,
                        updateDate: null
                    })
                    .methods({
                        getDTO: function () {
                            return _.pick(this, ["_id", "title", "description", "creator"]);
                        }
                    });
                var communication = stampit.compose(element)
                    .enclose()
                    .state({
                        typeName: typeNames.COMMUNICATION,
                        title: "",
                        description: "",
                        creator: null,
                        creationDate: null,
                        publishDate: null,
                        startDate: null,
                        endDate: null,
                        deleteDate: null,
                        visibility: false,
                        privacy: null,
                        verified: false
                    })
                    .methods({
                        getDTO: function () {
                            return _.pick(this, ["_id", "title", "description", "creator"]);
                        }
                    });
                var event = stampit.compose(element)
                    .enclose()
                    .state({
                        typeName: typeNames.EVENT,
                        title: "",
                        description: "", creator: null,
                        location: null,
                        creationDate: null,
                        publishDate: null,
                        startDate: null,
                        endDate: null,
                        deleteDate: null,
                        type: "",
                        visibility: false,
                        privacy: null,
                        updated: false
                    })
                    .methods({
                        getDTO: function () {
                            return _.pick(this, ["_id", "title", "description", "creator"]);
                        }
                    });
                var data = stampit.compose(element)
                    .enclose()
                    .state({
                        typeName: typeNames.DATA,
                        title: "",
                        description: "",
                        creator: null,
                        location: "",
                        creationDate: null,
                        publishDate: null,
                        startDate: null,
                        endDate: null,
                        deleteDate: null,
                        type: "",
                        visibility: false,
                        privacy: null,
                        verified: false,
                        updateDate: null
                    }).methods({
                    getDTO: function () {
                        return _.pick(this, ["_id", "title", "description", "creator"]);
                    }
                });
                return {
                    bce: bce,
                    task: task,
                    people: people,
                    competence: competence,
                    pool: pool,
                    data: data,
                    event: event,
                    communication: communication,
                    section: section,
                    subsection: subsection,
                    collection: collection,
                    bceCollection: bceCollection
                };
            }])
}());