define(['app',
        'lib/response_handler',
        'app/tasks/list/list_view',
        'app/entities/task',
        'app/tasks/show/show_view'],
function (App, response_handler, TaskList) {
    App.module('Tasks.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            task_show: function (task_id) {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('task:entity', task_id)).done(function(task, response) {
                    if (task) {
                        var parent_task_id = task.get('parent_id');
                        var fetching_parent_task = parent_task_id ? App.request('task:entity', parent_task_id) : null;
                        $.when(fetching_parent_task).done(function(parent_task, response) {
                            if (is_empty(parent_task_id) || parent_task) {
                                if (parent_task) task.set('parent_title', parent_task.get('title'));

                                var show_view = new Show.View({
                                    model: task
                                });

                                App.main_region.show(show_view);

                                $.when(App.request('task:entities', task)).done(function (subtasks, response) {
                                    show_view.subtasks.show(new TaskList.View({
                                        collection: subtasks,
                                        breadcrumbs: false,
                                        title: I18n.t('task.label.subtask'),
                                        parent: 'task',
                                        parent_id: task.get('id')
                                    }));
                                });
                            } else {
                                response_handler.handle(response);
                            }
                        });
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Tasks.Show.Controller;
});
