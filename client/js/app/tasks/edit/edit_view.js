define(['app',
        'tpl!app/tasks/edit/templates/edit.tpl',
        'app/tasks/task_helper',
        'backbone_syphon',
        'jquery_elastic',
        'jquery_ui'],
function(App, edit_tpl, task_helper) {
    App.module('Tasks.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            template: edit_tpl,

            className: 'edit',

            ui: {
                description: '#js-task-description',
                start_date: '#js-task-startDate',
                end_date: '#js-task-endDate',
                progress: '#js-task-progress',
                progress_slider: '#js-task-progress-slider',
                duration: '#js-task-duration',
                duration_slider: '#js-task-duration-slider'
            },

            events: {
                'click button.js-submit': 'submit',
                'blur input#js-task-progress': 'update_progress',
                'blur input#js-task-duration': 'update_duration'
            },


            templateHelpers: task_helper,


            onRender: function () {
                this.init_description_elastic_textarea();
                this.init_datepicker();
                this.init_progress_slider();
                this.init_duration_slider();
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
                this.ui.start_date.datepicker({ dateFormat: 'dd.mm.yy' });
                this.ui.end_date.datepicker({ dateFormat: 'dd.mm.yy' });
            },


            init_progress_slider: function() {
                var that = this;
                var progress = task_helper.format_progress(this.model.get('progress'));

                this.ui.progress.val(progress);
                this.ui.progress_slider.slider({
                    range: 'min',
                    value: progress,
                    min: 0,
                    max: 100,
                    step: 5,
                    slide: function(event, ui) {
                        that.ui.progress.val(ui.value);
                    }
                });
            },


            init_duration_slider: function() {
                var that = this;
                var duration = this.model.get('duration') || 0;

                this.ui.duration.val(task_helper.format_duration(duration));
                this.ui.duration_slider.slider({
                    range: 'min',
                    value: duration,
                    min: 0,
                    max: 24 * 4 * 15,
                    step: 15,
                    slide: function(event, ui) {
                        that.ui.duration.val(task_helper.format_duration(ui.value));
                    }
                });
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
                this.trigger('form:submit', task_helper.unformat(data));
            },


            update_progress: function (event) {
                var progress = parseInt(this.ui.progress.val());
                if (isNaN(progress)) {
                    progress = 0;
                } else {
                    progress = task_helper.format_progress(progress / 100);
                }

                this.ui.progress_slider.slider('option', 'value', progress);
                this.ui.progress.val(progress);
            },


            update_duration: function (event) {
                var duration = task_helper.unformat_duration(this.ui.duration.val());

                this.ui.duration_slider.slider('option', 'value', duration);
            },


            /*
             * controller event handlers
             */

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

    return App.Tasks.Edit;
});
