define(['app'], function (App) {

    App.module('EffortsApp', function (EffortsApp, App, Backbone, Marionette, $, _) {
        EffortsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'tasks/:task_id/efforts': 'efforts_list',
                'tasks/:task_id/efforts/new': 'effort_new',
                'efforts/:id': 'effort_show',
                'efforts/:id/edit': 'effort_edit'
            }
        });


        var API = {
            efforts_list: function (task_id) {
                require(['app/efforts/list/list_controller'], function (EffortsController) {
                    EffortsController.efforts_list(task_id);
                    highlight_navi();
                });
            },

            effort_new: function (task_id) {
                require(['app/efforts/edit/edit_controller'], function (EditController) {
                    EditController.effort_edit(undefined, task_id);
                    highlight_navi();
                });
            },

            effort_show: function (id) {
                require(['app/efforts/show/show_controller'], function (ShowController) {
                    ShowController.effort_show(id);
                    highlight_navi();
                });
            },

            effort_edit: function (effort_id, task_id) {
                require(['app/efforts/edit/edit_controller'], function (EditController) {
                    EditController.effort_edit(effort_id, task_id);
                    highlight_navi();
                });
            },

            effort_delete: function (effort, redirect, task_id) {
                if (confirm(I18n.t('delete_confirm', { name: effort.get('comment') }))) {
                    require(['app/efforts/list/list_controller'], function (ListController) {
                        ListController.effort_delete(effort, redirect, task_id);
                    });
                }
            }
        };


        App.on('efforts:list', function(task_id) {
            App.navigate('tasks/' + task_id + '/efforts');
            API.efforts_list(task_id);
        });

        App.on('effort:new', function(task_id) {
            App.navigate('tasks/' + task_id + '/efforts/new');
            API.effort_edit(undefined, task_id);
        });

        App.on('effort:show', function(id) {
            App.navigate('efforts/' + id);
            API.effort_show(id);
        });

        App.on('effort:edit', function(id) {
            App.navigate('efforts/' + id + '/edit');
            API.effort_edit(id);
        });

        App.on('effort:delete', function(id, redirect, task_id) {
            API.effort_delete(id, redirect, task_id);
        });


        App.addInitializer(function () {
            new EffortsApp.Router({
                controller: API
            });
        });


        function highlight_navi() {
            App.trigger('main_navi:highlight:item', 'tasks');
        }
    });

    return App.EffortsApp;
});