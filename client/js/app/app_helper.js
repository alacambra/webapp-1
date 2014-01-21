/** @module app_helper */

define(['i18n'], function() {
    return {
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
         * _.extend({}, app_helper.datepicker_default, { dateFormat: 'YY/MM/DD' });
         */
        datepicker_default: {
            dateFormat: I18n.t('date_format_picker'),
            firstDay: 1
        }
    }
});