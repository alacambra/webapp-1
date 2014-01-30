define(['app',
        'lib/response_handler',
        'app/entities/service',
        'app/services/edit/edit_view'],
function (App, response_handler) {
    App.module('Services.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            service_edit: function (service_id) {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('service:entity', service_id)).done(function(service, response) {
                    if (service) {
                        var edit_view = new Edit.View({
                            model: service
                        });

                        edit_view.on('form:submit', function(data) {
                            var model_validated = service.save(data, {
                                patch: true,
                                success: function() {
                                    App.trigger('service:show', service.get('id'));
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
                                edit_view.triggerMethod('form:data:invalid', service.validationError);
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

    return App.Services.Edit.Controller;
});
