define(['app',
        'tpl!app/efforts/show/templates/show.tpl',
        'app/app_helper',
        'app/efforts/effort_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, effort_helper) {
    App.module('Efforts.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,


            events: {
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item',
                'click a.js-home': 'go_to_home',
                'click a.js-tasks': 'go_to_tasks',
                'click a.js-task': 'go_to_task',
                'click a.js-efforts': 'go_to_efforts'
            },


            templateHelpers: $.extend({}, app_helper, effort_helper),


            edit: function(event) {
                event.preventDefault();
                App.trigger('effort:edit', this.model.get('task_id'), this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('effort:delete', this.model.get('task_id'), this.model, 'task:show');
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
                App.trigger('task:show', this.model.get('task_id'));
            },

            go_to_efforts: function (event) {
                event.preventDefault();
                App.trigger('efforts:list', this.model.get('task_id'));
            }
        });
    });

    return App.Efforts.Show;
});
