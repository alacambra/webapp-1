define(['app',
        'tpl!app/users/edit/templates/edit.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/form_helper',
        'app/users/users_helper',
        'backbone_syphon'],
function(App, edit_tpl, app_helper, view_helper, form_helper, users_helper) {
    App.module('Users.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            className: 'edit',
            template: edit_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, users_helper),

            cssPrefix: '#js-user-',

            
            ui: {
                first_name: '#js-user-first-name',
                last_name: '#js-user-last-name',
                email: '#js-user-email',
                password: '#js-user-password',
                password_confirmation: '#js-user-password-confirmation',

                submit_button: '#js-user-submit',
                submit_error_msg: '#js-user-submit-error-msg',
                save_indicator: '#js-user-save-indicator'
            },

            
            events: {
                'click a[data-navigate]': App.handle_link,
                'click button.js-submit': 'submit'
            },


            onRender: function () {
                form_helper.extend_fields({
                    disable: { disable_fields: this.model.get_disabled_fields() },
                    mandatory: { mandatory_fields: this.model.get_mandatory_fields() },
                    maxlength: {}
                }, this);
            },
            

            /*
             * view event handlers
             */

            submit: function(e) {
                e.preventDefault();

                form_helper.clear_errors(this);

                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', users_helper.unformat(data));
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
