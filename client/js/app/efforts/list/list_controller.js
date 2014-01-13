define(['app', 'lib/response_handler', 'app/entities/effort', 'app/common/loading_view', 'app/efforts/list/list_view'],
function(App, response_handler, Entities, LoadingView) {
    App.module('Efforts.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            efforts_list: function(task_id) {
                App.main_region.show(new LoadingView);

                $.when(App.request('effort:entities', task_id)).done(function(efforts, response) {
                    if (efforts) {
                        var list_view = new List.Efforts({
                            collection: efforts
                        });

                        App.main_region.show(list_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            },


            effort_delete: function(effort, redirect, task_id) {
                $.when(App.request('effort:entity', effort)).done(function(effort, response) {
                    if (effort) {
                        effort.destroy();
                        if (redirect !== undefined) App.trigger(redirect, task_id);
                    }
                });
            }
        }
    });

    return App.Efforts.List.Controller;
});
