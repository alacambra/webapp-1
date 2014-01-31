define(['app',
        'lib/response_handler',
        'app/entities/pool',
        'app/pools/show/show_view'],
function (App, response_handler) {
    App.module('Pools.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            pool_show: function (pool_id) {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('pool:entity', pool_id)).done(function(pool, response) {
                    if (pool) {
                        var show_view = new Show.View({
                            model: pool
                        });

                        App.main_region.show(show_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Pools.Show.Controller;
});
