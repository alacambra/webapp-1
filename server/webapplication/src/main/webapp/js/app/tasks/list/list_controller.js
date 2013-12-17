define(['app', 'app/entities/task', 'app/tasks/list/list_view'],
function(App, View){
    App.module('Tasks.List', function(List, App, Backbone, Marionette, $, _){
        List.Controller = {
            tasks_list: function() {
                var fetching_tasks = App.request('task:entities');
                $.when(fetching_tasks).done(function(tasks){
                    var list_view = new List.Tasks({
                        collection: tasks
                    });

                    App.main_region.show(list_view);
                });
            },


            task_delete: function(task, redirect) {
                var fetching_task = App.request('task:entity', task);

                $.when(fetching_task).done(function(task) {
                    if (task !== undefined) {
                        task.destroy();
                        if (redirect !== undefined) App.trigger(redirect);
                    } else {
                        console.log('task does not exist');
                    }
                });
            }
        }
    });

    return App.Tasks.List.Controller;
});
