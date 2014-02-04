define(['app',
        'moment',
        'app/model_helper',
        'app/validation_helper'],
function(App, moment, model_helper, validation_helper) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        Entities.Effort = Backbone.Model.extend({
            urlRoot: function () {
                return App.model_base_url('efforts', 'tasks', this.task_id);
            },

            defaults: {
                id: null,
                date: moment().unix(),
                time: null,
                comment: null
            },

            parse: function (response) {
                response = model_helper.convert_server_response(response);

                return response;
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
                return validation_helper.validate({
                    comment: ['length', { max: 500 }],
                    date: ['inclusion', {
                        in: {
                            min: moment().subtract('years', 100).unix(),
                            max: moment().add('years', 100).unix()
                        },
                        allow_blank: true
                    }],
                    time: [
                        ['inclusion', { in: { min: 1, max: 60 * 24 * 365 } }], // [1, 1 year]
                        ['numericality', { only_integer: true }]
                    ]
                }, attrs);
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
                var defer = $.Deferred();

                if (_.isObject(effort_id)) return effort_id; // given effort_id is a model, return model instead of promise

                if (_.isUndefined(task_id)) throw new Error('task_id must be defined');

                if (is_string_or_number(effort_id)) {
                    // effort_id is a valid id and task is defined, fetch model from server and resolve response
                    new Entities.Effort({ id: effort_id }, { task_id: task_id }).fetch({
                        success: function (model, response) {
                            defer.resolve(model, response);
                        },
                        error: function (model, response) {
                            defer.resolve(model, response);
                        }
                    });

                } else if (_.isUndefined(effort_id)) {
                    // no effort_id is set but task_id is, create a new effort model
                    var effort = new Entities.Effort({}, {
                        task_id: task_id
                    });

                    defer.resolve(effort);
                } else {
                    throw new Error('wrong effort_id type');
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
