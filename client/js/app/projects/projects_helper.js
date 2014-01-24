define(['app/view_helper', 'app/form_helper', 'advanced_string'], function(view_helper, form_helper) {
    return {
        status_options: ['todo', 'new', 'assigned', 'on_hold', 'completed', 'archieved', 'offered'],

        format_date: function(date) {
            return !is_blank(date) ? view_helper.format_date(date) : '';
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
            if (!_.isUndefined(data.status))    data.status = parseInt(data.status);
            if (!_.isUndefined(data.startDate)) data.startDate = !is_blank(data.startDate) ? view_helper.unformat_date(data.startDate) : null;
            if (!_.isUndefined(data.endDate))   data.endDate = !is_blank(data.endDate) ? view_helper.unformat_date(data.endDate) : null;
            return data;
        }
    }
});
