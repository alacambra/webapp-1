define(['app/form_helper', 'moment', 'advanced_string'], function(form_helper) {
    return {
        status_options: ['todo', 'new', 'assigned', 'on_hold', 'completed', 'archieved', 'requested', 'offered'],

        short_text: function(text, length) {
            if (!text || length === 0) {
                return '';
            }

            return text.length <= length ? text : text.substr(0, length) + ' &hellip;';
        },

        format_date: function(date) {
            if (!this.has_value(date)) return '';
            return moment(date * 1000).format(I18n.t('date_format'));
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
            data.startDate = this.has_value(data.startDate) ? moment(data.startDate, I18n.t('date_format')).unix() : 0;
            data.endDate = this.has_value(data.endDate) ? moment(data.endDate, I18n.t('date_format')).unix() : 0;
            return data;
        },

        has_value: function(val) {
            return !(val === 0 || is_blank(val));
        }
    }
});
