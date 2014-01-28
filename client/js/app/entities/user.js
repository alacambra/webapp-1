define(['app',
        'moment',
        'app/validation_helper'],
function(App, moment, validation_helper) {
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

            validate: function(attrs, options) {
                var is_new_or_password_set = this.isNew() || !is_blank(attrs.password) || !is_blank(attrs.passwordConfirmation);

                var errors = {};

                errors = validation_helper.validates_presence_of(['firstName', 'lastName', 'email'], attrs, errors);
                errors = validation_helper.validates_format_of('email', attrs, errors, { with: /^\S+@\S+\.\S+$/ });

                errors = validation_helper.validates_presence_of(['password', 'passwordConfirmation'], attrs, errors, { if: is_new_or_password_set });
                errors = validation_helper.validates_length_of('password', attrs, errors, { min: 4, max: 64, if: is_new_or_password_set });
                errors = validation_helper.validates_confirmation_of('password', attrs, errors, { if: is_new_or_password_set });

                errors = validation_helper.validates_inclusion_of('birthDate', attrs, errors, {
                    in: {
                        min: -1767229200, // 01.01.1914 (100 years ago)
                        max: moment().unix() // now
                    }
                });


                return _.isEmpty(errors) ? false : errors;
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

                if (_.isObject(user_id)) {
                    // given user_id is a model, resolve unchanged user
                    defer.resolve(user_id);

                } else if (_.isUndefined(user_id)) {
                    // no user_id is set, create a new user model
                    var user = new Entities.User();

                    defer.resolve(user);

                } else if (validation_helper.isValidId(user_id)) {
                    // user_id is a valid id, fetch model from server and resolve response
                    new Entities.User({ id: user_id }).fetch({
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


        App.reqres.setHandler('user:entities', function() {
            return API.get_user_entities();
        });


        App.reqres.setHandler('user:entity', function(id) {
            return API.get_user_entity(id);
        });
    });

    return App.Entities;
});
