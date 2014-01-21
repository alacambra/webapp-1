define(['app',
        'tpl!app/user_sessions/login.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/form_helper',
        'backbone_syphon'],
function(App, login_tpl, app_helper, view_helper, form_helper) {
    App.module('UserSessions.Login', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: login_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper),

            cssPrefix: '#js-user-session-',


            ui: {
                username: '#js-user-session-username',
                password: '#js-user-session-password',

                submit_button: '#js-user-session-submit',
                submit_error_msg: '#js-user-session-submit-error-msg',
                save_indicator: '#js-user-session-save-indicator'
            },


            events: {
                'click a[data-navigate]': App.handle_link,
                'click #js-user-session-submit': 'login',
                'click a.js-home': 'go_to_home'
            },



            /*
             * view event handlers
             */

            login: function(e) {
                e.preventDefault();

                form_helper.clear_errors(this);

                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', data);
            },

            /*
             * controller event handlers
             */

            onFormDataValid: function() {
                form_helper.show_load_indicator(this);
            },


            onFormDataInvalid: function(errors) {
                form_helper.mark_errors(this, errors);
            },


            onFormSaveFailed: function(message) {
                form_helper.show_save_error(this, message);
            }
        });
    });

    return App.UserSessions.Login;
});
