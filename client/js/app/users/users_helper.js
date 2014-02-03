define(['app/view_helper',
        'advanced_string'],
function(view_helper) {
    return {
        format_date: function(date) {
            return !is_blank(date) ? view_helper.format_date(date) : '';
        },

        full_name: function(first_name, last_name) {
            if (_.isObject(first_name)) {
                var user = first_name;
                first_name = user.get('firstName');
                last_name = user.get('lastName');
            }
            return _.compact([first_name, last_name]).join(' ');
        },

        unformat: function(data) {
            data.birthDate = !is_blank(data.birthDate) ? view_helper.unformat_date(data.birthDate) : null;
            if (is_blank(data.password)) delete data.password; // do not send/save an unfilled password
            return data;
        },

        options_for_select: function(users) {
            var that = this;
            return users.map(function(user) {
                return [
                    user.get('id'),
                    that.full_name(user.get('firstName'), user.get('lastName'))
                ];
            });
        }
    }
});
