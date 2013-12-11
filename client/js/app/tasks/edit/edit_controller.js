define(['app', 'app/entities/task', 'app/tasks/edit/edit_view'],
function (App, Task, View) {
    App.module('Tasks.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            edit_task: function (task) {
                if (task === undefined) {
                    task = new App.Entities.Task();
//                    tasks.add(task); // TODO: check if this is here necessary or should be done after save
                } else if (typeof task !== 'object') {
//                    task = new App.Entities.TaskCollection().fetch(task);
                    task = new App.Entities.Task({ id: 1, title: 'test1' });
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
        }
    });

    return App.Tasks.Edit.Controller;
});
