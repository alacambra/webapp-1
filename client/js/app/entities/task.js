define(['app',
        'app/validation_helper',
        'app/entities/effort',
        'app/entities/project'],
function(App, validation_helper) {
    App.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('tasks');

        Entities.Task = Backbone.Model.extend({
            urlRoot: base_url,

            defaults: {
                id: null,
                title: null,
                description: null,
                status: 1,
                priority: 1,
                startDate: null,
                endDate: null,
                duration: null,
                progress: 0,
                hasChilds: false,
                effort: 0,
                project: null
            },

            // fields to be disabled, when task has children
            child_disable_fields: ['status', 'priority', 'startDate', 'endDate', 'duration', 'progress'],

            initialize: function () {
                if (!this.isNew()) {
                    this.efforts = new Entities.EffortCollection({ task_id: this.id });
                }
            },

            disabled_fields: function() {
                return this.get('hasChilds') ? this.child_disable_fields : [];
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


        Entities.TaskCollection = Backbone.Collection.extend({
            model: Entities.Task,
            url: base_url,
            comparator: 'priority'
        });


        var API = {
            get_task_entities: function() {
                var tasks = new Entities.TaskCollection();
                var defer = $.Deferred();

                tasks.fetch({
                    success: function(model, response) {
                        defer.resolve(model, response);
                    },
                    error: function(model, response) {
                        defer.resolve(false, response);
                    }
                });

                return defer.promise();
            },

            get_task_entity: function(task_id) {
                var task_entity;
                var defer = $.Deferred();

                if (typeof task_id !== 'object') {
                    task_entity = new Entities.Task({ id: task_id });

                    if (task_id !== undefined) { // task id was set, load entity
                        task_entity.fetch({
                            success: function(model, response) {
                                defer.resolve(model, response);
                            },
                            error: function(model, response) {
                                defer.resolve(false, response);
                            }
                        });
                    } else { // no task id was set, return new instance
                        defer.resolve(task_entity);
                    }
                } else { // given "task_id" is a model, return unchanged
                    defer.resolve(task_id);
                }

                return defer.promise();
            }
        };


        App.reqres.setHandler('task:entities', function() {
            return API.get_task_entities();
        });


        App.reqres.setHandler('task:entity', function(id) {
            return API.get_task_entity(id);
        });
    });

    return App.Entities;
});
