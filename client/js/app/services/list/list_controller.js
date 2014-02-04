define(['app',
        'lib/response_handler',
        'app/entities/service',
        'app/services/list/list_view'],
function(App, response_handler) {
    App.module('Services.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            services_list: function() {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('service:entities')).done(function(services, response) {
                    if (services) {
                        var list_view = new List.View({
                            collection: services
                        });

                        App.main_region.show(list_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Services.List.Controller;
});
