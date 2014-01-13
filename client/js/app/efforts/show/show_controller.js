define(['app', 'lib/response_handler', 'app/entities/effort', 'app/common/loading_view', 'app/efforts/show/show_view'],
function (App, response_handler, Entities, LoadingView) {
    App.module('Efforts.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            effort_show: function (effort_id) {
                App.main_region.show(new LoadingView);

                $.when(App.request('effort:entity', effort_id)).done(function(effort, response) {
                    if (effort) {
                        var show_view = new Show.View({
                            model: effort
                        });

                        App.main_region.show(show_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Efforts.Show.Controller;
});
