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


            events: {
                'click .js-delete': 'delete_item'
            },


            templateHelpers: $.extend({}, app_helper, view_helper, task_helper),


            initialize: function() {
                this.events['click a[data-navigate]'] = App.handle_link;
            },


            delete_item: function() {
                App.trigger('task:delete', this.model, 'tasks:list');
            }
        });
    });

    return App.Tasks.Show;
});
