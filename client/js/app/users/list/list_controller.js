define(['app',
        'lib/response_handler',
        'app/entities/user',
        'app/users/list/list_view'],
function(App, response_handler) {
    App.module('Users.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            users_list: function() {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('user:entities')).done(function(users, response) {
                    if (users) {
                        var list_view = new List.View({
                            collection: users
                        });

                        App.main_region.show(list_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Users.List.Controller;
});
