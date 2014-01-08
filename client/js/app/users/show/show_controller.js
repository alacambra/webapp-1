define(['app', 'app/entities/user', 'app/users/show/show_view', 'app/common/not_found_view'],
function (App, User, View, NotFoundView) {
    App.module('Users.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            user_show: function (user_id) {
                var fetching_user = App.request('user:entity', user_id);
                $.when(fetching_user).done(function(user) {
                    var view;
                    if (user !== undefined) {
                        view = new Show.View({
                            model: user
                        });
                    } else {
                        view = new NotFoundView();
                    }

                    App.main_region.show(view);
                });
            }
        }
    });

    return App.Users.Show.Controller;
});
