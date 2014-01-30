define(['app'],
function (App) {
    App.module('TasksApp', function (TasksApp, App, Backbone, Marionette, $, _) {
        TasksApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'tasks': 'tasks_list',
                'tasks/new': 'task_new',
                'tasks/:id': 'task_show',
                'tasks/:id/edit': 'task_edit',
                'tasks/:id/subtasks/new': 'task_subtasks_new'
            }
        });


        App.path['tasks'] = {
            list: function() { return {
                href: '#tasks',
                event: 'tasks:list' };
            },
            create: function() { return {
                href: '#tasks/new',
                event: 'task:create' };
            },
            show: function(id) { return {
                href: '#tasks/' + id,
                event: 'task:show,' + id };
            },
            edit: function(id) { return {
                href: '#tasks/' + id + '/edit',
                event: 'task:edit,' + id };
            },
            create_subtask: function (id) {
                return {
                    href: '#tasks/' + id + '/subtasks/new',
                    event: 'task:subtasks:new,' + id
                }
            }
        };


        App.on('tasks:list', function() {
            App.navigate('tasks');
            API.tasks_list();
        });

        App.on('task:create', function() {
            App.navigate('tasks/new');
            API.task_edit();
        });

        App.on('task:show', function(id) {
            App.navigate('tasks/' + id);
            API.task_show(id);
        });

        App.on('task:edit', function(id) {
            App.navigate('tasks/' + id + '/edit');
            API.task_edit(id);
        });

        App.on('task:delete', function(id, redirect) {
            API.task_delete(id, redirect);
        });

        App.on('task:subtasks:new', function (id) {
            App.navigate('tasks/' + id + '/subtasks/new');
            API.task_subtasks_new(id);
        });

        App.on('task:move:to:project', function (task, target_project_id) {
            API.task_move(task, target_project_id, 'project');
        });

        App.on('task:move:to:task', function (task, target_task_id) {
            API.task_move(task, target_task_id, 'task');
        });


        App.on('task:move:to:user', function (task, target_user_id) {
            API.task_move(task, target_user_id, 'user');
        });

        var API = {
            tasks_list: function () {
                require(['app/tasks/list/list_controller'], function (TasksController) {
                    TasksController.tasks_list();
                    highlight_navi();
                });
            },

            task_new: function () {
                require(['app/tasks/edit/edit_controller'], function (EditController) {
                    EditController.task_edit();
                    highlight_navi();
                });
            },

            task_show: function (id) {
                require(['app/tasks/show/show_controller'], function (ShowController) {
                    ShowController.task_show(id);
                    highlight_navi();
                });
            },

            task_edit: function (id) {
                require(['app/tasks/edit/edit_controller'], function (EditController) {
                    EditController.task_edit(id);
                    highlight_navi();
                });
            },

            task_delete: function (task, redirect) {
                var title = task.get('title');
                var count = task.get('subtaskCount');
                var confirm_message = I18n.t('delete_confirm', { name: title });

                if (count > 0) {
                    confirm_message = I18n.t('task.delete_confirm', { name: title, count: count });
                }

                if (confirm(confirm_message)) {
                    require(['app/tasks/list/list_controller'], function (ListController) {
                        ListController.task_delete(task, redirect);
                    });
                }
            },

            task_move: function (task, id, type) {
                var url = App.model_base_url('tasks/' + task.get('id'));
                var error_msg = 'error';

                switch(type) {
                    case 'project':
                        url += _.isNull(task.get('project')) ? '/in/project/' + id : '/from/project/' + task.get('project').id + '/to/' + id;
                        error_msg = I18n.t('task.move_to_project_failed', { name: task.get('title'), id: id });
                        break;
                    case 'task':
                        url += _.isNull(task.get('parentTask')) ? '/in/task/' + id : '/from/task/' + task.get('parentTask').id + '/to/' + id;
                        error_msg = I18n.t('task.move_to_task_failed', { name: task.get('title'), id: id });
                        break;
                    case 'user':
                        url += '/to/user/' + id;
                        error_msg = I18n.t('task.move_to_user_failed', { name: task.get('title'), id: id });
                        break;
                }

                Backbone.sync('update', task, {
                    data: {},
                    url: url,
                    success: function (response) {
                        task.set(response);
                        require(['app/tasks/show/show_controller'], function (ShowController) {
                            ShowController.task_show(task);
                        });
                    },
                    error: function (response) {
                        alert(error_msg);
                    }
                });
            },

            task_subtasks_new: function (parent_id) {
                require(['app/tasks/edit/edit_controller'], function (EditController) {
                    EditController.create_subtask(parent_id);
                    highlight_navi();
                });
            }
        };


        App.addInitializer(function () {
            new TasksApp.Router({
                controller: API
            });
        });


        function highlight_navi() {
            App.trigger('main_navi:highlight:item', 'tasks');
        }
    });

    return App.TasksApp;
});