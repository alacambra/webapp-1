define(['app'], function (App) {

    App.module('TasksApp', function (TasksApp, App, Backbone, Marionette, $, _) {
        TasksApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'tasks': 'tasks_list',
                'tasks/new': 'task_new',
                'tasks/:id': 'task_show',
                'tasks/:id/edit': 'task_edit'
            }
        });


        var API = {
            tasks_list: function () {
                require(['app/tasks/list/list_controller'], function (TasksController) {
                    TasksController.tasks_list();
                });
            },

            task_new: function () {
                require(['app/tasks/edit/edit_controller'], function (EditController) {
                    EditController.task_edit();
                });
            },

            task_show: function (id) {
                require(['app/tasks/show/show_controller'], function (ShowController) {
                    ShowController.task_show(id);
                });
            },

            task_edit: function (id) {
                require(['app/tasks/edit/edit_controller'], function (EditController) {
                    EditController.task_edit(id);
                });
            },

            task_delete: function (task, redirect) {
                if (confirm('Are you sure?')) {
                    require(['app/tasks/list/list_controller'], function (ListController) {
                        ListController.task_delete(task, redirect);
                    });
                }
            }
        };


        App.on('tasks:list', function() {
            App.navigate('tasks');
            API.tasks_list();
        });

        App.on('task:new', function() {
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


        App.addInitializer(function () {
            new TasksApp.Router({
                controller: API
            });
        });
    });

    return App.TasksApp;
});