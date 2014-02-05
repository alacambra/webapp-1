define(['app',
        'tpl!app/efforts/edit/templates/edit.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/form_helper',
        'app/efforts/efforts_helper',
        'backbone_syphon',
        'jquery_ui'],
function(App, edit_tpl, app_helper, view_helper, form_helper, efforts_helper) {
    App.module('Efforts.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            className: 'edit',
            template: edit_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, efforts_helper),

            cssPrefix: '#js-effort-',

            
            ui: {
                date: '#js-effort-date',
                time: '#js-effort-time',
                time_slider: '#js-effort-time-slider',
                comment: '#js-effort-comment',

                submit_button: '#js-effort-submit',
                submit_error_msg: '#js-effort-submit-error-msg',
                save_indicator: '#js-effort-save-indicator'
            },

            
            events: {
                'click a[data-navigate]': App.handle_link,
                'click button.js-submit': 'submit',
                'blur input#js-effort-time': 'update_time'
            },


            serializeData: function() {
                return _.extend({}, this.model.attributes, {
                    task_id: this.model.task_id
                });
            },


            onRender: function () {
                this.init_datepicker();
                this.init_time_slider();

                form_helper.extend_fields({ maxlength: {} }, this);
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

                this.ui.time.val(efforts_helper.format_time(time) || 0);
                this.ui.time_slider.slider({
                    range: 'min',
                    value: time,
                    min: 0,
                    max: 24 * 4 * 15,
                    step: 15,
                    slide: function(event, ui) {
                        that.ui.time.val(efforts_helper.format_time(ui.value) || 0);
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
                this.trigger('form:submit', efforts_helper.unformat(data));
            },


            update_time: function (event) {
                var time = this.ui.time.val();

                if (time.search(':') < 0) {
                    time += ':00';
                    this.ui.time.val(time);
                }

                time = efforts_helper.unformat_time(time);

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
