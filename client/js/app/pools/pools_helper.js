define(['app/view_helper',
        'app/form_helper',
        'advanced_string'],
function(view_helper, form_helper) {
    return {
        country_options: [[0, 'unselected'], [1, 'germany'], [2, 'great_britain'], [3, 'austria'], [4, 'switzerland']],
        employee_count_options: [[0, 'unselected'], [1,'10'], [2, '50'], [3, '200'], [4, '500'], [5, 'many']],

        format_date: function(date) {
            return !is_blank(date) ? view_helper.format_date(date) : '';
        },

        country_text: function(status) {
            if (!this.country_options[status]) return '';
            return I18n.t('pool.country_options.' + this.country_options[status][1]);
        },

        employee_count_text: function(priority) {
            if (!this.employee_count_options[priority]) return '';
            return I18n.t('pool.employee_count_options.' + this.employee_count_options[priority][1]);
        },

        select_for: function(model, attr, options) {
            var default_options = { options: this[attr.underscore() + '_options'] };
            options = _.extend(default_options, options);

            return form_helper.select_for(model, attr, options);
        },

        unformat: function(data) {
            data.country = parseInt(data.country) || 0;
            data.foundingDate = !is_blank(data.foundingDate) ? view_helper.unformat_date(data.foundingDate) : null;
            data.employeeCount = parseInt(data.employeeCount) || 0;
            return data;
        }
    }
});
