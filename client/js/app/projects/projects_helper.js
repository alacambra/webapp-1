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

        format_duration: function(duration) {
            return !is_blank(duration) ? view_helper.format_time(duration) : '';
        },

        format_progress: function(progress) {
            if (!_.isNumber(progress) || isNaN(progress) || progress < 0) {
                return 0;
            } else if (progress > 1) {
                return 100;
            }
            return parseInt(progress * 100);
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
            if (!_.isUndefined(data.progress))  data.progress = parseFloat(data.progress) / 100 || 0;
            return data;
        }
    }
});
