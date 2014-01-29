define(['app',
        'app/model_helper',
        'app/validation_helper',
        'app/entities/effort',
        'app/entities/project'],
function(App, model_helper, validation_helper) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('tasks');

        Entities.Task = Backbone.Model.extend({
            urlRoot: function () {
                if (this.isNew() && !_.isNull(this.get('project'))) {
                    return App.model_base_url('tasks/in/project/' + this.get('project').id);
                } else {
                    return base_url;
                }
            },

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

                effort: 0,
                project: null,
                parentTask: null,
                subtaskCount: 0,
                assignee: null
            },

            parse: function (response, options) {
                this.disabled_fields = model_helper.disabled_fields(response);

                return response;
            },

            initialize: function (attributes, options) {
                if (!this.isNew()) {
                    this.efforts = new Entities.EffortCollection({ task_id: this.id });
                }

                if (options && _.isArray(options.subtasks)) {
                    this.subtasks = new Entities.TaskCollection(options.subtasks);
                } else {
                    this.subtasks = new Entities.TaskCollection();
                }

                this.subtasks.url = App.model_base_url('subtasks', 'tasks', this.get('id'));
            },

            validate: function(attrs, options) {
                var errors = {};

                errors = validation_helper.validates_presence_of('title', attrs, errors);

                errors = validation_helper.validates_inclusion_of('duration', attrs, errors, {
                    in: { min: 0, max: 60 * 24 * 365 } // [1, 1 year]
                });

                errors = validation_helper.validates_inclusion_of('progress', attrs, errors, {
                    in: { min: 0, max: 1 }
                });

                errors = validation_helper.validates_numericality_of('duration', attrs, errors, { allow_blank: true, only_integer: true });
                errors = validation_helper.validates_numericality_of('progress', attrs, errors, { allow_blank: true });

                errors = validation_helper.validates_inclusion_of('endDate', attrs, errors, {
                    if: !is_empty(attrs.startDate) && !is_empty(attrs.endDate), // start and end date set
                    in: { min: attrs.startDate, max: attrs.endDate },
                    message : I18n.t('errors.validation.date_earlier_than', { attr: I18n.t('project.label.start_date') })
                });

                return _.isEmpty(errors) ? false : errors;
            }
        });


        Entities.TaskCollection = Backbone.Collection.extend({
            model: Entities.Task,
            url: base_url,
            comparator: function(task) { return -task.get('priority') }
        });


        var API = {
            get_task_entities: function(parent) {
                var tasks = new Entities.TaskCollection();
                var defer = $.Deferred();

                if (_.isObject(parent)) {
                    if (!_.isUndefined(parent.subtasks)) {
                        // parent is a task so set its tasks
                        tasks = parent.subtasks;

                    } else if (!_.isUndefined(parent.tasks)) {
                        // parent is a project so set its tasks
                        tasks = parent.tasks;
                    }
                }

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

            get_task_entity: function(task_id, options) {
                var defer = $.Deferred();

                if (_.isObject(task_id)) return task_id;    // given task_id is a model, return model instead of promise

                if (is_string_or_number(task_id)) {
                    // task_id is set, fetch model from server and resolve response
                    new Entities.Task({ id: task_id }).fetch({
                        success: function (model, response) {
                            defer.resolve(model, response);
                        },
                        error: function (model, response) {
                            defer.resolve(false, response);
                        }
                    });

                } else if (_.isUndefined(task_id)) {
                    // no task_id is set, create a new task model
                    var task = new Entities.Task({
                        assignee: App.current_user()
                    });

                    // check the options when it is specified
                    if (_.isObject(options)) {
                        if (!_.isUndefined(options.parent_task_id)) {
                            // parent_task_id is set as option, extend task to subtask
                            task.set('parentTask', {
                                id: options.parent_task_id
                            });
                        }

                        if (!_.isUndefined(options.project_id)) {
                            // project_id is set as option, extend task to a project_task
                            task.set('project', {
                                id: options.project_id
                            });
                        }
                    }

                    // resolve final new task
                    defer.resolve(task);

                } else {
                    throw new Error('wrong task_id type')
                }

                return defer.promise();
            }
        };


        App.reqres.setHandler('task:entities', function(parent) {
            return API.get_task_entities(parent);
        });


        App.reqres.setHandler('task:entity', function(id, options) {
            return API.get_task_entity(id, options);
        });
    });

    return App.Entities;
});
