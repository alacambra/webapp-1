/** @module view_helper */

define(['i18n', 'moment'], function(i18n, moment) {
    return {
        /**
         * Format specified date into current locale date format.
         *
         * @param date - value of date in seconds
         * @returns {string} - formatted date depending on current locale
         */
        format_date: function(date) {
            return moment(date * 1000).format(I18n.t('date_format'));
        },

        /**
         * Unformat date from current locale date format into date value in seconds.
         *
         * @param date - formatted date
         * @returns {number} - date value in seconds
         */
        unformat_date: function(date) {
            return moment(date, I18n.t('date_format')).unix();
        },

        /**
         * Format specified time into the format HH:mm.
         *
         * @param time - time in minutes
         * @returns {string} - formatted time
         */
        format_time: function(time) {
            time = moment.duration(time, 'minutes');
            return parseInt(time.asHours()) + ':' + pad(time.asMinutes() % 60);
        },

        /**
         * Unformat time into minutes.
         *
         * @param time - formatted time
         * @returns {number} - time in minutes
         */
        unformat_time: function(time) {
            return moment.duration(time, 'HH:mm').asMinutes();
        }
    }
});