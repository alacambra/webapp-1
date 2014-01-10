define(['app', 'lib/response_handler', 'app/entities/task', 'app/tasks/edit/edit_view'],
function (App, response_handler) {
    App.module('Tasks.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            task_edit: function (task_id) {
                $.when(App.request('task:entity', task_id)).done(function(task, response) {
                    if (task) {
                        var edit_view = new Edit.View({
                            model: task
                        });

                        edit_view.on('form:submit', function(data) {
                            var model_validated = task.save(data, {
                                success: function() {
                                    App.trigger('task:show', task.get('id'));
                                },
                                error: function(model, response) {
                                    response_handler.handle(response, {
                                        503: function() { edit_view.triggerMethod('form:save:failed'); }
                                    });
                                }
                            });

                            if (model_validated) {
                                edit_view.triggerMethod('form:data:valid');
                            } else {
                                edit_view.triggerMethod('form:data:invalid', task.validationError);
                            }
                        });

                        App.main_region.show(edit_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Tasks.Edit.Controller;
});
