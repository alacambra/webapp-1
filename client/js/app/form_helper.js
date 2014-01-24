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
         * @param model - Name of the model
         * @param attr - Name of the attribute (will get suffix '_options' for locales)
         * @param options - optional options for this select element
         * @returns {string} - select element with its options as a html text
         */
        select_for: function(model, attr, options) {
            var text;
            var select = $('<select>', { name: attr, id: 'js-' + model + '-' + attr, class: options.class });
            _.each(options.options, function(item, idx) {
                if (_.isArray(item)) {
                    idx = item[0];
                    text = item[1];
                } else {
                    text = I18n.t(model + '.' + attr + '_options' + '.' + item);
                }

                select.append($('<option>', { value: idx, text: text, selected: options.selected == idx }));
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
         * @param view - View that is rendering the form
         * @param errors - errors object that contains the error information
         */
        mark_errors: function(view, errors) {
            var $view = view.$el;

            var mark_errors = function(value, key) {
                var $control_group = $view.find(view.cssPrefix + key).parent().parent();
                var $error_msg = $('<span>', { class: 'help-block', text: value });
                $control_group.append($error_msg).addClass('has-error');
            };

            _.each(errors, mark_errors);

            view.ui.submit_button.addClass('btn-danger');
        },


        /**
         * Removed all added error marks and messages.
         *
         * @param view - View that need to be cleaned from errors
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
         * @param view - View that shows load indicator
         */
        show_load_indicator: function(view) {
            view.ui.save_indicator.fadeIn(300);
            view.ui.submit_button.addClass('disabled');
        },


        /**
         * Shows error when saving a model failed.
         *
         * @param view - View that has a submit button to save its model
         * @param message - Message to be shown
         */
        show_save_error: function(view, message) {
            message = message || I18n.t('errors.save_failed');

            view.ui.save_indicator.fadeOut(300, function() {
                view.ui.submit_button.removeClass('disabled').addClass('btn-danger');
                view.ui.submit_error_msg.text(message).show();
            });
        }
    }
});