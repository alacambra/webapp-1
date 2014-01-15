define(['app',
        'tpl!app/tasks/list/templates/list.tpl',
        'tpl!app/tasks/list/templates/list_item.tpl',
        'app/app_helper',
        'app/tasks/task_helper'],
function(App, list_tpl, list_item_tpl, app_helper, task_helper) {
    App.module('Tasks.List', function(List, App, Backbone, Marionette, $, _) {
        List.View = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,


            events: {
                'click .js-show': 'show',
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item'
            },


            templateHelpers: $.extend({}, app_helper, task_helper),


            show: function(event) {
                event.preventDefault();
                App.trigger('task:show', this.model.get('id'));
            },


            edit: function(event) {
                event.preventDefault();
                App.trigger('task:edit', this.model.get('id'));
            },


            delete_item: function(event) {
                event.preventDefault();
                App.trigger('task:delete', this.model);
            }
        });


        List.Tasks = Marionette.CompositeView.extend({
            id: 'tasks',
            template: list_tpl,
            templateHelpers: app_helper,
            itemView: List.View,
            itemViewContainer: '#js-task-list-items',

            events: {
                'click .js-create': function(event) {
                    event.preventDefault();
                    App.trigger('task:new');
                },
                'click a.js-home': 'go_to_home'
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            }
        })
    });

    return App.Tasks.List;
});
