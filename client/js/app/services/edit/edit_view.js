define(['app',
        'tpl!app/services/edit/templates/edit.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/form_helper',
        'app/services/services_helper',
        'backbone_syphon',
        'jquery_elastic'],
function(App, edit_tpl, app_helper, view_helper, form_helper, services_helper) {
    App.module('Services.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            className: 'edit',
            template: edit_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, services_helper),

            cssPrefix: '#js-service-',

            
            ui: {
                description: '#js-service-description',

                mandatory_fields: 'input[data-required="true"], textarea[data-required="true"]',

                submit_button: '#js-service-submit',
                submit_error_msg: '#js-service-submit-error-msg',
                save_indicator: '#js-service-save-indicator'
            },

            
            events: {
                'click a[data-navigate]': App.handle_link,
                'click button.js-submit': 'submit'
            },


            onRender: function () {
                this.init_description_elastic_textarea();

                form_helper.mark_mandatory_fields(this.ui.mandatory_fields);
            },


            /*
             * onRender helpers
             */

            init_description_elastic_textarea: function() {
                this.ui.description.focus(function() {
                    var $this = $(this);
                    if (!$this.data('elastic-enabled')) {
                        $this.elastic().data('elastic-enabled', true);
                        $this.unbind('blur'); // this removes the issue when clicking a button doesn't work while textarea is focused
                    }
                });
            },


            /*
             * view event handlers
             */

            submit: function(e) {
                e.preventDefault();

                form_helper.clear_errors(this);

                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', data);
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            },

            go_to_services: function (event) {
                event.preventDefault();
                App.trigger('services:list');
            },

            go_to_service: function (event) {
                event.preventDefault();
                App.trigger('service:show', this.model.get('id'));
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

    return App.Services.Edit;
});
