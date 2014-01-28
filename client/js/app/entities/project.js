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
                status: 1,
                startDate: null,
                endDate: null,

                taskCount: 0
            },

            // fields to be disabled, when task has children
            child_disable_fields: [],

            disabled_fields: function() {
                return this.get('taskCount') > 0 ? this.child_disable_fields : [];
            },

            parse: function (response, options) {
                var that = this;
                that.child_disable_fields = [];

                _.each(response, function (val, key) {
                    var regex = key.match(/IsDefault$/)
                    if (regex && !val) {
                        var disabled_key = regex.input.substring(0, regex.index);
                        that.child_disable_fields.push(disabled_key);
                    }
                });

                return response;
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

                errors = validation_helper.validates_inclusion_of('endDate', attrs, errors, {
                    if: !is_empty(attrs.startDate) && !is_empty(attrs.endDate), // start and end date set
                    in: { min: attrs.startDate, max: attrs.endDate },
                    message : I18n.t('errors.validation.date_earlier_than', { attr: I18n.t('project.label.start_date') })
                });

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
                var defer = $.Deferred();

                if (_.isObject(project_id)) return project_id;  // given project_id is a model, return model instead of promise

                if (is_string_or_number(project_id)) {
                    // project_id is a valid id, fetch model from server and resolve response
                    new Entities.Project({ id: project_id }).fetch({
                        success: function (model, response) {
                            defer.resolve(model, response);
                        },
                        error: function (model, response) {
                            defer.resolve(model, response);
                        }
                    });

                } else if (_.isUndefined(project_id)) {
                    // no project_id is set, create new project model
                    var project = new Entities.Project();

                    defer.resolve(project);

                } else {
                    throw new Error('wrong project type');
                }

                return defer.promise();
            }
        };


        App.reqres.setHandler('project:entities', function() {
            return API.get_project_entities();
        });


        App.reqres.setHandler('project:entity', function(id) {
            return API.get_project_entity(id);
        });
    });

    return App.Entities;
});
