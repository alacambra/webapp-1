define(['app/view_helper', 'app/form_helper', 'moment', 'advanced_string'], function(view_helper, form_helper) {
    return {
        status_options: ['todo', 'new', 'assigned', 'on_hold', 'completed', 'archieved', 'offered'],

        format_date: function(date) {
            return this.has_value(date) ? view_helper.format_date(date) : '';
        },

        status_text: function(status) {
            if (!this.status_options[status]) return '';
            return I18n.t('project.status_options.' + this.status_options[status]);
        },

        select_for: function(model, attr, options) {
            var default_options = { options: this[attr + '_options'] };
            options = _.extend(default_options, options);

            return form_helper.select_for(model, attr, options);
        },

        unformat: function(data) {
            data.status = parseInt(data.status);
            data.startDate = this.has_value(data.startDate) ? view_helper.unformat_date(data.startDate) : 0;
            data.endDate = this.has_value(data.endDate) ? view_helper.unformat_date(data.endDate) : 0;
            return data;
        },

        has_value: function(val) {
            return !(val === 0 || is_blank(val));
        }
    }
});
