define(['app',
        'lib/response_handler',
        'app/entities/pool',
        'app/pools/edit/edit_view'],
function (App, response_handler) {
    App.module('Pools.Edit', function (Edit, App, Backbone, Marionette, $, _) {
        Edit.Controller = {
            pool_edit: function (pool_id) {
                App.main_region.show(new App.Common.LoadingView);

                $.when(App.request('pool:entity', pool_id)).done(function(pool, response) {
                    if (pool) {
                        var edit_view = new Edit.View({
                            model: pool
                        });

                        edit_view.on('form:submit', function(data) {
                            var model_validated = pool.save(data, {
                                patch: true,
                                success: function() {
                                    App.trigger('pool:show', pool.get('id'));
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
                                edit_view.triggerMethod('form:data:invalid', pool.validationError);
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

    return App.Pools.Edit.Controller;
});
