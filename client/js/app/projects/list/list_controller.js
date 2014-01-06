define(['app',
        'app/entities/project',
        'app/projects/list/list_view'],
function(App){
    App.module('Projects.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            projects_list: function() {
                var fetching_projects = App.request('project:entities');
                $.when(fetching_projects).done(function(projects){
                    var list_view = new List.Projects({
                        collection: projects
                    });

                    App.main_region.show(list_view);
                });
            },


            project_delete: function(project, redirect) {
                var fetching_project = App.request('project:entity', project);

                $.when(fetching_project).done(function(project) {
                    if (project !== undefined) {
                        project.destroy();
                        if (redirect !== undefined) App.trigger(redirect);
                    } else {
                        console.log('project does not exist');
                    }
                });
            }
        }
    });

    return App.Projects.List.Controller;
});
