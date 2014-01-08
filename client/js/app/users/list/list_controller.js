define(['app',
        'app/entities/user',
        'app/users/list/list_view'],
function(App){
    App.module('Users.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            users_list: function() {
                var fetching_users = App.request('user:entities');
                $.when(fetching_users).done(function(users){
                    var list_view = new List.Users({
                        collection: users
                    });

                    App.main_region.show(list_view);
                });
            },


            user_delete: function(user, redirect) {
                var fetching_user = App.request('user:entity', user);

                $.when(fetching_user).done(function(user) {
                    if (user !== undefined) {
                        user.destroy();
                        if (redirect !== undefined) App.trigger(redirect);
                    } else {
                        console.log('user does not exist');
                    }
                });
            }
        }
    });

    return App.Users.List.Controller;
});
