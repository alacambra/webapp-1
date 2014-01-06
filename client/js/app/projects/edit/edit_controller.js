define(['app', 'app/entities/project', 'app/projects/edit/edit_view', 'app/common/not_found_view'],
function (App, Project, View, NotFoundView) {
    App.module('Projects.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            project_edit: function (project_id) {
                var fetching_project = App.request('project:entity', project_id);
                $.when(fetching_project).done(function(project) {
                    var view;
                    if (project !== undefined) {
                        view = new Edit.View({
                            model: project
                        });

                        view.on('form:submit', function(data) {
                            var valid = project.save(data, {
                                success: function() {
                                    App.trigger('project:show', project.get('id'));
                                },
                                error: function() {
                                    view.triggerMethod('form:save:failed');
                                }
                            });

                            if (valid) {
                                view.triggerMethod('form:data:valid');
                            } else {
                                view.triggerMethod('form:data:invalid', project.validationError);
                            }
                        });
                    } else {
                        view = new NotFoundView();
                    }

                    App.main_region.show(view);
                });
            }
        }
    });

    return App.Projects.Edit.Controller;
});
