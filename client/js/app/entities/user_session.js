define(['app', 'config', 'app/validation_helper'], function(App, CONFIG, validation_helper) {
    App.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('user_sessions');

        Entities.UserSession = Backbone.Model.extend({
            urlRoot: base_url,

            validate: function(attrs, options) {
                var errors = validation_helper.validates_presence_of(['username', 'password'], attrs, {});

                return _.isEmpty(errors) ? false : errors;
            }
        });
    });

    return App.Entities;
});
