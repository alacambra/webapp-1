define(['app',
        'moment',
        'app/model_helper',
        'app/validation_helper',
        'lib/regexp_templates'],
function(App, moment, model_helper, validation_helper, regexp_tpl) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('users');


        Entities.User = Backbone.Model.extend({
            urlRoot: base_url,

            defaults: {
                id: null,
                firstName: null,
                lastName: null,
                birthDate: null,
                email: null
            },

            mandatory_fields: ['firstName', 'lastName', 'email'],
            disabled_fields: ['email'],
            max_length_fields: { password: 64, passwordConfirmation: 64 },

            get_mandatory_fields: function() {
                if (this.isNew()) {
                    return _.union(this.mandatory_fields, ['password', 'passwordConfirmation']);
                }
                return this.mandatory_fields;
            },

            parse: function(response) {
                response = model_helper.convert_server_response(response);

                return response;
            },

            validate: function(attrs, options) {
                var is_new_or_password_set = this.isNew() || !is_blank(attrs.password) || !is_blank(attrs.passwordConfirmation);

                return validation_helper.validate({
                    firstName: 'presence',
                    lastName: 'presence',
                    birthDate: ['inclusion', {
                        in: { min: moment().subtract('years', 100).unix(), max: moment().unix() } // [-100, now]
                    }],
                    email: [
                        'presence',
                        ['format', { with: regexp_tpl.email }]
                    ],
                    password: [
                        ['presence',     { if: is_new_or_password_set }],
                        ['length',       { if: is_new_or_password_set, min: 4, max: this.max_length_fields.password }],
                        ['confirmation', { if: is_new_or_password_set }]
                    ],
                    passwordConfirmation: ['presence', { if: is_new_or_password_set }]
                }, attrs);
            }
        });


        Entities.UserCollection = Backbone.Collection.extend({
            model: Entities.User,
            url: base_url,
            comparator: 'firstName'
        });


        var API = {
            get_user_entities: function() {
                var users = new Entities.UserCollection();
                var defer = $.Deferred();

                users.fetch({
                    success: function(model, response) {
                        defer.resolve(model, response);
                    },
                    error: function(model, response) {
                        defer.resolve(false, response);
                    }
                });

                return defer.promise();
            },

            get_user_entity: function(user_id) {
                var defer = $.Deferred();

                if (_.isObject(user_id)) return user_id;    // given user_id is a model, return model instead of promise

                if (is_string_or_number(user_id)) {
                    // user_id is a valid id, fetch model from server and resolve response
                    new Entities.User({ id: user_id }).fetch({
                        success: function (model, response) {
                            defer.resolve(model, response);
                        },
                        error: function (model, response) {
                            defer.resolve(model, response);
                        }
                    });

                } else if (_.isUndefined(user_id)) {
                    // no user_id is set, create a new user model
                    var user = new Entities.User();

                    defer.resolve(user);

                } else {
                    throw new Error('wrong user_id type');
                }

                return defer.promise();
            }
        };


        App.reqres.setHandler('user:entities', function() {
            return API.get_user_entities();
        });


        App.reqres.setHandler('user:entity', function(id) {
            return API.get_user_entity(id);
        });
    });

    return App.Entities;
});
