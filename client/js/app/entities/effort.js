define(['app', 'config', 'app/validation_helper', 'backbone_faux_server'], function(App, CONFIG, validation_helper, Faux) {
    App.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('efforts');


        Entities.Effort = Backbone.Model.extend({
            urlRoot: base_url,

            defaults: {
                date: null,
                time: null,
                comment: null
            },

            validate: function(attrs, options) {
                var errors = {};

                errors = validation_helper.validates_exclusion_of('date', 0, attrs, errors, { message: I18n.t('errors.validation.empty') });
                errors = validation_helper.validates_exclusion_of('time', 0, attrs, errors, { message: I18n.t('errors.validation.wrong_value', { val: 0 }) });

                // date between 01.01.1914 (100 years ago) and now?
                // if date is not set, date will be 0 and match validation // TODO: add clean check for unset date value
                errors = validation_helper.validates_inclusion_of('date', -1767229200, moment().add('y', 100).unix(), attrs, errors);

                return _.isEmpty(errors) ? false : errors;
            }
        });


        Entities.EffortCollection = Backbone.Collection.extend({
            model: Entities.Effort,
            url: base_url,
            comparator: 'date'
        });


        var API = {
            get_effort_entities: function() {
                var efforts = new Entities.EffortCollection();
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

            get_effort_entity: function(effort_id) {
                var effort_entity;
                var defer = $.Deferred();

                if (typeof effort_id !== 'object') {
                    effort_entity = new Entities.Effort({ id: effort_id });

                    if (effort_id !== undefined) { // effort id was set, load entity
                        effort_entity.fetch({
                            success: function(model, response) {
                                defer.resolve(model, response);
                            },
                            error: function(model, response) {
                                defer.resolve(false, response);
                            }
                        });
                    } else { // no effort id was set, return new instance
                        defer.resolve(effort_entity);
                    }
                } else { // given "effort_id" is a model, return unchanged
                    defer.resolve(effort_id);
                }

                return defer.promise();
            }
        };


        App.reqres.setHandler('effort:entities', function() {
            return API.get_effort_entities();
        });


        App.reqres.setHandler('effort:entity', function(id) {
            return API.get_effort_entity(id);
        });
        

        // FAUX SERVER!!!

        var efforts = [
            { id: 1, date: 1387206224, time: 60, comment: 'Effort1' },
            { id: 2, date: 1387206224, time: 90, comment: 'Effort2' },
            { id: 3, date: 1387206224, time: 15, comment: 'Effort3' },
            { id: 4, date: 1387206224, time: 180, comment: 'Effort4' }
        ];

        Faux.addRoute('getEfforts', base_url, 'GET', function (context) {
            return efforts;
        });

        Faux.addRoute('getEffort', base_url + '/:id', 'GET', function(context, id) {
            var effort;
            _.forEach(efforts, function (t) {
                if (t.id === parseInt(id)) {
                    effort = t;
                }
            });
            return effort || 'HTTP/1.1 404 Not Found';
        });

        Faux.enable(CONFIG.rest.faux_enable);
    });

    return App.Entities;
});
