define(['app', 'lib/response_handler', 'app/entities/user', 'app/users/list/list_view'],
function(App, response_handler) {
    App.module('Users.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            users_list: function() {
                $.when(App.request('user:entities')).done(function(users, response) {
                    if (users) {
                        var list_view = new List.Users({
                            collection: users
                        });

                        App.main_region.show(list_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            },


            user_delete: function(user, redirect) {
                $.when(App.request('user:entity', user)).done(function(user, response) {
                    if (user) {
                        user.destroy();
                        if (redirect !== undefined) App.trigger(redirect);
                    }
                });
            }
        }
    });

    return App.Users.List.Controller;
});
