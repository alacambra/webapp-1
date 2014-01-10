define(['app', 'lib/response_handler', 'app/entities/project', 'app/projects/list/list_view'],
function(App, response_handler) {
    App.module('Projects.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            projects_list: function() {
                $.when(App.request('project:entities')).done(function(projects, response) {
                    if (projects) {
                        var list_view = new List.Projects({
                            collection: projects
                        });

                        App.main_region.show(list_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            },


            project_delete: function(project, redirect) {
                $.when(App.request('project:entity', project)).done(function(project, response) {
                    if (project) {
                        project.destroy();
                        if (redirect !== undefined) App.trigger(redirect);
                    }
                });
            }
        }
    });

    return App.Projects.List.Controller;
});
