define(['app/form_helper', 'moment', 'advanced_string'], function(form_helper) {
    return {
        format_date: function(date) {
            if (!this.has_value(date)) return '';
            return moment(date * 1000).format(I18n.t('date_format'));
        },

        full_name: function(first_name, last_name) {
            return [first_name, last_name].join(' ');
        },

        unformat: function(data) {
            data.birthDate = this.has_value(data.birthDate) ? moment(data.birthDate, I18n.t('date_format')).unix() : 0;
            if (is_blank(data.password)) delete data.password; // do not send/save an unfilled password
            return data;
        },

        has_value: function(val) {
            return !(val === 0 || is_blank(val));
        }
    }
});
