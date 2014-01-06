define(['app', 'app/entities/project', 'app/projects/show/show_view', 'app/common/not_found_view'],
function (App, Project, View, NotFoundView) {
    App.module('Projects.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            project_show: function (project_id) {
                var fetching_project = App.request('project:entity', project_id);
                $.when(fetching_project).done(function(project) {
                    var view;
                    if (project !== undefined) {
                        view = new Show.View({
                            model: project
                        });
                    } else {
                        view = new NotFoundView();
                    }

                    App.main_region.show(view);
                });
            }
        }
    });

    return App.Projects.Show.Controller;
});
