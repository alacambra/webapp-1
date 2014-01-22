define(['app', 'lib/response_handler', 'app/entities/effort', 'app/efforts/edit/edit_view'],
function (App, response_handler) {
    App.module('Efforts.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            effort_edit: function (task_id, effort_id) {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('effort:entity', task_id, effort_id)).done(function(effort, response) {
                    if (effort) {
                        var edit_view = new Edit.View({
                            model: effort
                        });

                        edit_view.on('form:submit', function(data) {


                            console.log(effort);



                            var model_validated = effort.save(data, {
                                success: function() {
                                    App.trigger('task:show', effort.task_id);
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
                                edit_view.triggerMethod('form:data:invalid', effort.validationError);
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

    return App.Efforts.Edit.Controller;
});
