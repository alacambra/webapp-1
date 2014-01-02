define(['moment', 'advanced_string'], function(moment) {
    return {
        status_options: ['todo', 'new', 'assigned', 'on_hold', 'completed', 'archieved', 'requested', 'offered'],
        priority_options: ['low', 'normal', 'high'],

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
            return I18n.t('task.status_options.' + this.status_options[status]);
        },

        priority_text: function(priority) {
            if (!this.priority_options[priority]) return '';
            return I18n.t('task.priority_options.' + this.priority_options[priority]);
        },

        format_duration: function(duration) {
            if (!this.has_value(duration)) return '';
            duration = moment.duration(duration, 'minutes');
            return parseInt(duration.asHours()) + ':' + pad(duration.asMinutes() % 60);
        },

        format_progress: function(progress) {
            if (progress < 0) {
                return 0;
            } else if (progress > 1) {
                return 100;
            }
            return parseInt(progress * 100);
        },

        select_for: function(model, attr, options) {
            var select_options = options.options || this[attr + '_options'];

            var text;
            var select = $('<select>', { name: attr, id: 'js-' + model + '-' + attr, class: options.class });
            _.each(select_options, function(item, idx) {
                text = I18n.t(model + '.' + attr + '_options' + '.' + item);
                select.append($('<option>', { value: idx, text: text, selected: options.selected == idx }));
            });

            return select[0].outerHTML;
        },

        unformat_duration: function (duration) {
            return moment.duration(duration, 'HH:mm').asMinutes();
        },

        unformat: function(data) {
            data.status = parseInt(data.status);
            data.priority = parseInt(data.priority);
            data.startDate = this.has_value(data.startDate) ? moment(data.startDate, I18n.t('date_format')).unix() : 0;
            data.endDate = this.has_value(data.endDate) ? moment(data.endDate, I18n.t('date_format')).unix() : 0;
            data.duration = this.unformat_duration(data.duration);
            data.progress = parseFloat(data.progress) / 100 || 0;
            return data;
        },

        has_value: function(val) {
            return !(val === null || val === undefined || val === 0 || (typeof val === 'string' && val.replace(/ /g, '').length == 0));
        }
    }
});
