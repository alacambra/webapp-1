define(['app'],
function (App) {
    App.module('PoolsApp', function (PoolsApp, App, Backbone, Marionette, $, _) {
        PoolsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'pools': 'pools_list',
                'pools/new': 'pool_new',
                'pools/:id': 'pool_show',
                'pools/:id/edit': 'pool_edit'
            }
        });


        App.path['pools'] = {
            list: function() { return {
                href: '#pools',
                event: 'pools:list' };
            },
            create: function() { return {
                href: '#pools/new',
                event: 'pool:create' };
            },
            show: function(id) { return {
                href: '#pools/' + id,
                event: 'pool:show,' + id };
            },
            edit: function(id) { return {
                href: '#pools/' + id + '/edit',
                event: 'pool:edit,' + id };
            }
        };


        App.on('pools:list', function() {
            App.navigate('pools');
            API.pools_list();
        });

        App.on('pool:create', function() {
            App.navigate('pools/new');
            API.pool_edit();
        });

        App.on('pool:show', function(id) {
            App.navigate('pools/' + id);
            API.pool_show(id);
        });

        App.on('pool:edit', function(id) {
            App.navigate('pools/' + id + '/edit');
            API.pool_edit(id);
        });

        App.on('pool:delete', function(id, redirect) {
            API.pool_delete(id, redirect);
        });
        
        
        var API = {
            pools_list: function () {
                require(['app/pools/list/list_controller'], function (PoolsController) {
                    PoolsController.pools_list();
                    highlight_navi();
                });
            },

            pool_new: function () {
                require(['app/pools/edit/edit_controller'], function (EditController) {
                    EditController.pool_edit();
                    highlight_navi();
                });
            },

            pool_show: function (id) {
                require(['app/pools/show/show_controller'], function (ShowController) {
                    ShowController.pool_show(id);
                    highlight_navi();
                });
            },

            pool_edit: function (id) {
                require(['app/pools/edit/edit_controller'], function (EditController) {
                    EditController.pool_edit(id);
                    highlight_navi();
                });
            },

            pool_delete: function (pool, redirect) {
                if (confirm(I18n.t('delete_confirm', { name: pool.get('name') }))) {
                    if (pool) {
                        pool.destroy();
                        if (!_.isUndefined(redirect)) App.trigger(redirect);
                    }
                }
            }
        };


        App.addInitializer(function () {
            new PoolsApp.Router({
                controller: API
            });
        });


        function highlight_navi() {
            App.trigger('main_navi:highlight:item', 'pools');
        }
    });

    return App.PoolsApp;
});