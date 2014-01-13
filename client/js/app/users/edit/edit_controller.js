define(['app', 'lib/response_handler', 'app/entities/user', 'app/common/loading_view', 'app/users/edit/edit_view'],
function (App, response_handler, Entities, LoadingView) {
    App.module('Users.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            user_edit: function (user_id) {
                App.main_region.show(new LoadingView);

                $.when(App.request('user:entity', user_id)).done(function(user, response) {
                    if (user) {
                        var edit_view = new Edit.View({
                            model: user
                        });

                        edit_view.on('form:submit', function(data) {
                            var model_validated = user.save(data, {
                                patch: true,
                                success: function() {
                                    App.trigger('user:show', user.get('id'));
                                },
                                error: function(model, response) {
                                    response_handler.handle(response, {
                                        503: function() { edit_view.triggerMethod('form:save:failed'); }
                                    });
                                }
                            });

                            if (model_validated) {
                                edit_view.triggerMethod('form:data:valid');
                            } else {
                                edit_view.triggerMethod('form:data:invalid', user.validationError);
                            }
                        });

                        App.main_region.show(edit_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Users.Edit.Controller;
});
