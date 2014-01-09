define(['app',
        'app/entities/effort',
        'app/efforts/list/list_view'],
function(App){
    App.module('Efforts.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            efforts_list: function() {
                var fetching_efforts = App.request('effort:entities');
                $.when(fetching_efforts).done(function(efforts){
                    var list_view = new List.Efforts({
                        collection: efforts
                    });

                    App.main_region.show(list_view);
                });
            },


            effort_delete: function(effort, redirect) {
                var fetching_effort = App.request('effort:entity', effort);

                $.when(fetching_effort).done(function(effort) {
                    if (effort !== undefined) {
                        effort.destroy();
                        if (redirect !== undefined) App.trigger(redirect);
                    } else {
                        console.log('effort does not exist');
                    }
                });
            }
        }
    });

    return App.Efforts.List.Controller;
});
