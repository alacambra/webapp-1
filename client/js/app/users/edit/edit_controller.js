define(['app', 'app/entities/user', 'app/users/edit/edit_view', 'app/common/not_found_view'],
function (App, User, View, NotFoundView) {
    App.module('Users.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            user_edit: function (user_id) {
                var fetching_user = App.request('user:entity', user_id);
                $.when(fetching_user).done(function(user) {
                    var view;
                    if (user !== undefined) {
                        view = new Edit.View({
                            model: user
                        });

                        view.on('form:submit', function(data) {
                            var valid = user.save(data, {
                                success: function() {
                                    App.trigger('user:show', user.get('id'));
                                },
                                error: function() {
                                    view.triggerMethod('form:save:failed');
                                }
                            });

                            if (valid) {
                                view.triggerMethod('form:data:valid');
                            } else {
                                view.triggerMethod('form:data:invalid', user.validationError);
                            }
                        });
                    } else {
                        view = new NotFoundView();
                    }

                    App.main_region.show(view);
                });
            }
        }
    });

    return App.Users.Edit.Controller;
});
