define(['app', 'lib/response_handler', 'app/entities/project', 'app/projects/show/show_view'],
function (App, response_handler) {
    App.module('Projects.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            project_show: function (project_id) {
                $.when(App.request('project:entity', project_id)).done(function(project, response) {
                    if (project) {
                        var show_view = new Show.View({
                            model: project
                        });

                        App.main_region.show(show_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Projects.Show.Controller;
});
