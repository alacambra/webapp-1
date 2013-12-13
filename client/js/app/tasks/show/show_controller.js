define(['app', 'app/entities/task', 'app/tasks/show/show_view'],
function (App, Task, View) {
    App.module('Tasks.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            task_show: function (task_id) {
                var fetching_task = App.request('task:entity', task_id);
                $.when(fetching_task).done(function(task) {
                    var view;
                    if (task !== undefined) {
                        view = new Show.View({
                            model: task
                        });
                    } else {
                        console.log('task not found');
                    }

                    App.main_region.show(view);
                });
            }
        }
    });

    return App.Tasks.Show.Controller;
});
