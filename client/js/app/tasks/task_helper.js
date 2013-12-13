define(['moment', 'advanced_string'], function(moment){
    return {
        format_date: function(date) {
            if (date == null || date === undefined) return '';
            return moment(date * 1000).format('DD.MM.YYYY');
        },

        status_text: function(status) {
            var texts = ['- Status -', 'ToDo', 'New', 'Assigned', 'On hold', 'Completed', 'Archieved', 'Requested', 'Offered'];
            return texts[status] || '';
        },

        priority_text: function(priority) {
            var texts = ['- Priority -', 'Low', 'Normal', 'High'];
            return texts[priority] || '';
        },

        format_duration: function(duration) {
            if (duration == null || duration === undefined) return '';
            duration = moment.duration(duration, 'minutes');
            return parseInt(duration.asHours()) + ':' + pad(duration.asMinutes() % 60);
        },

        format_progress: function(progress) {
            if (progress == null || progress === undefined) return '';
            return progress * 100 + '%';
        }
    }
});
