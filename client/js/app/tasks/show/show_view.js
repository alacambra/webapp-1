define(['app',
        'tpl!app/tasks/show/templates/show.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/tasks/task_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, view_helper, task_helper) {
    App.module('Tasks.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.ItemView.extend({
            template: show_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, task_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete': 'delete_item'
            },


            delete_item: function() {
                App.trigger('task:delete', this.model, 'tasks:list');
            }
        });
    });

    return App.Tasks.Show;
});
