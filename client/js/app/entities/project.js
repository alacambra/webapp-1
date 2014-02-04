define(['app',
        'app/model_helper',
        'app/validation_helper',
        'app/entities/task'],
function(App, model_helper, validation_helper) {
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
                progress: null,

                effort: 0,
                taskCount: 0
            },

            parse: function (response, options) {
                response = model_helper.convert_server_response(response);

                this.disabled_fields = model_helper.disabled_fields(response);

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
                return validation_helper.validate({
                    title: ['presence', ['length', { max: 40 }]],
                    description: ['length', { max: 5000 }],
                    endDate: [
                        ['inclusion', {
                            in: { min: attrs.startDate },
                            if: !is_empty(attrs.startDate) && !is_empty(attrs.endDate), // start and end date set
                            message : I18n.t('errors.validation.date_earlier_than', { attr: I18n.t('project.label.start_date') })
                        }]
                    ]
                }, attrs);
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
