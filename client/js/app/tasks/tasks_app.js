define(['app'], function (App) {

    App.module('TasksApp', function (TasksApp, App, Backbone, Marionette, $, _) {
        TasksApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'tasks': 'list_tasks',
                'tasks/new': 'new_task',
                'tasks/:id': 'show_task',
                'tasks/:id/edit': 'edit_task'
            }
        });

        var API = {
            list_tasks: function () {
                require(['app/tasks/list/list_controller'], function (TasksController) {
                    TasksController.list_tasks();
                });
            },

            new_task: function () {
                require(['app/tasks/edit/edit_controller'], function (EditController) {
                    EditController.edit_task();
                });
            },

            show_task: function (id) {
                require(['app/tasks/show/show_controller'], function (ShowController) {
                    ShowController.show_task(id);
                });
            },

            edit_task: function (id) {
                require(['app/tasks/edit/edit_controller'], function (EditController) {
                    EditController.edit_task(id);
                });
            }
        };

        App.addInitializer(function () {
            new TasksApp.Router({
                controller: API
            });
        });

        App.on('tasks:list', function(){
            App.navigate('tasks');
            API.list_tasks();
        });
    });

    return App.TasksApp;
});