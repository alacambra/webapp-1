define(['app', 'app/entities/task', 'app/tasks/show/show_view'],
function (App, Task, View) {
    App.module('Tasks.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            show_task: function (task_id) {
                var task = new App.Entities.Task({ id: task_id });
                task.fetch({
                    success: function() {
                        var show_view = new Show.Task({
                            model: task
                        });


                        App.main_region.show(show_view);
                    }
                });
            }
        }
    });

    return App.Tasks.Show.Controller;
});
