define(['app',
        'app/validation_helper'],
function(App, validation_helper) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('user_sessions');

        Entities.UserSession = Backbone.Model.extend({
            urlRoot: base_url,

            validate: function(attrs, options) {
                return validation_helper.validate({
                    username: 'presence',
                    password: 'presence'
                }, attrs);
            }
        });
    });

    return App.Entities;
});
