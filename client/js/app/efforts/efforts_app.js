define(['app'], function (App) {

    App.module('EffortsApp', function (EffortsApp, App, Backbone, Marionette, $, _) {
        EffortsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'efforts': 'efforts_list',
                'efforts/new': 'effort_new',
                'efforts/:id': 'effort_show',
                'efforts/:id/edit': 'effort_edit'
            }
        });


        var API = {
            efforts_list: function () {
                require(['app/efforts/list/list_controller'], function (EffortsController) {
                    EffortsController.efforts_list();
                    highlight_navi();
                });
            },

            effort_new: function () {
                require(['app/efforts/edit/edit_controller'], function (EditController) {
                    EditController.effort_edit();
                    highlight_navi();
                });
            },

            effort_show: function (id) {
                require(['app/efforts/show/show_controller'], function (ShowController) {
                    ShowController.effort_show(id);
                    highlight_navi();
                });
            },

            effort_edit: function (id) {
                require(['app/efforts/edit/edit_controller'], function (EditController) {
                    EditController.effort_edit(id);
                    highlight_navi();
                });
            },

            effort_delete: function (effort, redirect) {
                if (confirm(I18n.t('delete_confirm', { name: effort.get('comment') }))) {
                    require(['app/efforts/list/list_controller'], function (ListController) {
                        ListController.effort_delete(effort, redirect);
                    });
                }
            }
        };


        App.on('efforts:list', function() {
            App.navigate('efforts');
            API.efforts_list();
        });

        App.on('effort:new', function() {
            App.navigate('efforts/new');
            API.effort_edit();
        });

        App.on('effort:show', function(id) {
            App.navigate('efforts/' + id);
            API.effort_show(id);
        });

        App.on('effort:edit', function(id) {
            App.navigate('efforts/' + id + '/edit');
            API.effort_edit(id);
        });

        App.on('effort:delete', function(id, redirect) {
            API.effort_delete(id, redirect);
        });


        App.addInitializer(function () {
            new EffortsApp.Router({
                controller: API
            });
        });


        function highlight_navi() {
            App.trigger('main_navi:highlight:item', 'efforts');
        }
    });

    return App.EffortsApp;
});