define(['app'],
function (App) {
    App.module('ServicesApp', function (ServicesApp, App, Backbone, Marionette, $, _) {
        ServicesApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'services': 'services_list',
                'services/new': 'service_new',
                'services/:id': 'service_show',
                'services/:id/edit': 'service_edit'
            }
        });


        App.path['services'] = {
            list: function() { return {
                href: '#services',
                event: 'services:list' };
            },
            create: function() { return {
                href: '#services/new',
                event: 'service:create' };
            },
            show: function(id) { return {
                href: '#services/' + id,
                event: 'service:show,' + id };
            },
            edit: function(id) { return {
                href: '#services/' + id + '/edit',
                event: 'service:edit,' + id };
            }
        };


        App.on('services:list', function() {
            App.navigate('services');
            API.services_list();
        });

        App.on('service:create', function() {
            App.navigate('services/new');
            API.service_edit();
        });

        App.on('service:show', function(id) {
            App.navigate('services/' + id);
            API.service_show(id);
        });

        App.on('service:edit', function(id) {
            App.navigate('services/' + id + '/edit');
            API.service_edit(id);
        });

        App.on('service:delete', function(id, redirect) {
            API.service_delete(id, redirect);
        });
        
        
        var API = {
            services_list: function () {
                require(['app/services/list/list_controller'], function (ServicesController) {
                    ServicesController.services_list();
                    highlight_navi();
                });
            },

            service_new: function () {
                require(['app/services/edit/edit_controller'], function (EditController) {
                    EditController.service_edit();
                    highlight_navi();
                });
            },

            service_show: function (id) {
                require(['app/services/show/show_controller'], function (ShowController) {
                    ShowController.service_show(id);
                    highlight_navi();
                });
            },

            service_edit: function (id) {
                require(['app/services/edit/edit_controller'], function (EditController) {
                    EditController.service_edit(id);
                    highlight_navi();
                });
            },

            service_delete: function (service, redirect) {
                if (confirm(I18n.t('delete_confirm', { name: service.get('name') }))) {
                    if (service) {
                        service.destroy();
                        if (!_.isUndefined(redirect)) App.trigger(redirect);
                    }
                }
            }
        };


        App.addInitializer(function () {
            new ServicesApp.Router({
                controller: API
            });
        });


        function highlight_navi() {
            App.trigger('main_navi:highlight:item', 'services');
        }
    });

    return App.ServicesApp;
});