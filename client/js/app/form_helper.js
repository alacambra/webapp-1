/** @module form_helper */

define(['i18n'],
function() {
    return {
        /**
         * Creates a select element for the specified combination of model and attribute.
         *
         * @example
         * // locale de
         * ...
         * project: {
         *   priority_options: {
         *     high: 'Hoch',
         *     normal: 'Normal',
         *     low: 'Niedrig'
         *   }
         * },
         * ...
         *
         * // usage in a template, add class 'pretty' and select normal (index: 1)
         * ...
         * <%= select_for('project', 'priority', { selected: 1, class: 'pretty' }) %>
         * ...
         *
         * @param model {string} - Name of the model
         * @param attr {string} - Name of the attribute (will get suffix '_options' for locales)
         * @param options {object|string[]} - options for this select element
         * @returns {string} - select element with its options as a html text
         */
        select_for: function(model, attr, options) {
            var text;
            var select = $('<select>', { name: attr, id: 'js-' + model + '-' + attr, class: options.class });
            _.each(options.options, function(item, idx) {
                text = I18n.t(model + '.' + attr.underscore() + '_options' + '.' + item[1]);

                select.append($('<option>', { value: idx, text: text, selected: options.selected == item[0] }));
            });

            return select[0].outerHTML;
        },

        /**
         * Function that highlights errors which occurs on validation.
         * Also it appends an error message to the specific form element.
         *
         * @example
         * // inside template of view A:
         * ... &lt;input id='js-view-a-attr1' ...&gt; ...
         *
         * // inside view A
         * ...
         * var errors = {
         *   attr1: 'Attr 1 is empty'
         * }
         *
         * form_helper.mark_errors(this, errors);
         * ...
         *
         * // result: if input#js-view-a-attr1 is empty this function marks the input red and adds the specific message
         *
         * @param view {object} - View that is rendering the form
         * @param errors {object} - contains the error information: key = field name, value = error message
         */
        mark_errors: function(view, errors) {
            var $view = view.$el;

            var mark_errors = function(value, key) {
                var $field = $view.find(view.cssPrefix + key.dasherize());
                var $form_group = $field.closest('.form-group');
                var $label = $form_group.find('label');
                var $error_msg = $('<span>', { class: 'help-block', text: value });
                $label.after($error_msg);
                $form_group.addClass('has-error');
            };

            _.each(errors, mark_errors);

            view.ui.submit_button.addClass('btn-danger');
        },


        /**
         * Removed all added error marks and messages.
         *
         * @param view {object} - View that need to be cleaned from errors
         */
        clear_errors: function(view) {
            var $form = view.$el.find('form');

            $form.find('.help-block').remove();
            $form.find('.form-group.has-error').removeClass('has-error');

            view.ui.submit_button.removeClass('btn-danger');
            view.ui.submit_error_msg.hide();
        },


        /**
         * Displays a load indicator in the specific view.
         *
         * @param view {object} - View that shows load indicator
         */
        show_load_indicator: function(view) {
            view.ui.save_indicator.fadeIn(300);
            view.ui.submit_button.addClass('disabled');
        },


        /**
         * Shows error when saving a model failed.
         *
         * @param view {object} - View that has a submit button to save its model
         * @param [message=I18n.t('errors.save_failed')] {string} - Message to be displayed
         */
        show_save_error: function(view, message) {
            message = message || I18n.t('errors.save_failed');

            view.ui.save_indicator.fadeOut(300, function() {
                view.ui.submit_button.removeClass('disabled').addClass('btn-danger');
                view.ui.submit_error_msg.text(message).show();
            });
        },


        /**
         * Wrapper for disable_fields, mark_mandatory_fields and set_fields_maxlength.
         *
         * @example
         * // options to call each method with specific options
         * {
         *     disable: { if: !this.model.isNew() },
         *     mandatory: { mandatory_fields: this.model.get_mandatory_fields() },
         *     maxlength: {}
         * }
         * @param options {object} - Keys specifiy which method to call, value object is passed as options to called method.
         * @param view {object} - Marionette view
         */
        extend_fields: function(options, view) {
            var that = this;
            _.each(options, function(field_options, type) {
                switch(type) {
                    case 'disable': that.disable_fields(view, field_options); break;
                    case 'mandatory': that.mark_mandatory_fields(view, field_options); break;
                    case 'maxlength': that.set_fields_maxlength(view, field_options); break;
                }
            })
        },


        /**
         * Adds disabled attributes for disabled form elements.
         *
         * @param view {object} - Marionette view
         * @param options {object} - Options to override default options.
         * @param [options.disable_fields] {string[]} - List of attributes, which should be disabled. Attribute names will
         *                                              be converted from camelcase to underscore (fooBar -> foo_bar).
         *                                              If not given attributes will be read from model disabled_fields
         *                                              method.
         *                                              Attributes must be defined as view.ui elements to be disableable.
         * @param [options.if=true] {boolean} - Only disable fields if the condition is met.
         */
        disable_fields: function(view, options) {
            var default_options = {
                if: true,
                disable_fields: false
            };

            options = _.extend(default_options, options || {});

            if (!options.if) return;

            if (!options.disable_fields) {
                options.disable_fields = _.map(view.model.disabled_fields, function (item) {
                    return item.underscore();
                });
            }

            _.each(options.disable_fields, function (field) {
                if (!_.isUndefined(view.ui[field])) {
                    view.ui[field].attr('disabled', 'disabled');
                }
            });
        },


        /**
         * Sets mandatory indicator icon for given form elements.
         *
         * @param view {object} - Marionette view
         * @param options {object} - Options to override default options.
         * @param [options.mandatory_fields] {string[]} - List of attributes, which should be marked as required.
         *                                                Attribute names will be converted from camelcase to underscore
         *                                                (fooBar -> foo_bar).
         *                                                If not given attributes will be read from model
         *                                                mandatory_fields method.
         *                                                Attributes must be defined as view.ui elements to be requireable.
         * @param [options.if=true] {boolean} - Only mark fields if the condition is met.
         */
        mark_mandatory_fields: function(view, options) {
            var default_options = {
                if: true,
                mandatory_fields: false
            };

            options = _.extend(default_options, options || {});

            if (!options.if) return;

            var fields = options.mandatory_fields ? options.mandatory_fields : view.model.mandatory_fields;

            fields = _.map(fields, function (item) {
                return item.underscore();
            });

            var $mandatory_indicator = $('<span>', {
                class: 'input-group-addon mandatory-indicator',
                title: I18n.t('mandatory_field')
            }).append(
                $('<span>', { class: 'glyphicon glyphicon-asterisk' })
            );

            _.each(fields, function (field) {
                if (!_.isUndefined(view.ui[field])) {
                    view.ui[field].wrap($('<div>', { class: 'input-group'})).after($mandatory_indicator.clone());
                }
            });
        },


        /**
         * Sets maxlength attribute for given form elements.
         *
         * @param view {object} - Marionette view
         * @param options {object} - Options to override default options.
         * @param [options.max_length_fields] {object[]} - List of attributes (name: length), which should be set as maxlength.
         *                                                 Attribute names will be converted from camelcase to underscore
         *                                                 (fooBar -> foo_bar).
         *                                                 If not given attributes will be read from model
         *                                                 max_length_fields method.
         *                                                 Attributes must be defined as view.ui elements to be editable.
         * @param [options.if=true] {boolean} - Only mark fields if the condition is met.
         */
        set_fields_maxlength: function(view, options) {
            var default_options = {
                if: true,
                max_length_fields: view.model.max_length_fields
            };

            options = _.extend(default_options, options || {});

            if (!options.if) return;

            _.each(options.max_length_fields, function (length, field) {
                var $field = view.ui[field.underscore()];
                if (!_.isUndefined($field)) {
                    $field.attr('maxlength', length);
                }
            });
        }
    }
});