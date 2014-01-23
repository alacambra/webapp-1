define(['app',
        'app/validation_helper',
        'app/entities/task'],
function(App, validation_helper) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('projects');

        Entities.Project = Backbone.Model.extend({
            urlRoot: base_url,

            defaults: {
                id: null,
                title: null,
                description: null,
                taskCount: 0,
                status: 1,
                startDate: null,
                endDate: null,
                hasChilds: false
            },

            // fields to be disabled, when task has children
            child_disable_fields: ['status', 'startDate', 'endDate'],

            disabled_fields: function() {
                return this.get('hasChilds') ? this.child_disable_fields : [];
            },

            initialize: function (attributes, options) {
                if (options && _.isArray(options.tasks)) {
                    this.tasks = new Entities.TaskCollection(options.tasks);
                } else {
                    this.tasks = new Entities.TaskCollection();
                }

                this.tasks.url = App.model_base_url('tasks', 'projects', this.get('id'));
            },

            validate: function(attrs, options) {
                var errors = {};

                errors = validation_helper.validates_presence_of('title', attrs, errors);

                if (attrs.startDate != 0 && attrs.endDate != 0) {
                    errors = validation_helper.validates_inclusion_of('endDate', attrs.startDate, attrs.endDate, attrs, errors, {
                        message : I18n.t('errors.validation.date_earlier_than', { attr: I18n.t('project.label.start_date') })
                    });
                }

                return _.isEmpty(errors) ? false : errors;
            }
        });


        Entities.ProjectCollection = Backbone.Collection.extend({
            model: Entities.Project,
            url: base_url,
            comparator: 'title'
        });


        var API = {
            get_project_entities: function() {
                var projects = new Entities.ProjectCollection();
                var defer = $.Deferred();

                projects.fetch({
                    success: function(model, response) {
                        defer.resolve(model, response);
                    },
                    error: function(model, response) {
                        defer.resolve(false, response);
                    }
                });

                return defer.promise();
            },

            get_project_entity: function(project_id) {
                var project_entity;
                var defer = $.Deferred();

                if (typeof project_id !== 'object') {
                    project_entity = new Entities.Project({ id: project_id });

                    if (project_id !== undefined) { // project id was set, load entity
                        project_entity.fetch({
                            success: function(model, response) {
                                defer.resolve(model, response);
                            },
                            error: function(model, response) {
                                defer.resolve(false, response);
                            }
                        });
                    } else { // no project id was set, return new instance
                        defer.resolve(project_entity);
                    }
                } else { // given "project_id" is a model, return unchanged
                    defer.resolve(project_id);
                }

                return defer.promise();
            },

            get_project_task_entities: function (project) {
                var defer = $.Deferred();

                if (_.isObject(project)) {
                    project.tasks.fetch({
                        success: function (collection, response) {
                            defer.resolve(collection, response);
                        },
                        error: function (collection, response) {
                            defer.resolve(false, response);
                        }
                    });
                }

                return defer.promise();
            },

            create_project_task_entity: function (project_id) {
                return new Entities.Task({
                    project: {
                        id: project_id
                    }
                });
            }
        };


        App.reqres.setHandler('project:entities', function() {
            return API.get_project_entities();
        });


        App.reqres.setHandler('project:entity', function(id) {
            return API.get_project_entity(id);
        });


        App.reqres.setHandler('project:task:entities', function (project) {
            return API.get_project_task_entities(project);
        });

        App.reqres.setHandler('project:task:create', function (project_id) {
            return API.create_project_task_entity(project_id);
        });
    });

    return App.Entities;
});
