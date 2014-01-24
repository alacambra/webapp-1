define(['app',
        'tpl!app/tasks/show/templates/show.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/tasks/tasks_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, view_helper, tasks_helper) {
    App.module('Tasks.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.Layout.extend({
            template: show_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, tasks_helper),

            regions: {
                subtasks: '#js-subtasks'
            },

            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete-task': 'delete_item'
            },


            delete_item: function() {
                var redirect = 'tasks:list';
                if (this.model.get('project')) {
                    redirect = {
                        event: 'project:show',
                        id: this.model.get('project').id
                    }
                }
                App.trigger('task:delete', this.model, redirect);
            }
        });
    });

    return App.Tasks.Show;
});
