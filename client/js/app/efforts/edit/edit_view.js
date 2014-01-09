define(['app',
        'tpl!app/efforts/edit/templates/edit.tpl',
        'app/app_helper',
        'app/form_helper',
        'app/efforts/effort_helper',
        'backbone_syphon',
        'jquery_elastic',
        'jquery_ui'],
function(App, edit_tpl, app_helper, form_helper, effort_helper) {
    App.module('Efforts.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            template: edit_tpl,

            className: 'edit',

            cssPrefix: '#js-effort-',

            ui: {
                date: '#js-effort-date',

                submit_button: '#js-effort-submit',
                submit_error_msg: '#js-effort-submit-error-msg',
                save_indicator: '#js-effort-save-indicator'
            },

            events: {
                'click button.js-submit': 'submit'
            },


            templateHelpers: effort_helper,


            onRender: function () {
                this.init_datepicker();
            },


            /*
             * onRender helpers
             */

            init_datepicker: function() {
                this.ui.date.datepicker(app_helper.datepicker_default);
            },


            /*
             * view event handlers
             */

            submit: function(e) {
                e.preventDefault();

                form_helper.clear_errors(this);

                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', effort_helper.unformat(data));
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

    return App.Efforts.Edit;
});
