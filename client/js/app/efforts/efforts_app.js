define(['app', 'app/efforts/effort_helper'], function (App, effort_helper) {
    App.module('EffortsApp', function (EffortsApp, App, Backbone, Marionette, $, _) {
        EffortsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'tasks/:task_id/efforts': 'efforts_list',
                'tasks/:task_id/efforts/new': 'effort_new',
                'tasks/:task_id/efforts/:id': 'effort_show',
                'tasks/:task_id/efforts/:id/edit': 'effort_edit'
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

            effort_show: function (task_id, id) {
                require(['app/efforts/show/show_controller'], function (ShowController) {
                    ShowController.effort_show(task_id, id);
                    highlight_navi();
                });
            },

            effort_edit: function (task_id, id) {
                require(['app/efforts/edit/edit_controller'], function (EditController) {
                    EditController.effort_edit(task_id, id);
                    highlight_navi();
                });
            },

            effort_delete: function (task_id, effort, redirect) {
                if (confirm(I18n.t('delete_confirm', { name: effort_helper.confirm_text(effort) }))) {
                    require(['app/efforts/list/list_controller'], function (ListController) {
                        ListController.effort_delete(task_id, effort, redirect);
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
            API.effort_edit(task_id, undefined);
        });

        App.on('effort:show', function(task_id, id) {
            App.navigate('tasks/' + task_id + '/efforts/' + id);
            API.effort_show(task_id, id);
        });

        App.on('effort:edit', function(task_id, id) {
            App.navigate('tasks/' + task_id + '/efforts/' + id + '/edit');
            API.effort_edit(task_id, id);
        });

        App.on('effort:delete', function(task_id, effort, redirect) {
            API.effort_delete(task_id, effort, redirect);
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