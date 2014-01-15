define(['app',
        'tpl!app/efforts/list/templates/list.tpl',
        'tpl!app/efforts/list/templates/list_item.tpl',
        'app/app_helper',
        'app/efforts/effort_helper'],
function(App, list_tpl, list_item_tpl, app_helper, effort_helper) {
    App.module('Efforts.List', function(List, App, Backbone, Marionette, $, _) {
        List.View = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,


            events: {
                'click .js-show': 'show',
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item'
            },


            templateHelpers: $.extend({}, app_helper, effort_helper),


            show: function(event) {
                event.preventDefault();
                App.trigger('effort:show', this.model.get('id'));
            },


            edit: function(event) {
                event.preventDefault();
                App.trigger('effort:edit', this.model.get('id'));
            },


            delete_item: function(event) {
                event.preventDefault();
                App.trigger('effort:delete', this.model);
            }
        });


        List.Efforts = Marionette.CompositeView.extend({
            id: 'efforts',
            template: list_tpl,
            templateHelpers: app_helper,
            itemView: List.View,
            itemViewContainer: '#js-effort-list-items',

            serializeData: function() {
                console.log(this.collection.task_id);
                return {
                    task_id: this.collection.task_id
                }
            },

            events: {
                'click .js-create': function(event) {
                    event.preventDefault();
                    App.trigger('effort:new', this.collection.task_id);
                },
                'click a.js-home': 'go_to_home',
                'click a.js-tasks': 'go_to_tasks',
                'click a.js-task': 'go_to_task'
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            },

            go_to_tasks: function (event) {
                event.preventDefault();
                App.trigger('tasks:list');
            },

            go_to_task: function (event) {
                event.preventDefault();
                App.trigger('task:show', this.collection.task_id);
            }
        })
    });

    return App.Efforts.List;
});
