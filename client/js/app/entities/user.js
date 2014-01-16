define(['app', 'config', 'app/validation_helper', 'backbone_faux_server'], function(App, CONFIG, validation_helper, Faux) {
    App.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
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
                var errors = {};

                errors = validation_helper.validates_presence_of(['firstName', 'lastName', 'email'], attrs, errors);
                errors = validation_helper.validates_format_of('email', /\S+@\S+\.\S+/, attrs, errors);

                if (this.isNew() || !is_blank(attrs.password) || !is_blank(attrs.passwordConfirmation)) {
                    errors = validation_helper.validates_presence_of('password', attrs, errors);
                    errors = validation_helper.validates_length_of('password', 4, 64, attrs, errors);
                    errors = validation_helper.validates_confirmation_of('password', attrs, errors);
                }

                // date between 01.01.1914 (100 years ago) and now?
                // if date is not set, date will be 0 and match validation // TODO: add clean check for unset date value
                errors = validation_helper.validates_inclusion_of('birthDate', -1767229200, moment().unix(), attrs, errors);

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
                var user_entity;
                var defer = $.Deferred();

                if (typeof user_id !== 'object') {
                    user_entity = new Entities.User({ id: user_id });

                    if (user_id !== undefined) { // user id was set, load entity
                        user_entity.fetch({
                            success: function(model, response) {
                                defer.resolve(model, response);
                            },
                            error: function(model, response) {
                                defer.resolve(false, response);
                            }
                        });
                    } else { // no user id was set, return new instance
                        defer.resolve(user_entity);
                    }
                } else { // given "user_id" is a model, return unchanged
                    defer.resolve(user_id);
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
