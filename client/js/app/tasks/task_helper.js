define(['moment', 'advanced_string'], function(moment) {
    return {
        status_options: ['ToDo', 'New', 'Assigned', 'On hold', 'Completed', 'Archieved', 'Requested', 'Offered'],
        priority_options: ['Low', 'Normal', 'High'],

        short_text: function(text, length) {
            if (!text || length === 0) {
                return '';
            }

            return text.length <= length ? text : text.substr(0, length) + '...';
        },

        format_date: function(date) {
            if (!this.has_value(date)) return '';
            return moment(date * 1000).format('DD.MM.YYYY');
        },

        status_text: function(status) {
            return this.status_options[status] || '';
        },

        priority_text: function(priority) {
            return this.priority_options[priority] || '';
        },

        format_duration: function(duration) {
            if (!this.has_value(duration)) return '';
            duration = moment.duration(duration, 'minutes');
            return parseInt(duration.asHours()) + ':' + pad(duration.asMinutes() % 60);
        },

        format_progress: function(progress) {
            if (!this.has_value(progress)) return '';
            return parseInt(progress * 100) + '%';
        },

        select_for: function(model, attr, options) {
            var select_options = options.options || this[attr + '_options'];

            var select = $('<select>', { name: attr, id: 'js-' + model + '-' + attr, class: options.class });
            _.each(select_options, function(item, idx) {
                select.append($('<option>', { value: idx, text: item, selected: options.selected == idx }));
            });

            return select[0].outerHTML;
        },

        unformat: function(data) {
            data.status = parseInt(data.status);
            data.priority = parseInt(data.priority);
            data.startDate = this.has_value(data.startDate) ? moment(data.startDate, 'DD.MM.YYYY').unix() : 0;
            data.endDate = this.has_value(data.endDate) ? moment(data.endDate, 'DD.MM.YYYY').unix() : 0;
            data.duration = moment.duration(data.duration, 'HH:mm').asMinutes();
            data.progress = parseFloat(data.progress) / 100 || 0;
            return data;
        },

        has_value: function(val) {
            return !(val === null || val === undefined || val === 0 || (typeof val === 'string' && val.replace(/ /g, '').length == 0));
        }
    }
});
