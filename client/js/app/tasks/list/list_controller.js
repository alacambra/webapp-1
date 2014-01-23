define(['app',
        'lib/response_handler',
        'app/entities/task',
        'app/tasks/list/list_view'],
function(App, response_handler) {
    App.module('Tasks.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            tasks_list: function() {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('task:entities')).done(function(tasks, response) {
                    if (tasks) {
                        var list_view = new List.View({
                            collection: tasks
                        });

                        App.main_region.show(list_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            },


            task_delete: function(task, redirect) {
                $.when(App.request('task:entity', task)).done(function(task, response) {
                    if (task) {
                        task.destroy();
                        if (!_.isUndefined(redirect)) {
                            if (_.isObject(redirect)) {
                                App.trigger(redirect.event, redirect.id);
                            } else {
                                App.trigger(redirect);
                            }
                        }
                    }
                });
            }
        }
    });

    return App.Tasks.List.Controller;
});
