define(['app'], function (App) {
    App.module('UsersApp', function (UsersApp, App, Backbone, Marionette, $, _) {
        UsersApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'login': 'login',
                'logout': 'logout',
                'users': 'users_list',
                'users/new': 'user_new',
                'users/:id': 'user_show',
                'users/:id/edit': 'user_edit'
            }
        });


        var API = {
            login: function() {
                App.set_credentials('foo', 'bar');
            },

            logout: function() {
                App.set_credentials(false);
            },

            users_list: function () {
                require(['app/users/list/list_controller'], function (UsersController) {
                    UsersController.users_list();
                    highlight_navi();
                });
            },

            user_new: function () {
                require(['app/users/edit/edit_controller'], function (EditController) {
                    EditController.user_edit();
                    highlight_navi();
                });
            },

            user_show: function (id) {
                require(['app/users/show/show_controller'], function (ShowController) {
                    ShowController.user_show(id);
                    highlight_navi();
                });
            },

            user_edit: function (id) {
                require(['app/users/edit/edit_controller'], function (EditController) {
                    EditController.user_edit(id);
                    highlight_navi();
                });
            },

            user_delete: function (user, redirect) {
                if (confirm(I18n.t('delete_confirm', { name: user.get('firstName') + ' ' + user.get('lastName') }))) {
                    require(['app/users/list/list_controller'], function (ListController) {
                        ListController.user_delete(user, redirect);
                    });
                }
            }
        };


        App.on('users:login', function() {
            App.navigate('login');
            API.login();
        });

        App.on('users:logout', function() {
            App.navigate('logout');
            API.logout();
        });

        App.on('users:list', function() {
            App.navigate('users');
            API.users_list();
        });

        App.on('user:new', function() {
            App.navigate('users/new');
            API.user_edit();
        });

        App.on('user:show', function(id) {
            App.navigate('users/' + id);
            API.user_show(id);
        });

        App.on('user:edit', function(id) {
            App.navigate('users/' + id + '/edit');
            API.user_edit(id);
        });

        App.on('user:delete', function(id, redirect) {
            API.user_delete(id, redirect);
        });


        App.addInitializer(function () {
            new UsersApp.Router({
                controller: API
            });
        });


        function highlight_navi() {
            App.trigger('main_navi:highlight:item', 'users');
        }
    });

    return App.UsersApp;
});