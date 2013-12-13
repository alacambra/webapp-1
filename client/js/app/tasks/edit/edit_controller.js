define(['app', 'app/entities/task', 'app/tasks/edit/edit_view'],
function (App, Task, View) {
    App.module('Tasks.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            task_edit: function (task_id) {
                var fetching_task = App.request('task:entity', task_id);
                $.when(fetching_task).done(function(task) {
                    var view;
                    if (task !== undefined) {
                        view = new Edit.View({
                            model: task
                        });

                        view.on('form:submit', function(data) {
                            if (!task.save(data, {
                                success: function() {
                                    console.log('success'); // save completed
                                    App.trigger('task:edit', task.get('id'));
                                },
                                error: function() {
                                    console.log('error'); // save failed
                                }
                            })) {
                            } else {
                                view.triggerMethod('save:error'); // validation failed
                            }
                        });
                    } else {
                        console.log('task not found');
                    }

                    App.main_region.show(view);
                });
            }
        }
    });

    return App.Tasks.Edit.Controller;
});
