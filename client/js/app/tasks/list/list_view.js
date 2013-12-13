define(['app',
        'tpl!app/tasks/list/templates/list.tpl',
        'tpl!app/tasks/list/templates/list_item.tpl'],
function(App, list_tpl, list_item_tpl) {
    App.module('Tasks.List', function(List, App, Backbone, Marionette, $, _) {
        List.View = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,


            events: {
                'click .js-title': 'show',
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item'
            },


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
            },


            show: function(event) {
                event.preventDefault();
                event.stopPropagation();
                App.trigger('task:show', this.model.get('id'));
            },


            edit: function(event) {
                event.preventDefault();
                event.stopPropagation();
                App.trigger('task:edit', this.model.get('id'));
            },


            delete_item: function() {
                if (confirm('Are you sure?')) {
                    this.trigger('task:delete', this.model);
                }
            }
        });


        List.Tasks = Marionette.CompositeView.extend({
            id: 'tasks',
            template: list_tpl,
            itemView: List.View,
            itemViewContainer: '#js-task-list-items',

            events: {
                'click .js-create': function(event) {
                    event.stopPropagation();
                    App.trigger('task:new');
                }
            }
        })
    });

    return App.Tasks.List;
});
