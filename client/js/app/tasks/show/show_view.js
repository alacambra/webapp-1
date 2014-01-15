define(['app',
        'tpl!app/tasks/show/templates/show.tpl',
        'app/app_helper',
        'app/tasks/task_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, task_helper) {
    App.module('Tasks.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,


            events: {
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item',
                'click .js-list-efforts': 'list_efforts',
                'click .js-effort-create': 'effort_create',
                'click .js-home': 'go_to_home',
                'click .js-tasks': 'go_to_tasks'
            },


            templateHelpers: $.extend({}, app_helper, task_helper),


            edit: function(event) {
                event.preventDefault();
                App.trigger('task:edit', this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('task:delete', this.model, 'tasks:list');
            },


            list_efforts: function(event) {
                event.preventDefault();
                App.trigger('efforts:list', this.model.get('id'));
            },


            effort_create: function(event) {
                event.preventDefault();
                App.trigger('effort:new', this.model.get('id'));
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            },

            go_to_tasks: function (event) {
                event.preventDefault();
                App.trigger('tasks:list');
            }
        });
    });

    return App.Tasks.Show;
});
