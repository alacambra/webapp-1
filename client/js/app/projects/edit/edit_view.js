define(['app',
        'tpl!app/projects/edit/templates/edit.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/form_helper',
        'app/projects/projects_helper',
        'backbone_syphon',
        'jquery_elastic',
        'jquery_ui'],
function(App, edit_tpl, app_helper, view_helper, form_helper, projects_helper) {
    App.module('Projects.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            className: 'edit',
            template: edit_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, projects_helper),

            cssPrefix: '#js-project-',

            
            ui: {
                description: '#js-project-description',
                status: '#js-project-status',
                start_date: '#js-project-startDate',
                end_date: '#js-project-endDate',

                submit_button: '#js-project-submit',
                submit_error_msg: '#js-project-submit-error-msg',
                save_indicator: '#js-project-save-indicator'
            },

            
            events: {
                'click a[data-navigate]': App.handle_link,
                'click button.js-submit': 'submit'
            },


            onRender: function () {
                var disable_fields = _.map(this.model.disabled_fields(), function(item) {
                    return item.underscore();
                });

                this.init_description_elastic_textarea();

                if (!_.include(disable_fields, 'start_date')) this.ui.start_date.datepicker(app_helper.datepicker_default);
                if (!_.include(disable_fields, 'end_date'))   this.ui.end_date.datepicker(app_helper.datepicker_default);

                var that = this;
                _.each(disable_fields, function(field) { that.ui[field].attr('disabled', 'disabled') });
            },


            /*
             * onRender helpers
             */

            init_description_elastic_textarea: function() {
                this.ui.description.focus(function() {
                    var $this = $(this);
                    if (!$this.data('elastic-enabled')) {
                        $this.elastic().data('elastic-enabled', true);
                        $this.unbind('blur');   // this removes the issue when clicking a button doesn't work while textarea is focused
                    }
                });
            },


            /*
             * view event handlers
             */

            submit: function(e) {
                e.preventDefault();

                form_helper.clear_errors(this);

                var options = { exclude: this.model.disabled_fields() };

                var data = Backbone.Syphon.serialize(this, options);
                this.trigger('form:submit', projects_helper.unformat(data));
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

    return App.Projects.Edit;
});
