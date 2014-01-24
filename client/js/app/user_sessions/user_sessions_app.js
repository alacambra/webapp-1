define(['app'],
function (App) {
    App.module('UserSessionsApp', function (UserSessionsApp, App, Backbone, Marionette, $, _) {
        UserSessionsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'login': 'login',
                'logout': 'logout'
            }
        });


        var API = {
            login: function() {
                require(['app/user_sessions/user_sessions_controller'], function (UserSessionsController) {
                    UserSessionsController.login();
                    App.trigger('main_navi:highlight:item', 'login');
                });
            },

            logout: function() {
                App.set_credentials(undefined);
                App.trigger('user_session:login');
                App.trigger('main_navi:highlight:item', 'logout');
            }
        };


        App.on('user_session:login', function() {
            App.navigate('login');
            API.login();
        });

        App.on('user_session:logout', function() {
            App.navigate('logout');
            API.logout();
        });


        App.addInitializer(function () {
            new UserSessionsApp.Router({
                controller: API
            });
        });
    });

    return App.UserSessionsApp;
});