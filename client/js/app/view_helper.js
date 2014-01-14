/** @module view_helper */

define(['i18n'], function() {
    return {
        format_date: function(date) {
            return moment(date * 1000).format(I18n.t('date_format'));
        },

        unformat_date: function(date) {
            return moment(date, I18n.t('date_format')).unix();
        },

        format_time: function(time) {
            time = moment.duration(time, 'minutes');
            return parseInt(time.asHours()) + ':' + pad(time.asMinutes() % 60);
        },

        unformat_time: function(time) {
            return moment.duration(time, 'HH:mm').asMinutes();
        }
    }
});