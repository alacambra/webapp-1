define(['app',
    'tpl!app/tasks/show/templates/show.tpl'],
function(App, show_tpl) {
    App.module('Tasks.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.Task = Marionette.ItemView.extend({
            className: 'list-row',
            template: show_tpl,


            templateHelpers: {
                format_date: function(date) {
                    if (date == null || date === undefined) return '';
                    return moment(date * 1000).format('DD.MM.YYYY');
                },

                status_text: function(status) {
                    var texts = ['ToDo', 'New', 'Assigned', 'On hold', 'Completed', 'Archieved', 'Requested', 'Offered'];
                    return texts[status] || '';
                },

                priority_text: function(priority) {
                    var texts = ['Low', 'Normal', 'High'];
                    return texts[priority] || '';
                },

                format_duration: function(duration) {
                    if (duration == null || duration === undefined) return '';
                    var duration = moment.duration(duration, 'minutes');
                    return parseInt(duration.asHours()) + ':' + pad(duration.asMinutes() % 60);
                },

                format_progress: function(progress) {
                    if (progress == null || progress === undefined) return '';
                    return progress * 100 + '%';
                }
            }
        });
    });

    return App.Tasks.Show;
});
