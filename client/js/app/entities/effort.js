define(['app',
        'moment',
        'app/validation_helper'],
function(App, moment, validation_helper) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('efforts');

        Entities.Effort = Backbone.Model.extend({
            urlRoot: function () {
                return App.model_base_url('efforts', 'tasks', this.task_id);
            },

            defaults: {
                id: null,
                date: null,
                time: null,
                comment: null
            },

            initialize: function(attributes, options) {
                var task_id;

                if (!_.isUndefined(options)) {
                    task_id = options.task_id;
                    if (_.isUndefined(task_id)) {
                        task_id = options.collection.task_id;
                    }
                }

                if (_.isUndefined(task_id)) {
                    throw new Error('Effort Model needs a task id.');
                }

                this.task_id = task_id;
            },

            validate: function(attrs, options) {
                var errors = {};

                errors = validation_helper.validates_presence_of('date', attrs, errors);

                errors = validation_helper.validates_inclusion_of('date', attrs, errors, {
                    in: {
                        min: -1767229200, // 01.01.1914 (100 years ago)
                        max: moment().add('y', 100).unix() // 100 years from now
                    }
                });

                errors = validation_helper.validates_inclusion_of('time', attrs, errors, {
                    in: { min: 1, max: 60 * 24 * 365 } // [1, 1 year]
                });

                errors = validation_helper.validates_numericality_of('time', attrs, errors, { only_integer: true });

                return _.isEmpty(errors) ? false : errors;
            }
        });


        Entities.EffortCollection = Backbone.Collection.extend({
            model: Entities.Effort,

            url: function () {
                return App.model_base_url('efforts', 'tasks', this.task_id);
            },

            comparator: 'date',

            initialize: function(models, options) {
                if (_.isUndefined(options) || !_.isArray(models)) options = models; // only one param, which is no array -> it must be options
                if (_.isUndefined(options) || _.isUndefined(options.task_id)) {
                    throw 'Error: Effort Collection needs a task id.'
                }
                this.task_id = options.task_id;
            }
        });


        var API = {
            get_effort_entities: function(task_id) {
                var efforts = new Entities.EffortCollection({ task_id: task_id });
                var defer = $.Deferred();

                efforts.fetch({
                    success: function(model, response) {
                        defer.resolve(model, response);
                    },
                    error: function(model, response) {
                        defer.resolve(false, response);
                    }
                });

                return defer.promise();
            },

            get_effort_entity: function(task_id, effort_id) {
                var effort_entity;
                var defer = $.Deferred();

                if (_.isObject(effort_id)) {
                    // given effort_id is a model, resolve unchanged effort
                    defer.resolve(effort_id);

                } else if (_.isUndefined(effort_id) && !_.isUndefined(task_id)) {
                    // no effort_id is set but task_id is, create a new effort model
                    var effort = new Entities.Effort({}, {
                        task_id: task_id
                    });

                    defer.resolve(effort);

                } else if (validation_helper.isValidId(effort_id) && !_.isUndefined(task_id)) {
                    // effort_id is a valid id and task is defined, fetch model from server and resolve response
                    new Entities.Effort({ id: effort_id }, { task_id: task_id }).fetch({
                        success: function (model, response) {
                            defer.resolve(model, response);
                        },
                        error: function (model, response) {
                            defer.resolve(model, response);
                        }
                    });

                } else {
                    defer.resolve(undefined);
                }

                return defer.promise();
            }
        };


        App.reqres.setHandler('effort:entities', function(task_id) {
            return API.get_effort_entities(task_id);
        });


        App.reqres.setHandler('effort:entity', function(task_id, effort_id) {
            return API.get_effort_entity(task_id, effort_id);
        });
    });

    return App.Entities;
});