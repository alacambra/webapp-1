define(['app', 'app/entities/task', 'app/tasks/edit/edit_view'],
function (App, Task, View) {
    App.module('Tasks.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            edit_task: function (task_id) {
                var task = new App.Entities.Task({ id: task_id });
                task.fetch({
                    success: function() {
                        if (task === undefined) {
                            task = new App.Entities.Task();
                            console.log('new');
                        }

                        var edit_view = new Edit.Task({
                            model: task
                        });


                        App.main_region.show(edit_view);

                        edit_view.on('form:submit', function(data) {
                            if (task.save(data)) {
                                edit_view.triggerMethod('save:successful');
                            } else {
                                edit_view.triggerMethod('save:error');
                            }
                        })
                    }
                });
            }
        }
    });

    return App.Tasks.Edit.Controller;
});
