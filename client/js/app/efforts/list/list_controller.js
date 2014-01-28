define(['app',
        'lib/response_handler',
        'app/entities/effort',
        'app/efforts/list/list_view'],
function(App, response_handler) {
    App.module('Efforts.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            efforts_list: function(task_id) {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('effort:entities', task_id)).done(function(efforts, response) {
                    if (efforts) {
                        var list_view = new List.View({
                            collection: efforts
                        });

                        App.main_region.show(list_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            },


            effort_delete: function(task_id, effort, redirect) {
                $.when(App.request('effort:entity', task_id, effort)).done(function(effort, response) {
                    if (effort) {
                        effort.destroy();
                        if (!_.isUndefined(redirect)) App.trigger(redirect, task_id);
                    }
                });
            }
        }
    });

    return App.Efforts.List.Controller;
});
