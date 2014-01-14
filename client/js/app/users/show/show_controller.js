define(['app', 'lib/response_handler', 'app/entities/user', 'app/common/loading_view', 'app/users/show/show_view'],
function (App, response_handler, Entities, LoadingView) {
    App.module('Users.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            user_show: function (user_id) {
                App.main_region.show(new LoadingView);

                $.when(App.request('user:entity', user_id)).done(function(user, response) {
                    if (user) {
                        var show_view = new Show.View({
                            model: user
                        });

                        App.main_region.show(show_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Users.Show.Controller;
});
