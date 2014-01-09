define(['moment', 'advanced_string'], function() {
    return {
        format_date: function(date) {
            if (!this.has_value(date)) return '';
            return moment(date * 1000).format(I18n.t('date_format'));
        },

        unformat: function(data) {
            data.date = this.has_value(data.date) ? moment(data.date, I18n.t('date_format')).unix() : 0;
            return data;
        },

        has_value: function(val) {
            return !(val === 0 || is_blank(val));
        }
    }
});
