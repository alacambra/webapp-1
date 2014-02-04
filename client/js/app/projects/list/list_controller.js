define(['app',
        'lib/response_handler',
        'app/entities/project',
        'app/projects/list/list_view'],
function(App, response_handler) {
    App.module('Projects.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            projects_list: function() {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('project:entities')).done(function(projects, response) {
                    if (projects) {
                        var list_view = new List.View({
                            collection: projects
                        });

                        App.main_region.show(list_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Projects.List.Controller;
});
