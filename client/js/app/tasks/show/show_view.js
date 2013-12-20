define(['app',
        'tpl!app/tasks/show/templates/show.tpl',
        'app/tasks/task_helper',
        'lib/vendor/textile'],
function(App, show_tpl, task_helper) {
    App.module('Tasks.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,


            events: {
                'click .js-edit': 'edit',
                'click .js-delete': 'delete_item'
            },


            templateHelpers: task_helper,


            edit: function(event) {
                event.preventDefault();
                event.stopPropagation();
                App.trigger('task:edit', this.model.get('id'));
            },


            delete_item: function() {
                App.trigger('task:delete', this.model, 'tasks:list');
            }
        });
    });

    return App.Tasks.Show;
});
