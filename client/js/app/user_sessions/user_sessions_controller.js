define(['app',
        'app/entities/user_session',
        'app/user_sessions/login_view'],
function (App, Entities) {
    App.module('UserSessions.Login', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            login: function () {
                view = new Show.View();

                view.on('form:submit', function(data) {
                    var user_session = new Entities.UserSession();
                    var credentials = App.generate_credentials(data.username, data.password);

                    if (user_session.set(data, { validate: true })) {
                        user_session.clear();
                        user_session.save({}, {
                            validate: false,
                            headers: { 'Authorization': 'Basic ' + credentials },
                            success: function() {
                                App.set_credentials(credentials);
                                App.navigate(App.redirect_location || 'tasks', { trigger: true });
                                App.redirect_location = false;
                            },
                            error: function(model, response) {
                                if (response.status == 401) {
                                    view.triggerMethod('form:save:failed', I18n.t('user_session.auth_error'));
                                } else {
                                    view.triggerMethod('form:save:failed', I18n.t('user_session.login_error'));
                                }
                            }
                        });

                        view.triggerMethod('form:data:valid');
                    } else {
                        view.triggerMethod('form:data:invalid', user_session.validationError);
                    }
                });

                App.main_region.show(view);
            }
        }
    });

    return App.UserSessions.Login.Controller;
});
