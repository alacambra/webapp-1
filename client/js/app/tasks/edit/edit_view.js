define(['app',
        'tpl!app/tasks/edit/templates/edit.tpl',
        'app/tasks/task_helper',
        'backbone_syphon',
        'jquery_ui'],
function(App, edit_tpl, task_helper) {
    App.module('Tasks.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            template: edit_tpl,

            className: 'edit',

            events: {
                'click button.js-submit': 'submit'
            },


            templateHelpers: task_helper,

            initialize: function () {
                this.on('render', function () {
                    var progress = task_helper.format_progress(this.model.get('progress'));
                    var $progress = this.$('#js-task-progress');

                    this.$('#js-task-startDate').datepicker({ dateFormat: 'dd.mm.yy' });
                    this.$('#js-task-endDate').datepicker({ dateFormat: 'dd.mm.yy' });

                    console.log(progress);

                    this.$('#js-task-progress-slider').slider({
                        range: 'min',
                        value: progress,
                        min: 0,
                        max: 100,
                        step: 5,
                        slide: function(event, ui) {
                            $progress.val(ui.value);
                        }
                    });
                    $progress.val(progress);
                });
            },


            onFormDataValid: function() {
                this.$('#js-task-save-indicator').fadeIn(300);
                this.$('.js-submit').addClass('disabled');
            },

            onFormDataInvalid: function(errors) {
                var $view = this.$el;

                var mark_errors = function(value, key) {
                    var $control_group = $view.find('#js-task-' + key).parent().parent();
                    var $error_msg = $('<span>', { class: 'help-block', text: value });
                    $control_group.append($error_msg).addClass('has-error');
                };

                this.clear_form_errors($view);
                _.each(errors, mark_errors);
            },

            onFormSaveFailed: function() {
                var $view = this.$el;

                $('#js-task-save-indicator').fadeOut(300, function() {
                    var $error_msg = $('<span>', { id: 'js-save-error', class: 'text-danger', text: 'save failed' });
                    var $submit_btn = $view.find('.js-submit');
                    $submit_btn.removeClass('disabled').addClass('btn-danger');
                    $submit_btn.parent().append($error_msg);
                });
            },


            submit: function(e) {
                e.preventDefault();

                this.clear_form_errors(this.$el);
                this.$('.js-submit').removeClass('btn-danger');
                this.$('#js-save-error').remove();

                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', task_helper.unformat(data));
            },


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

    return App.Tasks.Edit;
});
