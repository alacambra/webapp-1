define(['app',
        'lib/response_handler',
        'app/entities/service',
        'app/services/show/show_view'],
function (App, response_handler) {
    App.module('Services.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            service_show: function (service_id) {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('service:entity', service_id)).done(function(service, response) {
                    if (service) {
                        var show_view = new Show.View({
                            model: service
                        });

                        App.main_region.show(show_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Services.Show.Controller;
});
