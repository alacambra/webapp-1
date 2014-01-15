define(['app',
        'tpl!app/users/edit/templates/edit.tpl',
        'app/app_helper',
        'app/form_helper',
        'app/users/user_helper',
        'backbone_syphon'],
function(App, edit_tpl, app_helper, form_helper, user_helper) {
    App.module('Users.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            template: edit_tpl,

            className: 'edit',

            cssPrefix: '#js-user-',

            ui: {
                submit_button: '#js-user-submit',
                submit_error_msg: '#js-user-submit-error-msg',
                save_indicator: '#js-user-save-indicator'
            },

            events: {
                'click button.js-submit': 'submit',
                'click a.js-home': 'go_to_home',
                'click a.js-users': 'go_to_users',
                'click a.js-user': 'go_to_user'
            },


            templateHelpers: $.extend({}, user_helper, app_helper),


            /*
             * view event handlers
             */

            submit: function(e) {
                e.preventDefault();

                form_helper.clear_errors(this);

                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', user_helper.unformat(data));
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            },

            go_to_users: function (event) {
                event.preventDefault();
                App.trigger('users:list');
            },

            go_to_user: function (event) {
                event.preventDefault();
                App.trigger('user:show', this.model.get('id'));
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


            onFormSaveFailed: function() {
                form_helper.show_save_error(this);
            }
        });
    });

    return App.Users.Edit;
});
