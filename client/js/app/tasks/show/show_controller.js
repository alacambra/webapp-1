define(['app', 'lib/response_handler', 'app/entities/task', 'app/common/loading_view', 'app/tasks/show/show_view'],
function (App, response_handler, Entities, LoadingView) {
    App.module('Tasks.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            task_show: function (task_id) {
                App.main_region.show(new LoadingView);

                $.when(App.request('task:entity', task_id)).done(function(task, response) {
                    if (task) {
                        var show_view = new Show.View({
                            model: task
                        });

                        App.main_region.show(show_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Tasks.Show.Controller;
});
