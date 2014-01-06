define(['app',
        'tpl!app/projects/edit/templates/edit.tpl',
        'app/projects/project_helper',
        'app/app_helper',
        'backbone_syphon',
        'jquery_elastic',
        'jquery_ui'],
function(App, edit_tpl, project_helper, app_helper) {
    App.module('Projects.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            template: edit_tpl,

            className: 'edit',

            ui: {
                description: '#js-project-description',
                start_date: '#js-project-startDate',
                end_date: '#js-project-endDate'
            },

            events: {
                'click button.js-submit': 'submit'
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

                this.clear_form_errors(this.$el);
                this.$('.js-submit').removeClass('btn-danger');
                this.$('#js-save-error').remove();

                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', project_helper.unformat(data));
            },


            /*
             * controller event handlers
             */

            onFormDataValid: function() {
                this.$('#js-project-save-indicator').fadeIn(300);
                this.$('.js-submit').addClass('disabled');
            },


            onFormDataInvalid: function(errors) {
                var $view = this.$el;

                var mark_errors = function(value, key) {
                    var $control_group = $view.find('#js-project-' + key).parent().parent();
                    var $error_msg = $('<span>', { class: 'help-block', text: value });
                    $control_group.append($error_msg).addClass('has-error');
                };

                this.clear_form_errors($view);
                _.each(errors, mark_errors);
            },


            onFormSaveFailed: function() {
                var $view = this.$el;

                $('#js-project-save-indicator').fadeOut(300, function() {
                    var $error_msg = $('<span>', { id: 'js-save-error', class: 'text-danger', text: I18n.t('errors.save_failed') });
                    var $submit_btn = $view.find('.js-submit');
                    $submit_btn.removeClass('disabled').addClass('btn-danger');
                    $submit_btn.parent().append($error_msg);
                });
            },


            /*
             * private helpers
             */

            clear_form_errors: function($view) {
                var $form = $view.find('form');
                $form.find('.help-block').each(function() {
                    $(this).remove();
                });
                $form.find('.form-group.has-error').each(function() {
                    $(this).removeClass('has-error');
                });
            }
        });
    });

    return App.Projects.Edit;
});
