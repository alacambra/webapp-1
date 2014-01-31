define(['app',
        'moment',
        'app/validation_helper'],
function(App, moment, validation_helper) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('pools');


        Entities.Pool = Backbone.Model.extend({
            urlRoot: base_url,

            defaults: {
                id: null,
                name: null,
                description: null,
                street: null,
                houseNumber: null,
                city: null,
                zip: null,
                country: null,
                email: null,
                website: null,
                foundingDate: null,
                employeeCount: null,
                phone: null,
                fax: null
            },

            validate: function(attrs, options) {
                var errors = {};

                errors = validation_helper.validates_presence_of(['name', 'description'], attrs, errors);

                errors = validation_helper.validates_length_of('name', attrs, errors, { max: 40 });
                errors = validation_helper.validates_length_of('description', attrs, errors, { max: 1500 });

                errors = validation_helper.validates_format_of(['street', 'city'], attrs, errors, { with: /^[\D]{2,}$/, trim: true, allow_blank: true });
                errors = validation_helper.validates_format_of('houseNumber',      attrs, errors, { with: /^\d{1,6}\s?[a-zA-Z]{0,3}$/, trim: true, allow_blank: true });
                errors = validation_helper.validates_format_of('zip',              attrs, errors, { with: /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/, trim: true, allow_blank: true });
                errors = validation_helper.validates_format_of('email',            attrs, errors, { with: /^\S+@\S+\.\S+$/, trim: true, allow_blank: true });
                errors = validation_helper.validates_format_of('website',          attrs, errors, { with: /^http[s]?:\/\/[\.a-zA-ZäöüßAÖÜ0-9_-]+\.[a-zA-Z]{2,5}(\/.*)?$/, trim: true, allow_blank: true });
                errors = validation_helper.validates_format_of(['phone', 'fax'],   attrs, errors, { with: /^\+[\d\s-]{7,}$/, trim: true, allow_blank: true });

                errors = validation_helper.validates_inclusion_of('foundingDate', attrs, errors, {
                    in: {
                        min: moment().subtract('years', 100).unix(),
                        max: moment().unix(), // now,
                        allow_blank: true
                    }
                });

                return _.isEmpty(errors) ? false : errors;
            }
        });


        Entities.PoolCollection = Backbone.Collection.extend({
            model: Entities.Pool,
            url: base_url,
            comparator: 'name'
        });


        var API = {
            get_pool_entities: function() {
                var pools = new Entities.PoolCollection();
                var defer = $.Deferred();

                pools.fetch({
                    success: function(model, response) {
                        defer.resolve(model, response);
                    },
                    error: function(model, response) {
                        defer.resolve(false, response);
                    }
                });

                return defer.promise();
            },

            get_pool_entity: function(pool_id) {
                var defer = $.Deferred();

                if (_.isObject(pool_id)) return pool_id; // given pool_id is a model, return model instead of promise

                if (is_string_or_number(pool_id)) {
                    // pool_id is a valid id, fetch model from server and resolve response
                    new Entities.Pool({ id: pool_id }).fetch({
                        success: function (model, response) {
                            defer.resolve(model, response);
                        },
                        error: function (model, response) {
                            defer.resolve(model, response);
                        }
                    });

                } else if (_.isUndefined(pool_id)) {
                    // no pool_id is set, create a new pool model
                    var pool = new Entities.Pool();

                    defer.resolve(pool);

                } else {
                    throw new Error('wrong pool_id type');
                }

                return defer.promise();
            }
        };


        App.reqres.setHandler('pool:entities', function() {
            return API.get_pool_entities();
        });


        App.reqres.setHandler('pool:entity', function(id) {
            return API.get_pool_entity(id);
        });
    });

    return App.Entities;
});
