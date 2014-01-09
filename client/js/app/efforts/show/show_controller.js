define(['app', 'app/entities/effort', 'app/efforts/show/show_view', 'app/common/not_found_view'],
function (App, Effort, View, NotFoundView) {
    App.module('Efforts.Show', function (Show, App, Backbone, Marionette, $, _) {
        Show.Controller = {
            effort_show: function (effort_id) {
                var fetching_effort = App.request('effort:entity', effort_id);
                $.when(fetching_effort).done(function(effort) {
                    var view;
                    if (effort !== undefined) {
                        view = new Show.View({
                            model: effort
                        });
                    } else {
                        view = new NotFoundView();
                    }

                    App.main_region.show(view);
                });
            }
        }
    });

    return App.Efforts.Show.Controller;
});
