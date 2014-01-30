define(['app',
        'tpl!app/tasks/show/templates/show.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/tasks/tasks_helper',
        'app/users/users_helper',
        'lib/vendor/textile'],
function(App, show_tpl, app_helper, view_helper, tasks_helper, users_helper) {
    App.module('Tasks.Show', function(Show, App, Backbone, Marionette, $, _) {
        Show.View = Marionette.Layout.extend({
            template: show_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, tasks_helper, users_helper),

            regions: {
                subtasks: '#js-subtasks'
            },

            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete-task': 'delete_item',
                'click .js-move-to-project': 'move_item_to_project',
                'click .js-move-to-task': 'move_item_to_task',
                'click .js-move-to-user': 'move_item_to_user'
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
            },


            move_item_to_project: function () {
                var target_project_id = prompt(I18n.t('task.move_to_project_prompt'));
                App.trigger('task:move:to:project', this.model, target_project_id);
            },


            move_item_to_task: function () {
                var target_task_id = prompt(I18n.t('task.move_to_task_prompt'));
                App.trigger('task:move:to:task', this.model, target_task_id);
            },

            move_item_to_user: function () {
                var target_user_id = prompt(I18n.t('task.move_to_user_prompt'));
                App.trigger('task:move:to:user', this.model, target_user_id);
            }
        });
    });

    return App.Tasks.Show;
});
