define(['app',
        'lib/response_handler',
        'app/users/users_helper',
        'app/entities/task',
        'app/entities/user',
        'app/tasks/edit/edit_view'],
function (App, response_handler, users_helper) {
    App.module('Tasks.Edit', function (Edit, App, Backbone, Marionette, $, _) {

        function init_edit_view (task_id, options) {
            App.main_region.show(new App.Common.LoadingView);

            var task_options = {};
            var redirect = {
                event: 'task:show'
            };

            if (options) {
                _.extend(task_options, options.task_options);
                _.extend(redirect, options.redirect);
            }

            $.when(App.request('task:entity', task_id, task_options)).done(function(task, response) {
                if (task) {
                    var edit_view = new Edit.View({
                        model: task
                    });

                    App.main_region.show(edit_view);

                    set_view_submit_handler(edit_view, task, redirect);
                } else {
                    response_handler.handle(response);
                }
            });
        }


        function set_view_submit_handler(edit_view, task, redirect) {
            edit_view.on('form:submit', function (data) {
                var model_validated = task.save(data, {
                    patch: true,
                    success: function(model, response, options) {
                        // read header and alert its content
                        if (options.xhr && options.xhr.getResponseHeader('X-Warning')) {
                            alert(options.xhr.getResponseHeader('X-Warning'));
                        }
                        App.trigger(redirect.event, redirect.id || model.get('id'));
                    },
                    error: function(model, response) {
                        response_handler.handle(response, {
                            503: function() { edit_view.triggerMethod('form:save:failed'); }
                        });
                    }
                });
                console.log(model_validated);
                if (model_validated) {
                    edit_view.triggerMethod('form:data:valid');
                } else {
                    edit_view.triggerMethod('form:data:invalid', task.validationError);
                }
            });
        }


        Edit.Controller = {
            task_edit: function (task_id) {
                init_edit_view(task_id);
            },

            create_project_task: function (project_id) {
                init_edit_view(undefined, {
                    task_options: {
                        project_id: project_id
                    },
                    redirect: {
                        event: 'project:show',
                        id: project_id
                    }
                });
            },

            create_subtask: function (parent_id) {
                init_edit_view(undefined, {
                    task_options: {
                        parent_task_id: parent_id
                    },
                    redirect: {
                        id: parent_id
                    }
                });
            }
        }
    });

    return App.Tasks.Edit.Controller;
});
