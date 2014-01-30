define(['app',
        'moment',
        'app/validation_helper'],
function(App, moment, validation_helper) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('services');


        Entities.Service = Backbone.Model.extend({
            urlRoot: base_url,

            defaults: {
                id: null,
                name: null,
                description: null
            },

            validate: function(attrs, options) {
                var errors = {};

                errors = validation_helper.validates_presence_of('name', attrs, errors);
                errors = validation_helper.validates_length_of('name', attrs, errors, { max: 40 });
                errors = validation_helper.validates_length_of('description', attrs, errors, { max: 500 });

                return _.isEmpty(errors) ? false : errors;
            }
        });


        Entities.ServiceCollection = Backbone.Collection.extend({
            model: Entities.Service,
            url: base_url,
            comparator: 'name'
        });


        var API = {
            get_service_entities: function() {
                var services = new Entities.ServiceCollection();
                var defer = $.Deferred();

                services.fetch({
                    success: function(model, response) {
                        defer.resolve(model, response);
                    },
                    error: function(model, response) {
                        defer.resolve(false, response);
                    }
                });

                return defer.promise();
            },

            get_service_entity: function(service_id) {
                var defer = $.Deferred();

                if (_.isObject(service_id)) return service_id; // given service_id is a model, return model instead of promise

                if (is_string_or_number(service_id)) {
                    // service_id is a valid id, fetch model from server and resolve response
                    new Entities.Service({ id: service_id }).fetch({
                        success: function (model, response) {
                            defer.resolve(model, response);
                        },
                        error: function (model, response) {
                            defer.resolve(model, response);
                        }
                    });

                } else if (_.isUndefined(service_id)) {
                    // no service_id is set, create a new service model
                    var service = new Entities.Service();

                    defer.resolve(service);

                } else {
                    throw new Error('wrong service_id type');
                }

                return defer.promise();
            }
        };


        App.reqres.setHandler('service:entities', function() {
            return API.get_service_entities();
        });


        App.reqres.setHandler('service:entity', function(id) {
            return API.get_service_entity(id);
        });
    });

    return App.Entities;
});
