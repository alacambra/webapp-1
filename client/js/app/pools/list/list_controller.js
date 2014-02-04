define(['app',
        'lib/response_handler',
        'app/entities/pool',
        'app/pools/list/list_view'],
function(App, response_handler) {
    App.module('Pools.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            pools_list: function() {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('pool:entities')).done(function(pools, response) {
                    if (pools) {
                        var list_view = new List.View({
                            collection: pools
                        });

                        App.main_region.show(list_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Pools.List.Controller;
});
