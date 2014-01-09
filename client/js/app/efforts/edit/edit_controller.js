define(['app', 'app/entities/effort', 'app/efforts/edit/edit_view', 'app/common/not_found_view'],
function (App, Effort, View, NotFoundView) {
    App.module('Efforts.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            effort_edit: function (effort_id) {
                var fetching_effort = App.request('effort:entity', effort_id);
                $.when(fetching_effort).done(function(effort) {
                    var view;
                    if (effort !== undefined) {
                        view = new Edit.View({
                            model: effort
                        });

                        view.on('form:submit', function(data) {
                            var valid = effort.save(data, {
                                success: function() {
                                    App.trigger('effort:show', effort.get('id'));
                                },
                                error: function() {
                                    view.triggerMethod('form:save:failed');
                                }
                            });

                            if (valid) {
                                view.triggerMethod('form:data:valid');
                            } else {
                                view.triggerMethod('form:data:invalid', effort.validationError);
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

    return App.Efforts.Edit.Controller;
});
