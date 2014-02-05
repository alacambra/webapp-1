define(['app',
        'moment',
        'app/validation_helper',
        'lib/regexp_templates'],
function(App, moment, validation_helper, regexp_tpl) {
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

            mandatory_fields: ['name', 'description'],
            max_length_fields: { name: 40, description: 1500 },

            validate: function(attrs, options) {
                return validation_helper.validate({
                    name: ['presence', ['length', { max: this.max_length_fields.name }]],
                    description: ['presence', ['length', { max: this.max_length_fields.description }]],
                    street:      ['format', { with: regexp_tpl.street,       trim: true, allow_blank: true }],
                    houseNumber: ['format', { with: regexp_tpl.house_number, trim: true, allow_blank: true }],
                    city:        ['format', { with: regexp_tpl.street,       trim: true, allow_blank: true }],
                    zip:         ['format', { with: regexp_tpl.zip,          trim: true, allow_blank: true }],
                    email:       ['format', { with: regexp_tpl.email,        trim: true, allow_blank: true }],
                    website:     ['format', { with: regexp_tpl.url,          trim: true, allow_blank: true }],
                    phone:       ['format', { with: regexp_tpl.phone,        trim: true, allow_blank: true }],
                    fax:         ['format', { with: regexp_tpl.phone,        trim: true, allow_blank: true }],

                    foundingDate: ['inclusion', {
                        in: { min: moment().subtract('years', 100).unix(), max: moment().unix() }, // [-100, now]
                        allow_blank: true
                    }]
                }, attrs);
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
