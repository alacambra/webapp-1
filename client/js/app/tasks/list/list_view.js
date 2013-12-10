define(['app',
        'tpl!app/tasks/list/templates/list.tpl',
        'tpl!app/tasks/list/templates/list_item.tpl'],
       function(App, list_tpl, list_item_tpl) {
    App.module('Tasks.List', function(List, App, Backbone, Marionette, $, _) {
        List.Task = Marionette.ItemView.extend({
            template: list_item_tpl,

            templateHelpers: {
                format_date: function(date) {
                    return moment(date).format('DD.MM.YYYY')
                },

                status_text: function(status) {
                    var status_texts = [
                        'ToDo',
                        'New',
                        'Assigned',
                        'On hold',
                        'Completed',
                        'Archieved',
                        'Requested',
                        'Offered'
                    ];

                    return status_texts[status] || '-';
                },

                priority_text: function(status) {
                    var status_texts = [
                        'Low',
                        'Normal',
                        'High'
                    ];

                    return status_texts[status] || '-';
                },

                format_duration: function(duration) {
                    var duration = moment.duration(duration, 'minutes');
                    return parseInt(duration.asHours()) + ':' + pad(duration.asMinutes() % 60);
                },

                format_progress: function(progress) {
                    return progress * 100 + '%';
                }
            }
        });


        List.Tasks = Marionette.CompositeView.extend({
            tagName: 'div',
            id: 'tasks',
            template: list_tpl,
            itemView: List.Task
        })
    });

    return App.Tasks.View;
});
