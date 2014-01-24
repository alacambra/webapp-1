define(['app',
        'lib/response_handler',
        'app/entities/project',
        'app/projects/edit/edit_view'],
function (App, response_handler) {
    App.module('Projects.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            project_edit: function (project_id) {
                $.when(App.request('project:entity', project_id)).done(function(project, response) {
                    if (project) {
                        var edit_view = new Edit.View({
                            model: project
                        });

                        edit_view.on('form:submit', function(data) {
                            var model_validated = project.save(data, {
                                patch: true,
                                success: function() {
                                    App.trigger('project:show', project.get('id'));
                                },
                                error: function(model, response) {
                                    response_handler.handle(response, {
                                        503: function() { edit_view.triggerMethod('form:save:failed'); }
                                    });
                                }
                            });

                            if (model_validated) {
                                edit_view.triggerMethod('form:data:valid');
                            } else {
                                edit_view.triggerMethod('form:data:invalid', project.validationError);
                            }
                        });

                        App.main_region.show(edit_view);
                    } else {
                        response_handler.handle(response);
                    }
                });
            }
        }
    });

    return App.Projects.Edit.Controller;
});
