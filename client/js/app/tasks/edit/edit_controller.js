define(['app',
        'lib/response_handler',
        'app/entities/task',
        'app/tasks/edit/edit_view'],
function (App, response_handler) {
    App.module('Tasks.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            task_edit: function (task_id) {
                App.main_region.show(new App.Common.LoadingView);

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
            },

            create_project_task: function (project_id) {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('project:task:create', project_id)).done(function (task, response) {
                    var edit_view = new Edit.View({
                        model: task
                    });

                    edit_view.on('form:submit', function (data) {
                        var model_validated = task.save(data, {
                            success: function() {
                                App.trigger('project:show', project_id);
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
                });
            }
        }
    });

    return App.Tasks.Edit.Controller;
});
