define(['app',
        'tpl!app/efforts/edit/templates/edit.tpl',
        'app/app_helper',
        'app/form_helper',
        'app/efforts/effort_helper',
        'backbone_syphon',
        'jquery_ui'],
function(App, edit_tpl, app_helper, form_helper, effort_helper) {
    App.module('Efforts.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            template: edit_tpl,

            className: 'edit',

            cssPrefix: '#js-effort-',

            ui: {
                date: '#js-effort-date',
                time: '#js-effort-time',
                time_slider: '#js-effort-time-slider',

                submit_button: '#js-effort-submit',
                submit_error_msg: '#js-effort-submit-error-msg',
                save_indicator: '#js-effort-save-indicator'
            },

            events: {
                'click button.js-submit': 'submit',
                'click a.js-home': 'go_to_home',
                'click a.js-tasks': 'go_to_tasks',
                'click a.js-task': 'go_to_task',
                'click a.js-efforts': 'go_to_efforts',
                'click a.js-effort': 'go_to_effort',
                'blur input#js-effort-time': 'update_time'
            },


            templateHelpers: $.extend({}, effort_helper, app_helper),


            onRender: function () {
                this.init_datepicker();
                this.init_time_slider();
            },



            /*
             * onRender helpers
             */

            init_datepicker: function() {
                this.ui.date.datepicker(app_helper.datepicker_default);
            },


            init_time_slider: function() {
                var that = this;
                var time = this.model.get('time') || 0;

                this.ui.time.val(effort_helper.format_time(time) || 0);
                this.ui.time_slider.slider({
                    range: 'min',
                    value: time,
                    min: 0,
                    max: 24 * 4 * 15,
                    step: 15,
                    slide: function(event, ui) {
                        that.ui.time.val(effort_helper.format_time(ui.value) || 0);
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
                this.trigger('form:submit', effort_helper.unformat(data));
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            },

            go_to_tasks: function (event) {
                event.preventDefault();
                App.trigger('tasks:list');
            },

            go_to_task: function (event) {
                event.preventDefault();
                App.trigger('task:show', this.model.get('task_id'));
            },

            go_to_efforts: function (event) {
                event.preventDefault();
                App.trigger('efforts:list', this.model.get('task_id'));
            },

            go_to_effort: function (event) {
                event.preventDefault();
                App.trigger('effort:show', this.model.get('id'));
            },


            update_time: function (event) {
                var time = this.ui.time.val();

                if (time.search(':') < 0) {
                    time += ':00';
                    this.ui.time.val(time);
                }

                time = effort_helper.unformat_time(time);

                if (time === 0) {
                    this.ui.time.val('0:00');
                }

                this.ui.time_slider.slider('option', 'value', time);
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
