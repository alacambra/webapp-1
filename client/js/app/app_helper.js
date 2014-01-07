/** @module app_helper */

define({
    /**
     * Creates a backbone REST URL for a given resource.
     *
     * @example
     * // returns #tasks/17
     * url_for('tasks', 17)
     *
     * @example
     * // returns #tasks/23/edit
     * url_for('tasks', 'edit', 23)
     *
     * @param name {string} - Resource or model name.
     * @param action_or_id {string|number} - REST action or ID of the resource if action is omitted.
     * @param [id] {number} - ID of the resource, only if action is set explicit.
     * @returns {string} - REST URL.
     */
    url_for: function(name, action_or_id, id) {
        var action = null;

        if (id === undefined) {
            id = action_or_id;
        } else {
            action = action_or_id;
        }

        var link = '#' + name;

        if (id !== undefined) link += '/' + id;
        if (action !== null) link += '/' + action;

        return link;
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
});