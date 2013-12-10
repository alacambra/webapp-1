define(['app', 'app/entities/task', 'app/tasks/edit/edit_view'],
function (App, Task, View) {
    App.module('Tasks.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            edit_task: function (task) {
                var edit_view = new Edit.Task({
                    model: task
                });


                App.main_region.show(edit_view);


                edit_view.on('form:submit', function(data) {
                    console.log(data);
                    //task.save(data);
                    edit_view.triggerMethod('save:successful');
                })
            }
        }
    });

    return App.Tasks.Edit.Controller;
});
