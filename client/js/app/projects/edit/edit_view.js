define(['app',
        'tpl!app/projects/edit/templates/edit.tpl',
        'app/app_helper',
        'app/form_helper',
        'app/projects/project_helper',
        'backbone_syphon',
        'jquery_elastic',
        'jquery_ui'],
function(App, edit_tpl, app_helper, form_helper, project_helper) {
    App.module('Projects.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            template: edit_tpl,

            className: 'edit',

            cssPrefix: '#js-project-',

            ui: {
                description: '#js-project-description',
                start_date: '#js-project-startDate',
                end_date: '#js-project-endDate',

                submit_button: '#js-project-submit',
                submit_error_msg: '#js-project-submit-error-msg',
                save_indicator: '#js-project-save-indicator'
            },

            events: {
                'click button.js-submit': 'submit',
                'click a.js-home': 'go_to_home',
                'click a.js-projects': 'go_to_projects',
                'click a.js-project': 'go_to_project'
            },


            templateHelpers: project_helper,


            onRender: function () {
                this.init_description_elastic_textarea();
                this.init_datepicker();
            },


            /*
             * onRender helpers
             */

            init_description_elastic_textarea: function() {
                this.ui.description.focus(function() {
                    var $this = $(this);
                    if (!$this.data('elastic-enabled')) {
                        $this.elastic().data('elastic-enabled', true);
                    }
                });
            },


            init_datepicker: function() {
                this.ui.start_date.datepicker(app_helper.datepicker_default);
                this.ui.end_date.datepicker(app_helper.datepicker_default);
            },


            /*
             * view event handlers
             */

            submit: function(e) {
                e.preventDefault();

                form_helper.clear_errors(this);

                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', project_helper.unformat(data));
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            },


            go_to_projects: function (event) {
                event.preventDefault();
                App.trigger('projects:list');
            },


            go_to_project: function (event) {
                event.preventDefault();
                App.trigger('project:show', this.model.get('id'));
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
