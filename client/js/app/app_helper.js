/** @module app_helper */

define(['i18n'], function() {
    return {
        /**
         * Creates a backbone history URL.
         *
         * @example
         * // returns #tasks/17
         * url_for('tasks', 17)
         *
         * @example
         * // returns #tasks/23/edit
         * url_for('tasks', 'edit', 23)
         *
         * @example
         * // returns #tasks/23/efforts
         * url_for('tasks', 23, 'efforts')
         *
         * @example
         * // returns #tasks/23/efforts/new
         * url_for('tasks', 23, 'efforts', 'new')
         *
         * @param name {string} - Resource or model name.
         * @param action_or_id {string|number} - REST action or ID of the resource if action is omitted.
         * @param [id_or_action] {number} - ID or action of the resource, only if action is set explicit.
         * @param [sub_action] {string} - Action of the nested resource.
         * @returns {string} - history URL.
         */
        url_for: function(name, action_or_id, id_or_action, sub_action) {
            var action = null;
            var id = id_or_action;

            if (id_or_action === undefined) {
                id = action_or_id;
            } else {
                if (_.isNumber(id_or_action)) {
                    action = action_or_id;
                } else {
                    id = action_or_id;
                    action = id_or_action;
                }
            }

            var link = '#' + name;

            if (id !== undefined) link += '/' + id;
            if (action !== null) link += '/' + action;
            if (sub_action !== undefined) link += '/' + sub_action;

            return link;
        },


        /**
         * Builds an url with the specified arguments in order and set '#' at the beginning.
         * Also checks if a argument is undefined and throws an error.
         *
         * @returns {string} - url beginning with a '#' and appended arguments seperate by '/'
         */
        build_url: function () {
            // convert arguments (is a object) to an array.
            arguments = Array.prototype.slice.call(arguments);

            _.each(arguments, function (argument) {
                if (_.isUndefined(argument)) {
//                    throw new Error('\'build_url()\' has an undefined argument!');
                }
            });

            return '#' + arguments.join('/');
        },


        /**
         * Truncates a given text after a given length if text is longer than length.
         * The last characters will be replaced with the omission for a total length not exceeding length (including omission).
         *
         * @param text {string} - The text which should be shortened.
         * @param [length=100] {number} - The maximum length of the resulting string.
         * @param [omission=' …'] {string} - The characters replacing the removed text.
         * @returns {string} - Truncated text.
         */
        truncate: function(text, length, omission) {
            if (typeof text !== 'string') return '';
            if (length === undefined) length = 100;
            if (omission === undefined) omission = ' …';

            return text.length <= length ? text : text.substr(0, length - omission.length) + omission;
        },


        /**
         * Default datepicker object, use $.extend to customize your datepicker object.
         *
         * @example
         * // using other date format 'YY/MM/DD'
         * $.extend({}, app_helper.datepicker_default, { dateFormat: 'YY/MM/DD' });
         */
        datepicker_default: {
            dateFormat: I18n.t('date_format_picker'),
            firstDay: 1
        }
    }
});