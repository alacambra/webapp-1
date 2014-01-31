define(['app',
        'tpl!app/tasks/edit/templates/edit.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/form_helper',
        'app/tasks/tasks_helper',
        'backbone_syphon',
        'jquery_elastic',
        'jquery_ui'],
function(App, edit_tpl, app_helper, view_helper, form_helper, tasks_helper) {
    App.module('Tasks.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            className: 'edit',
            template: edit_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, tasks_helper),

            cssPrefix: '#js-task-',

            ui: {
                description: '#js-task-description',
                status: '#js-task-status',
                priority: '#js-task-priority',
                start_date: '#js-task-startDate',
                end_date: '#js-task-endDate',
                duration: '#js-task-duration',
                duration_slider: '#js-task-duration-slider',
                progress: '#js-task-progress',
                progress_slider: '#js-task-progress-slider',

                submit_button: '#js-task-submit',
                submit_error_msg: '#js-task-submit-error-msg',
                save_indicator: '#js-task-save-indicator'
            },

            
            events: {
                'click a[data-navigate]': App.handle_link,
                'click button.js-submit': 'submit',
                'blur input#js-task-progress': 'update_progress',
                'blur input#js-task-duration': 'update_duration'
            },


            initialize: function(options) {
                var default_options = {
                    users: null
                };
                _.extend(this.templateHelpers, default_options, options);
            },


            onRender: function () {
                var disable_fields = _.map(this.model.disabled_fields, function(item) {
                    return item.underscore();
                });

                this.init_description_elastic_textarea();

                this.init_duration_slider(_.include(disable_fields, 'duration'));
                this.init_progress_slider(_.include(disable_fields, 'progress'));

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


            init_duration_slider: function(disabled) {
                if (_.isUndefined(disabled)) disabled = false;

                var that = this;
                var duration = this.model.get('duration') || 0;

                this.ui.duration.val(tasks_helper.format_duration(duration) || 0);
                this.ui.duration_slider.slider({
                    range: 'min',
                    value: duration,
                    min: 0,
                    max: 24 * 4 * 15,
                    step: 15,
                    disabled: disabled,
                    slide: function(event, ui) {
                        that.ui.duration.val(tasks_helper.format_duration(ui.value) || 0);
                    }
                });
            },


            init_progress_slider: function(disabled) {
                if (_.isUndefined(disabled)) disabled = false;

                var that = this;
                var progress = tasks_helper.format_progress(this.model.get('progress'));

                this.ui.progress.val(progress);
                this.ui.progress_slider.slider({
                    range: 'min',
                    value: progress,
                    min: 0,
                    max: 100,
                    step: 5,
                    disabled: disabled,
                    slide: function(event, ui) {
                        that.ui.progress.val(ui.value);
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
                this.trigger('form:submit', tasks_helper.unformat(data));
            },


            update_progress: function (event) {
                var progress = tasks_helper.format_progress(parseInt(this.ui.progress.val()) / 100);

                this.ui.progress_slider.slider('option', 'value', progress);
                this.ui.progress.val(progress);
            },


            update_duration: function (event) {
                var duration = this.ui.duration.val();

                if (duration.search(':') < 0) {
                    duration += ':00';
                    this.ui.duration.val(duration);
                }

                duration = tasks_helper.unformat_duration(this.ui.duration.val());

                if (duration === 0) {
                    this.ui.duration.val('0:00');
                }

                this.ui.duration_slider.slider('option', 'value', duration);
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

    return App.Tasks.Edit;
});
