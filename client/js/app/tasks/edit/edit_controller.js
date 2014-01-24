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
                event_name: 'task:show',
                id: task_id
            };

            if (options) {
                _.extend(task_options, options.task_options);
                _.extend(redirect, options.redirect);
            }

            $.when(App.request('task:entity', task_id, task_options), App.request('user:entities')).done(function (task_response, users_response) {
                var task = _.isUndefined(task_id) ? task_response : task_response[0];
                var users = users_response[0];

                if (task && users) {
                    users = users.map(function (user) {
                        return [
                            user.get('id'),
                            users_helper.full_name(user.get('firstName'), user.get('lastName'))
                        ];
                    });

                    var edit_view = new Edit.View({
                        model: task,
                        users: users
                    });

                    App.main_region.show(edit_view);

                    edit_view.on('form:submit', function (data) {
                        var model_validated = task.save(data, {
                            patch: true,
                            success: function() {
                                App.trigger(redirect.event_name, redirect.id);
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

                } else {
                    if (!task) {
                        response_handler.handle(task_response[1]);
                    }
                    if (!users) {
                        response_handler.handle(users_response[1]);
                    }
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
                        event_name: 'project:show',
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
