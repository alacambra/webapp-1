define(['app/view_helper',
    'advanced_string'],
function(view_helper) {
    return {
        format_date: function(date) {
            return this.has_value(date) ? view_helper.format_date(date) : '';
        },

        full_name: function(first_name, last_name) {
            return _.compact([first_name, last_name]).join(' ');
        },

        unformat: function(data) {
            data.birthDate = this.has_value(data.birthDate) ? view_helper.unformat_date(data.birthDate) : 0;
            if (is_blank(data.password)) delete data.password; // do not send/save an unfilled password
            return data;
        },

        has_value: function(val) {
            return !(val === 0 || is_blank(val));
        }
    }
});
