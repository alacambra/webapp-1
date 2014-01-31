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
                email: '#js-user-email',

                submit_button: '#js-user-submit',
                submit_error_msg: '#js-user-submit-error-msg',
                save_indicator: '#js-user-save-indicator'
            },

            
            events: {
                'click a[data-navigate]': App.handle_link,
                'click button.js-submit': 'submit'
            },


            onRender: function () {
                var disable_fields = _.map(this.model.disabled_fields, function (item) {
                    return item.underscore();
                });

                var that = this;
                if (!this.model.isNew()) {
                    _.each(disable_fields, function (field) {
                        that.ui[field].attr('disabled', 'disabled');
                    });
                }
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
